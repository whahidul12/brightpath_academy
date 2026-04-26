# Requirements Document

## Introduction

This document specifies the requirements for completing the remaining CRUD (Create, Read, Update, Delete) operations in the BrightPath Academy school management system. The system currently has fully functional Teacher, Subject, and Class CRUD operations with Clerk authentication integration. This feature will implement Student and Parent CRUD operations following the same established patterns, fix Clerk user synchronization issues in Teacher operations, and address security vulnerabilities.

## Glossary

- **System**: The BrightPath Academy school management application
- **Student_CRUD_Module**: The module responsible for creating, reading, updating, and deleting student records
- **Parent_CRUD_Module**: The module responsible for creating, reading, updating, and deleting parent records
- **Teacher_CRUD_Module**: The existing module responsible for teacher CRUD operations
- **Clerk_Service**: The external authentication service (Clerk) that manages user accounts
- **Database**: The PostgreSQL database managed by Prisma ORM
- **Student_Form**: The React form component for student data entry
- **Parent_Form**: The React form component for parent data entry
- **Action_Handler**: Server-side function that processes form submissions
- **Service_Layer**: Database service functions that interact with Prisma
- **Form_Schema**: Zod validation schema for form data
- **Chart_Component**: React components that render data visualizations
- **Environment_File**: The .env file containing sensitive configuration data
- **Git_Repository**: The version control repository for the codebase
- **Deployment_Environment**: The production environment (Vercel) where the application runs

## Requirements

### Requirement 1: Student Creation with Clerk Integration

**User Story:** As an administrator, I want to create student accounts with authentication credentials, so that students can access the system securely.

#### Acceptance Criteria

1. WHEN a valid student form is submitted, THE Student_CRUD_Module SHALL create a Clerk user account with role "student"
2. WHEN the Clerk user is created successfully, THE Student_CRUD_Module SHALL create a corresponding student record in the Database with the Clerk user ID
3. WHEN the student record is created successfully, THE System SHALL revalidate the "/list/students" path
4. IF Clerk user creation fails with error code "form_password_pwned", THEN THE Student_CRUD_Module SHALL return error message "Password has been found in a data breach. Please use a stronger, unique password."
5. IF Clerk user creation fails with error code "form_identifier_exists", THEN THE Student_CRUD_Module SHALL return error message "Username or email already exists. Please use a different one."
6. WHEN student creation succeeds, THE System SHALL display success toast notification "Student created successfully"
7. WHEN student creation fails, THE System SHALL display error toast notification with the specific error message
8. THE Student_CRUD_Module SHALL map form fields to database fields: username, name (from firstName), surname (from lastName), email, phone, address, img (from image), bloodType (from bloodGroup), sex (from gender with conversion to MALE/FEMALE enum), birthday (from dateOfBirth), parentId, gradeId, classId

### Requirement 2: Student Update with Clerk Synchronization

**User Story:** As an administrator, I want to update student information and have it synchronized with their authentication account, so that student data remains consistent across the system.

#### Acceptance Criteria

1. WHEN a valid student update form is submitted, THE Student_CRUD_Module SHALL update the Clerk user account with new username, email, firstName, and lastName
2. WHEN the Clerk user is updated successfully, THE Student_CRUD_Module SHALL update the corresponding student record in the Database
3. WHEN the student record is updated successfully, THE System SHALL revalidate the "/list/students" path
4. IF Clerk user update fails, THEN THE Student_CRUD_Module SHALL return error message with Clerk error details
5. WHEN student update succeeds, THE System SHALL display success toast notification "Student updated successfully"
6. WHEN student update fails, THE System SHALL display error toast notification with the specific error message
7. THE Student_CRUD_Module SHALL use the student ID from the form data to identify the record to update

### Requirement 3: Student Deletion with Clerk User Removal

**User Story:** As an administrator, I want to delete student accounts and have their authentication credentials removed, so that former students cannot access the system.

#### Acceptance Criteria

1. WHEN a student deletion is confirmed, THE Student_CRUD_Module SHALL delete the Clerk user account using the student ID
2. WHEN the Clerk user is deleted successfully, THE Student_CRUD_Module SHALL delete the corresponding student record from the Database
3. WHEN the student record is deleted successfully, THE System SHALL revalidate the "/list/students" path
4. IF Clerk user deletion fails, THEN THE Student_CRUD_Module SHALL log the error and attempt to delete the database record
5. WHEN student deletion succeeds, THE System SHALL display success toast notification "Student deleted successfully"
6. WHEN student deletion fails, THE System SHALL display error toast notification "Failed to delete student"

### Requirement 4: Parent Creation with Clerk Integration

**User Story:** As an administrator, I want to create parent accounts with authentication credentials, so that parents can access the system to monitor their children's progress.

#### Acceptance Criteria

