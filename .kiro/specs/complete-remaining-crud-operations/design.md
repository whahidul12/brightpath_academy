# Design Document: Complete Remaining CRUD Operations

## Overview

This design implements Student and Parent CRUD operations with Clerk authentication integration, following the established patterns from the existing Teacher CRUD implementation. The design also addresses critical security issues (environment file exposure) and fixes missing Clerk synchronization in Teacher update/delete operations.

### Goals

1. Implement complete Student CRUD operations (Create, Read, Update, Delete) with Clerk integration
2. Implement complete Parent CRUD operations (Create, Read, Update, Delete) with Clerk integration
3. Fix Teacher update operation to synchronize with Clerk user accounts
4. Fix Teacher delete operation to remove Clerk user accounts
5. Ensure consistent error handling and user feedback across all operations
6. Maintain security best practices for environment variables

### Non-Goals

- Modifying existing Class or Subject CRUD operations
- Implementing bulk operations for students or parents
- Adding role-based access control beyond existing Clerk roles
- Implementing student-parent relationship management UI

## Architecture

### High-Level Architecture

The system follows a layered architecture pattern established by the Teacher CRUD implementation:

```
┌─────────────────────────────────────────────────────────────┐
│                        UI Layer                              │
│  (React Components: Forms, Modals, Tables)                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    Action Layer                              │
│  (Server Actions: createStudent, updateParent, etc.)        │
└────────────┬───────────────────────────┬────────────────────┘
             │                           │
             ▼                           ▼
┌────────────────────────┐   ┌──────────────────────────────┐
│   Clerk Service        │   │   Service Layer              │
│   (Authentication)     │   │   (Database Operations)      │
└────────────────────────┘   └──────────────┬───────────────┘
                                             │
                                             ▼
                             ┌───────────────────────────────┐
                             │   PostgreSQL Database         │
                             │   (via Prisma ORM)            │
                             └───────────────────────────────┘
```

### Component Interaction Flow

**Create Operation Flow:**

1. User submits form → Form Component validates with Zod schema
2. Form Component calls Server Action (e.g., `createStudent`)
3. Server Action creates Clerk user with role metadata
4. Server Action calls Service Layer with Clerk user ID
5. Service Layer creates database record with Clerk ID as primary key
6. Server Action revalidates Next.js cache path
7. Server Action returns success/error response
8. Form Component displays toast notification and closes modal

**Update Operation Flow:**

1. User submits form → Form Component validates with Zod schema
2. Form Component calls Server Action (e.g., `updateStudent`)
3. Server Action updates Clerk user (username, email, firstName, lastName)
4. Server Action calls Service Layer to update database record
5. Server Action revalidates Next.js cache path
6. Server Action returns success/error response
7. Form Component displays toast notification and closes modal

**Delete Operation Flow:**

1. User confirms deletion → Modal triggers Server Action
2. Server Action deletes Clerk user account
3. Server Action calls Service Layer to delete database record
4. Server Action revalidates Next.js cache path
5. Server Action returns success/error response
6. UI displays toast notification and refreshes list

### Error Handling Strategy

**Clerk API Errors:**

- `form_password_pwned`: Return user-friendly message about password breach
- `form_identifier_exists`: Return message about duplicate username/email
- Generic Clerk errors: Extract and return specific error message from Clerk response

**Database Errors:**

- All service layer functions wrap operations in try-catch
- Errors are logged with `console.error` including context
- Errors are re-thrown to action layer for user-facing error messages

**Orphaned Records:**

- If Clerk user creation succeeds but database insertion fails: Clerk user remains (acceptable trade-off)
- If Clerk user deletion fails but database deletion succeeds: Log error, continue with database deletion
- If Clerk user update fails: Return error immediately, do not update database

## Components and Interfaces

### File Structure

Following the established pattern from Teacher CRUD:

```
features/
├── create/
│   ├── createStudent/
│   │   ├── actions.ts          # Server action for student creation
│   │   ├── services.ts         # Database service for student creation
│   │   └── types.ts            # TypeScript interfaces
│   └── createParent/
│       ├── actions.ts          # Server action for parent creation
│       ├── services.ts         # Database service for parent creation
│       └── types.ts            # TypeScript interfaces
├── update/
│   ├── updateStudent/
│   │   ├── actions.ts          # Server action for student update
│   │   ├── services.ts         # Database service for student update
│   │   └── types.ts            # TypeScript interfaces
│   ├── updateParent/
│   │   ├── actions.ts          # Server action for parent update
│   │   ├── services.ts         # Database service for parent update
│   │   └── types.ts            # TypeScript interfaces
│   └── updateTeacher/
│       └── actions.ts          # MODIFIED: Add Clerk synchronization
├── delete/
│   ├── deleteStudent/
│   │   ├── actions.ts          # Server action for student deletion
│   │   ├── services.ts         # Database service for student deletion
│   │   └── types.ts            # TypeScript interfaces
│   ├── deleteParent/
│   │   ├── actions.ts          # Server action for parent deletion
│   │   ├── services.ts         # Database service for parent deletion
│   │   └── types.ts            # TypeScript interfaces
│   └── deleteTeacher/
│       └── actions.ts          # MODIFIED: Add Clerk user deletion

shared/
└── schemas/
    ├── StudentFormSchema.ts    # Zod validation schema for student forms
    └── ParentFormSchema.ts     # Zod validation schema for parent forms

components/
└── forms/
    ├── StudentForm.tsx         # React form component for students
    └── ParentForm.tsx          # React form component for parents
```

### TypeScript Interfaces

**ActionResponse Interface** (shared across all CRUD operations):

```typescript
export interface ActionResponse {
  success: boolean;
  error: string | boolean;
}
```

**Form Schema Types** (inferred from Zod schemas):

```typescript
// StudentFormSchema
export type StudentSchema = z.infer<typeof StudentFormSchema>;

// ParentFormSchema
export type ParentSchema = z.infer<typeof ParentFormSchema>;
```

### API Integration Patterns

**Clerk User Creation:**

```typescript
const client = await clerkClient();
const user = await client.users.createUser({
  username: data.username,
  password: data.password,
  firstName: data.firstName,
  lastName: data.lastName,
  publicMetadata: { role: "student" | "parent" | "teacher" },
});
```

**Clerk User Update:**

```typescript
const client = await clerkClient();
await client.users.updateUser(data.id, {
  username: data.username,
  firstName: data.firstName,
  lastName: data.lastName,
  ...(data.email && {
    emailAddresses: [{ emailAddress: data.email }],
  }),
});
```

**Clerk User Deletion:**

```typescript
const client = await clerkClient();
await client.users.deleteUser(id);
```

### Form Component Pattern

All form components follow this structure:

```typescript
export default function EntityForm({ type, setIsOpen, data, relatedData }: FormProps) {
  // 1. State management
  const [profileImage, setProfileImage] = useState<any>();

  // 2. Action selection based on create/update
  const actionToExecute = type === "create" ? createEntity : updateEntity;

  // 3. Form setup with React Hook Form + Zod
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(EntityFormSchema),
    defaultValues: data
  });

  // 4. Server action integration
  const [state, formAction, isPending] = useActionState(actionToExecute, {
    success: false,
    error: false
  });

  // 5. Success/error handling with toast notifications
  useEffect(() => {
    if (state.success) {
      toast.success(`Entity ${type === "create" ? "created" : "updated"} successfully`);
      setIsOpen(false);
    } else if (state.error) {
      toast.error(typeof state.error === "string" ? state.error : "Failed to save");
    }
  }, [state, type, setIsOpen]);

  // 6. Form submission handler
  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction({ ...formData, image: profileImage?.secure_url });
    });
  });

  // 7. JSX with conditional password field
  return (
    <form onSubmit={onSubmit}>
      {/* Form fields */}
      {type === "create" && <InputField name="password" />}
      <button type="submit" disabled={isPending}>
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
```

## Data Models

### Student Schema

**Form Schema (Zod):**