1. WHEN a valid parent form is submitted, THE Parent_CRUD_Module SHALL create a Clerk user account with role "parent"
2. WHEN the Clerk user is created successfully, THE Parent_CRUD_Module SHALL create a corresponding parent record in the Database with the Clerk user ID
3. WHEN the parent record is created successfully, THE System SHALL revalidate the "/list/parents" path
4. IF Clerk user creation fails with error code "form_password_pwned", THEN THE Parent_CRUD_Module SHALL return error message "Password has been found in a data breach. Please use a stronger, unique password."
5. IF Clerk user creation fails with error code "form_identifier_exists", THEN THE Parent_CRUD_Module SHALL return error message "Username or email already exists. Please use a different one."
6. WHEN parent creation succeeds, THE System SHALL display success toast notification "Parent created successfully"
7. WHEN parent creation fails, THE System SHALL display error toast notification with the specific error message
8. THE Parent_CRUD_Module SHALL map form fields to database fields: username, name (from firstName), surname (from lastName), email, phone, address, img (from image)

### Requirement 5: Parent Update with Clerk Synchronization

**User Story:** As an administrator, I want to update parent information and have it synchronized with their authentication account, so that parent data remains consistent across the system.

#### Acceptance Criteria

1. WHEN a valid parent update form is submitted, THE Parent_CRUD_Module SHALL update the Clerk user account with new username, email, firstName, and lastName
2. WHEN the Clerk user is updated successfully, THE Parent_CRUD_Module SHALL update the corresponding parent record in the Database
3. WHEN the parent record is updated successfully, THE System SHALL revalidate the "/list/parents" path
4. IF Clerk user update fails, THEN THE Parent_CRUD_Module SHALL return error message with Clerk error details
5. WHEN parent update succeeds, THE System SHALL display success toast notification "Parent updated successfully"
6. WHEN parent update fails, THE System SHALL display error toast notification with the specific error message
7. THE Parent_CRUD_Module SHALL use the parent ID from the form data to identify the record to update

### Requirement 6: Parent Deletion with Clerk User Removal

**User Story:** As an administrator, I want to delete parent accounts and have their authentication credentials removed, so that the system maintains data integrity.

#### Acceptance Criteria

1. WHEN a parent deletion is confirmed, THE Parent_CRUD_Module SHALL delete the Clerk user account using the parent ID
2. WHEN the Clerk user is deleted successfully, THE Parent_CRUD_Module SHALL delete the corresponding parent record from the Database
3. WHEN the parent record is deleted successfully, THE System SHALL revalidate the "/list/parents" path
4. IF Clerk user deletion fails, THEN THE Parent_CRUD_Module SHALL log the error and attempt to delete the database record
5. WHEN parent deletion succeeds, THE System SHALL display success toast notification "Parent deleted successfully"
6. WHEN parent deletion fails, THE System SHALL display error toast notification "Failed to delete parent"

### Requirement 7: Teacher Update Clerk Synchronization

**User Story:** As an administrator, I want teacher updates to synchronize with Clerk, so that teacher authentication credentials remain current.

#### Acceptance Criteria

1. WHEN a valid teacher update form is submitted, THE Teacher_CRUD_Module SHALL update the Clerk user account with new username, email, firstName, and lastName
2. WHEN the Clerk user is updated successfully, THE Teacher_CRUD_Module SHALL update the corresponding teacher record in the Database
3. IF Clerk user update fails, THEN THE Teacher_CRUD_Module SHALL return error message with Clerk error details
4. WHEN teacher update succeeds, THE System SHALL display success toast notification "Teacher updated successfully"

### Requirement 8: Teacher Deletion Clerk User Removal

**User Story:** As an administrator, I want teacher deletions to remove Clerk user accounts, so that former teachers cannot access the system.

#### Acceptance Criteria

1. WHEN a teacher deletion is confirmed, THE Teacher_CRUD_Module SHALL delete the Clerk user account using the teacher ID
2. WHEN the Clerk user is deleted successfully, THE Teacher_CRUD_Module SHALL delete the corresponding teacher record from the Database
3. IF Clerk user deletion fails, THEN THE Teacher_CRUD_Module SHALL log the error and attempt to delete the database record
4. WHEN teacher deletion succeeds, THE System SHALL display success toast notification "Teacher deleted successfully"

### Requirement 9: Student Form Schema Validation

**User Story:** As a developer, I want the student form to validate data correctly, so that only valid student records are created.

#### Acceptance Criteria