```typescript
export const StudentFormSchema = z.object({
  image: z.string().optional(),
  id: z.string().optional(),
  username: z.string().min(3).max(50).trim(),
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  email: z.email().optional().or(z.literal("")),
  password: z.string().min(8).max(50).trim().optional(),
  phone: z.string().min(10).trim().optional(),
  address: z.string().min(1).trim().optional(),
  dateOfBirth: z.coerce.date(),
  gender: z.enum(["male", "female"]),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  parentId: z.string(),
  gradeId: z.coerce.number(),
  classId: z.coerce.number(),
});
```

**Database Model (Prisma):**

```prisma
model Student {
  id          String       @id
  username    String       @unique
  name        String
  surname     String
  email       String?      @unique
  phone       String?      @unique
  address     String
  img         String?
  bloodType   String
  sex         UserSex
  birthday    DateTime
  parentId    String
  classId     Int
  gradeId     Int
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  parent      Parent       @relation(fields: [parentId], references: [id])
  class       Class        @relation(fields: [classId], references: [id])
  grade       Grade        @relation(fields: [gradeId], references: [id])
  attendances Attendance[]
  results     Result[]
}
```

**Field Mapping (Form → Database):**

- `firstName` → `name`
- `lastName` → `surname`
- `image` → `img`
- `bloodGroup` → `bloodType`
- `dateOfBirth` → `birthday`
- `gender` ("male"/"female") → `sex` (MALE/FEMALE enum)
- `parentId` → `parentId` (direct)
- `gradeId` → `gradeId` (direct)
- `classId` → `classId` (direct)

### Parent Schema

**Form Schema (Zod):**

```typescript
export const ParentFormSchema = z.object({
  image: z.string().optional(),
  id: z.string().optional(),
  username: z.string().min(3).max(50).trim(),
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  email: z.email().optional().or(z.literal("")),
  password: z.string().min(8).max(50).trim().optional(),
  phone: z.string().min(10).trim(),
  address: z.string().min(1).trim(),
});
```

**Database Model (Prisma):**

```prisma
model Parent {
  id        String    @id
  username  String    @unique
  name      String
  surname   String
  email     String?   @unique
  phone     String    @unique
  address   String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  students  Student[]
}
```

**Field Mapping (Form → Database):**

- `firstName` → `name`
- `lastName` → `surname`
- `image` → `img` (Note: Parent model doesn't have img field in schema, but we'll include it for consistency)
- All other fields map directly

## Error Handling

### Error Categories

**1. Validation Errors (Client-Side)**

- Handled by Zod schema validation
- Displayed inline with form fields
- Prevents form submission until resolved

**2. Clerk API Errors (Server-Side)**

- Password breach: "Password has been found in a data breach. Please use a stronger, unique password."
- Duplicate identifier: "Username or email already exists. Please use a different one."
- Generic Clerk errors: Extract message from `error.errors[0].message`

**3. Database Errors (Server-Side)**

- Logged with `console.error` including operation context
- Generic user-facing message: "Failed to create/update/delete [entity]"
- Re-thrown from service layer to action layer

**4. Network Errors**

- Handled by Next.js server action error boundaries
- Display generic error toast notification

### Error Handling Implementation

**Service Layer Pattern:**

```typescript
export const createStudentService = async (
  data: StudentSchema,
  userId: string,
) => {
  try {
    return await prisma.student.create({
      data: {
        id: userId,
        // ... field mappings
      },
    });
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};
```

**Action Layer Pattern:**

```typescript
export const createStudent = async (
  currentState: ActionResponse,
  data: StudentSchema,
): Promise<ActionResponse> => {
  try {
    // 1. Validate password requirement
    if (!data.password) {
      return { success: false, error: "Password is required for new students" };
    }

    // 2. Create Clerk user
    const client = await clerkClient();
    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: { role: "student" },
    });

    // 3. Create database record
    await createStudentService(data, user.id);

    // 4. Revalidate cache
    revalidatePath("/list/students");

    return { success: true, error: false };
  } catch (error: any) {
    console.error("Error creating student:", error);

    // Handle Clerk-specific errors
    if (error?.errors && Array.isArray(error.errors)) {
      const clerkError = error.errors[0];
      if (clerkError?.code === "form_password_pwned") {
        return {
          success: false,
          error:
            "Password has been found in a data breach. Please use a stronger, unique password.",
        };
      }
      if (clerkError?.code === "form_identifier_exists") {
        return {
          success: false,
          error:
            "Username or email already exists. Please use a different one.",
        };
      }
      return {
        success: false,
        error: clerkError?.message || "Failed to create student",
      };
    }

    return { success: false, error: "Failed to create student" };
  }
};
```