1. THE Student_Form SHALL validate username with minimum 3 characters and maximum 50 characters
2. THE Student_Form SHALL validate firstName with minimum 1 character and maximum 50 characters
3. THE Student_Form SHALL validate lastName with minimum 1 character and maximum 50 characters
4. THE Student_Form SHALL validate email format
5. THE Student_Form SHALL validate password with minimum 8 characters and maximum 50 characters for new students
6. THE Student_Form SHALL validate phone with minimum 10 characters
7. THE Student_Form SHALL validate address with minimum 1 character
8. THE Student_Form SHALL validate dateOfBirth as a valid date
9. THE Student_Form SHALL validate gender as enum with values "male" or "female"
10. THE Student_Form SHALL validate bloodGroup as enum with values "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
11. THE Student_Form SHALL make image field optional
12. THE Student_Form SHALL make email field optional
13. THE Student_Form SHALL make phone field optional

### Requirement 10: Parent Form Schema Validation

**User Story:** As a developer, I want the parent form to validate data correctly, so that only valid parent records are created.

#### Acceptance Criteria

1. THE Parent_Form SHALL validate username with minimum 3 characters and maximum 50 characters
2. THE Parent_Form SHALL validate firstName with minimum 1 character and maximum 50 characters
3. THE Parent_Form SHALL validate lastName with minimum 1 character and maximum 50 characters
4. THE Parent_Form SHALL validate email format
5. THE Parent_Form SHALL validate password with minimum 8 characters and maximum 50 characters for new parents
6. THE Parent_Form SHALL validate phone with minimum 10 characters
7. THE Parent_Form SHALL validate address with minimum 1 character
8. THE Parent_Form SHALL make image field optional
9. THE Parent_Form SHALL make email field optional

### Requirement 11: Student Form Component Implementation

**User Story:** As an administrator, I want a functional student form, so that I can create and update student records through the UI.

#### Acceptance Criteria

1. WHEN the Student_Form is in "create" mode, THE Student_Form SHALL display password field
2. WHEN the Student_Form is in "update" mode, THE Student_Form SHALL hide password field
3. WHEN the Student_Form is submitted, THE Student_Form SHALL call the appropriate Action_Handler (createStudent or updateStudent)
4. WHEN the Action_Handler returns success, THE Student_Form SHALL close the modal
5. WHEN the Action_Handler returns error, THE Student_Form SHALL display error message
6. THE Student_Form SHALL use React Hook Form with Zod resolver for validation
7. THE Student_Form SHALL use useActionState hook for form submission
8. THE Student_Form SHALL display loading state while form is submitting
9. THE Student_Form SHALL support image upload via Cloudinary widget
10. THE Student_Form SHALL populate form fields with existing data in update mode

### Requirement 12: Parent Form Component Creation

**User Story:** As an administrator, I want a functional parent form, so that I can create and update parent records through the UI.

#### Acceptance Criteria

1. WHEN the Parent_Form is in "create" mode, THE Parent_Form SHALL display password field
2. WHEN the Parent_Form is in "update" mode, THE Parent_Form SHALL hide password field
3. WHEN the Parent_Form is submitted, THE Parent_Form SHALL call the appropriate Action_Handler (createParent or updateParent)
4. WHEN the Action_Handler returns success, THE Parent_Form SHALL close the modal
5. WHEN the Action_Form returns error, THE Parent_Form SHALL display error message
6. THE Parent_Form SHALL use React Hook Form with Zod resolver for validation
7. THE Parent_Form SHALL use useActionState hook for form submission
8. THE Parent_Form SHALL display loading state while form is submitting
9. THE Parent_Form SHALL support image upload via Cloudinary widget
10. THE Parent_Form SHALL populate form fields with existing data in update mode
11. THE Parent_Form SHALL follow the same structure and styling as Teacher_Form

### Requirement 13: Environment File Security

**User Story:** As a security-conscious developer, I want sensitive environment variables protected from version control, so that credentials are not exposed publicly.

#### Acceptance Criteria

1. THE Git_Repository SHALL exclude .env file from version control via .gitignore
2. THE System SHALL provide .env.example file documenting required environment variables without actual values
3. THE .env.example file SHALL include placeholders for: DATABASE_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
4. WHEN .env file exists in Git history, THE System SHALL provide instructions to remove it from history
5. THE System SHALL document that .env\* pattern is already in .gitignore

### Requirement 14: Production Deployment Configuration

**User Story:** As a developer, I want clear documentation for production deployment, so that the application can be deployed securely to Vercel.

#### Acceptance Criteria

1. THE System SHALL provide documentation listing required Vercel environment variables
2. THE System SHALL document where to obtain production Clerk API keys
3. THE System SHALL document where to configure Supabase connection pooling URL
4. THE System SHALL provide a deployment checklist including: environment variables, database migrations, Clerk webhook configuration
5. THE System SHALL document the difference between development and production Clerk keys

### Requirement 15: Chart Rendering Dimension Handling

**User Story:** As a user, I want charts to render without console warnings, so that the application runs cleanly.

#### Acceptance Criteria

1. WHEN a Chart_Component is rendered, THE Chart_Component SHALL have explicit height defined in its container
2. WHEN a ResponsiveContainer is used, THE Chart_Component SHALL ensure parent element has defined dimensions
3. THE Chart_Component SHALL not generate console warnings about container dimensions
4. THE Chart_Component SHALL render correctly on initial page load
5. THE Chart_Component SHALL render correctly after window resize

### Requirement 16: Error Handling Consistency

**User Story:** As a developer, I want consistent error handling across all CRUD operations, so that errors are properly logged and reported to users.

#### Acceptance Criteria

1. WHEN any Service_Layer function encounters an error, THE Service_Layer SHALL log the error with console.error
2. WHEN any Service_Layer function encounters an error, THE Service_Layer SHALL re-throw the error for Action_Handler to handle
3. WHEN any Action_Handler encounters an error, THE Action_Handler SHALL return ActionResponse with success: false and descriptive error message
4. WHEN Clerk API returns an error, THE Action_Handler SHALL extract and return the specific Clerk error message
5. THE System SHALL handle Clerk error codes: "form_password_pwned", "form_identifier_exists", and generic errors

### Requirement 17: Code Pattern Consistency

**User Story:** As a developer, I want all CRUD operations to follow the same folder structure and naming conventions, so that the codebase is maintainable.

#### Acceptance Criteria

1. THE Student_CRUD_Module SHALL follow folder structure: features/create/createStudent/, features/update/updateStudent/, features/delete/deleteStudent/
2. THE Parent_CRUD_Module SHALL follow folder structure: features/create/createParent/, features/update/updateParent/, features/delete/deleteParent/
3. WHEN a CRUD module is created, THE module SHALL contain files: actions.ts, services.ts, types.ts
4. THE System SHALL place form schemas in: shared/schemas/StudentFormSchema.ts, shared/schemas/ParentFormSchema.ts
5. THE System SHALL place form components in: components/forms/StudentForm.tsx, components/forms/ParentForm.tsx
6. THE Action_Handler SHALL use naming pattern: createStudent, updateStudent, deleteStudent, createParent, updateParent, deleteParent
7. THE Service_Layer SHALL use naming pattern: createStudentService, updateStudentService, deleteStudentService, createParentService, updateParentService, deleteParentService

### Requirement 18: Database Transaction Safety

**User Story:** As a developer, I want CRUD operations to handle database errors gracefully, so that the application remains stable.

#### Acceptance Criteria

1. WHEN a Service_Layer function performs database operations, THE Service_Layer SHALL wrap operations in try-catch block
2. WHEN a database operation fails, THE Service_Layer SHALL log the error with context about which operation failed
3. WHEN creating a user with Clerk and database insertion fails, THE System SHALL leave the Clerk user orphaned (acceptable trade-off)
4. WHEN updating a user and Clerk update succeeds but database update fails, THE System SHALL report error to user
5. WHEN deleting a user and Clerk deletion fails, THE System SHALL log error and attempt database deletion anyway

### Requirement 19: Form Field Mapping Accuracy

**User Story:** As a developer, I want form fields to map correctly to database schema, so that data is stored accurately.

#### Acceptance Criteria

1. THE Student_CRUD_Module SHALL map "firstName" form field to "name" database field
2. THE Student_CRUD_Module SHALL map "lastName" form field to "surname" database field
3. THE Student_CRUD_Module SHALL map "bloodGroup" form field to "bloodType" database field
4. THE Student_CRUD_Module SHALL map "dateOfBirth" form field to "birthday" database field
5. THE Student_CRUD_Module SHALL map "image" form field to "img" database field
6. THE Student_CRUD_Module SHALL convert "gender" value "male" to enum "MALE" and "female" to enum "FEMALE"
7. THE Parent_CRUD_Module SHALL map "firstName" form field to "name" database field
8. THE Parent_CRUD_Module SHALL map "lastName" form field to "surname" database field
9. THE Parent_CRUD_Module SHALL map "image" form field to "img" database field
10. THE Teacher_CRUD_Module SHALL maintain existing field mappings without changes

### Requirement 20: Student Form Related Data Loading

**User Story:** As an administrator, I want the student form to display available parents, grades, and classes, so that I can assign students correctly.

#### Acceptance Criteria

1. WHEN the Student_Form is opened, THE System SHALL load available parents from the Database
2. WHEN the Student_Form is opened, THE System SHALL load available grades from the Database
3. WHEN the Student_Form is opened, THE System SHALL load available classes from the Database
4. THE Student_Form SHALL display parent selection dropdown with parent names
5. THE Student_Form SHALL display grade selection dropdown with grade levels
6. THE Student_Form SHALL display class selection dropdown with class names
7. WHEN form submission occurs, THE Student_Form SHALL include parentId, gradeId, and classId in form data
8. THE Student_Form SHALL validate that parentId, gradeId, and classId are provided