## Testing Strategy

### Unit Testing

**Form Validation Tests:**

- Test Zod schema validation for all required fields
- Test minimum/maximum length constraints
- Test email format validation
- Test enum value validation (gender, bloodGroup)
- Test optional field handling

**Service Layer Tests:**

- Test successful database operations with mock Prisma client
- Test error handling and logging
- Test field mapping accuracy
- Test relationship handling (student-parent, student-class, student-grade)

**Action Layer Tests:**

- Test successful create/update/delete flows with mocked Clerk and Prisma
- Test Clerk error handling for specific error codes
- Test password requirement validation
- Test cache revalidation calls

### Integration Testing

**End-to-End CRUD Tests:**

- Test complete student creation flow (form → Clerk → database)
- Test complete parent creation flow
- Test student update with Clerk synchronization
- Test parent update with Clerk synchronization
- Test student deletion with Clerk user removal
- Test parent deletion with Clerk user removal
- Test teacher update with Clerk synchronization (new)
- Test teacher deletion with Clerk user removal (new)

**Error Scenario Tests:**

- Test duplicate username handling
- Test weak password rejection
- Test Clerk API failure scenarios
- Test database constraint violations
- Test orphaned Clerk user scenarios

### Manual Testing Checklist

- [ ] Create student with all required fields
- [ ] Create student with optional fields empty
- [ ] Update student information
- [ ] Delete student and verify Clerk user removed
- [ ] Create parent with all required fields
- [ ] Update parent information
- [ ] Delete parent and verify Clerk user removed
- [ ] Update teacher and verify Clerk synchronization
- [ ] Delete teacher and verify Clerk user removed
- [ ] Test form validation errors display correctly
- [ ] Test toast notifications appear for success/error
- [ ] Test image upload via Cloudinary
- [ ] Test related data loading (parents, grades, classes)

## Security Implementation

### Environment Variable Protection

**Current Issue:**

- `.env` file may be tracked in Git history
- Sensitive credentials (Clerk keys, database URL) exposed

**Solution:**

1. **Verify .gitignore Configuration:**

```gitignore
# .gitignore (already contains)
.env*
```

2. **Create .env.example Template:**

```bash
# .env.example
DATABASE_URL="postgresql://user:password@host:port/database"
DIRECT_URL="postgresql://user:password@host:port/database"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
```

3. **Remove .env from Git History (if needed):**

```bash
# Remove from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (CAUTION: coordinate with team)
git push origin --force --all
```

4. **Rotate Compromised Credentials:**

- Generate new Clerk API keys from Clerk Dashboard
- Update database credentials if exposed
- Update Cloudinary credentials if exposed
- Update all environment variables in Vercel deployment

### Clerk Role-Based Access

**Role Assignment:**

- Students: `publicMetadata: { role: "student" }`
- Parents: `publicMetadata: { role: "parent" }`
- Teachers: `publicMetadata: { role: "teacher" }`

**Access Control:**

- Implemented at Clerk middleware level (existing)
- Server actions validate user roles before operations
- UI components conditionally render based on user role

### Input Validation

**Client-Side:**

- Zod schema validation prevents malformed data submission
- React Hook Form provides real-time validation feedback

**Server-Side:**

- Server actions re-validate with Zod schemas
- Prisma enforces database constraints (unique, required fields)
- SQL injection prevented by Prisma parameterized queries

## Implementation Details

### Student CRUD Implementation

**Create Student Action (`features/create/createStudent/actions.ts`):**
