# Implementation Plan: Complete Remaining CRUD Operations

## Overview

This implementation plan completes the Student and Parent CRUD operations with Clerk authentication integration, following the established patterns from the existing Teacher CRUD implementation. The plan also fixes Teacher update/delete operations to synchronize with Clerk, addresses security vulnerabilities with environment variables, and fixes chart rendering issues.

## Tasks

- [x] 1. Create Student form schema and validation
  - Create `shared/schemas/StudentFormSchema.ts` with Zod validation
  - Define schema with all required fields: username, firstName, lastName, email, password, phone, address, dateOfBirth, gender, bloodGroup, parentId, gradeId, classId
  - Make optional fields: image, email, phone, password (for updates)
  - Add validation rules: username (3-50 chars), password (8-50 chars), email format, phone (min 10 chars)
  - Export StudentSchema type inferred from Zod schema
  - _Requirements: 9.1-9.13, 19.1-19.6_

- [x] 2. Create Parent form schema and validation
  - Create `shared/schemas/ParentFormSchema.ts` with Zod validation
  - Define schema with required fields: username, firstName, lastName, email, password, phone, address
  - Make optional fields: image, email, password (for updates)
  - Add validation rules matching student schema pattern
  - Export ParentSchema type inferred from Zod schema
  - _Requirements: 10.1-10.9, 19.7-19.9_

- [x] 3. Implement Student creation with Clerk integration
  - [x] 3.1 Create Student service layer
    - Create `features/create/createStudent/types.ts` with ActionResponse interface
    - Create `features/create/createStudent/services.ts` with createStudentService function
    - Implement field mapping: firstName→name, lastName→surname, image→img, bloodGroup→bloodType, dateOfBirth→birthday
    - Convert gender "male"/"female" to MALE/FEMALE enum
    - Wrap database operations in try-catch with error logging
    - _Requirements: 1.8, 19.1-19.6_
  - [x] 3.2 Create Student action handler
    - Create `features/create/createStudent/actions.ts` with createStudent server action
    - Validate password is provided for new students
    - Create Clerk user with role "student" using clerkClient
    - Call createStudentService with Clerk user ID
    - Handle Clerk errors: form_password_pwned, form_identifier_exists
    - Revalidate "/list/students" path on success
    - Return ActionResponse with success/error status
    - _Requirements: 1.1-1.7, 16.1-16.5_

- [x] 4. Implement Student update with Clerk synchronization
  - [x] 4.1 Create Student update service layer
    - Create `features/update/updateStudent/services.ts` with updateStudentService function
    - Implement same field mapping as create operation
    - Use student ID from form data to identify record
    - Wrap database operations in try-catch with error logging
    - _Requirements: 2.7, 19.1-19.6_
  - [x] 4.2 Create Student update action handler
    - Create `features/update/updateStudent/actions.ts` with updateStudent server action
    - Update Clerk user with username, email, firstName, lastName
    - Call updateStudentService after Clerk update succeeds
    - Handle Clerk update errors with descriptive messages
    - Revalidate "/list/students" path on success
    - Return ActionResponse with success/error status
    - _Requirements: 2.1-2.6, 16.1-16.5_

- [x] 5. Implement Student deletion with Clerk user removal
  - [x] 5.1 Create Student delete service layer
    - Create `features/delete/deleteStudent/services.ts` with deleteStudentService function
    - Delete student record from database by ID
    - Wrap database operations in try-catch with error logging
    - _Requirements: 3.2, 18.1-18.5_
  - [x] 5.2 Create Student delete action handler
    - Create `features/delete/deleteStudent/actions.ts` with deleteStudent server action
    - Delete Clerk user account using student ID
    - Call deleteStudentService after Clerk deletion
    - Log Clerk deletion errors but continue with database deletion
    - Revalidate "/list/students" path on success
    - Return ActionResponse with success/error status
    - _Requirements: 3.1-3.5, 16.1-16.5, 18.5_

- [-] 6. Create StudentForm component
  - Create `components/forms/StudentForm.tsx` following TeacherForm pattern
  - Use React Hook Form with zodResolver for StudentFormSchema
  - Implement useActionState hook for form submission
  - Add conditional password field (show only in create mode)
  - Integrate Cloudinary widget for image upload
  - Load related data: parents, grades, classes for dropdowns
  - Display loading state while form is submitting
  - Handle success/error with toast notifications
  - Close modal on successful submission
  - _Requirements: 11.1-11.10, 20.1-20.8_

- [ ] 6.1 Write unit tests for StudentForm component
  - Test form validation with invalid inputs
  - Test password field visibility in create vs update mode
  - Test form submission with valid data
  - Test error handling and toast notifications
  - Test image upload integration
  - _Requirements: 11.1-11.10_

- [x] 7. Implement Parent creation with Clerk integration
  - [x] 7.1 Create Parent service layer
    - Create `features/create/createParent/types.ts` with ActionResponse interface
    - Create `features/create/createParent/services.ts` with createParentService function
    - Implement field mapping: firstName→name, lastName→surname, image→img
    - Wrap database operations in try-catch with error logging
    - _Requirements: 4.8, 19.7-19.9_
  - [x] 7.2 Create Parent action handler
    - Create `features/create/createParent/actions.ts` with createParent server action
    - Validate password is provided for new parents
    - Create Clerk user with role "parent" using clerkClient
    - Call createParentService with Clerk user ID
    - Handle Clerk errors: form_password_pwned, form_identifier_exists
    - Revalidate "/list/parents" path on success
    - Return ActionResponse with success/error status
    - _Requirements: 4.1-4.7, 16.1-16.5_

- [x] 8. Implement Parent update with Clerk synchronization
  - [x] 8.1 Create Parent update service layer
    - Create `features/update/updateParent/services.ts` with updateParentService function
    - Implement same field mapping as create operation
    - Use parent ID from form data to identify record
    - Wrap database operations in try-catch with error logging
    - _Requirements: 5.7, 19.7-19.9_
  - [x] 8.2 Create Parent update action handler
    - Create `features/update/updateParent/actions.ts` with updateParent server action
    - Update Clerk user with username, email, firstName, lastName
    - Call updateParentService after Clerk update succeeds
    - Handle Clerk update errors with descriptive messages
    - Revalidate "/list/parents" path on success
    - Return ActionResponse with success/error status
    - _Requirements: 5.1-5.6, 16.1-16.5_

- [x] 9. Implement Parent deletion with Clerk user removal
  - [x] 9.1 Create Parent delete service layer
    - Create `features/delete/deleteParent/services.ts` with deleteParentService function
    - Delete parent record from database by ID
    - Wrap database operations in try-catch with error logging
    - _Requirements: 6.2, 18.1-18.5_
  - [x] 9.2 Create Parent delete action handler
    - Create `features/delete/deleteParent/actions.ts` with deleteParent server action
    - Delete Clerk user account using parent ID
    - Call deleteParentService after Clerk deletion
    - Log Clerk deletion errors but continue with database deletion
    - Revalidate "/list/parents" path on success
    - Return ActionResponse with success/error status
    - _Requirements: 6.1-6.5, 16.1-16.5, 18.5_

- [-] 10. Create ParentForm component
  - Create `components/forms/ParentForm.tsx` following TeacherForm pattern
  - Use React Hook Form with zodResolver for ParentFormSchema
  - Implement useActionState hook for form submission
  - Add conditional password field (show only in create mode)
  - Integrate Cloudinary widget for image upload
  - Display loading state while form is submitting
  - Handle success/error with toast notifications
  - Close modal on successful submission
  - _Requirements: 12.1-12.11_

- [ ] 10.1 Write unit tests for ParentForm component
  - Test form validation with invalid inputs
  - Test password field visibility in create vs update mode
  - Test form submission with valid data
  - Test error handling and toast notifications
  - _Requirements: 12.1-12.11_

- [x] 11. Checkpoint - Test Student and Parent CRUD operations
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Fix Teacher update to synchronize with Clerk
  - Modify `features/update/updateTeacher/actions.ts` to add Clerk synchronization
  - Update Clerk user with username, email, firstName, lastName before database update
  - Handle Clerk update errors and return descriptive messages
  - Maintain existing database update logic
  - Revalidate path on success
  - _Requirements: 7.1-7.4, 16.1-16.5_

- [x] 13. Fix Teacher delete to remove Clerk user
  - Modify `features/delete/deleteTeacher/actions.ts` to add Clerk user deletion
  - Delete Clerk user account before database deletion
  - Log Clerk deletion errors but continue with database deletion
  - Maintain existing database deletion logic
  - Revalidate path on success
  - _Requirements: 8.1-8.3, 16.1-16.5, 18.5_

- [ ]\* 13.1 Write integration tests for Teacher Clerk synchronization
  - Test teacher update with Clerk synchronization
  - Test teacher delete with Clerk user removal
  - Test error handling for Clerk API failures
  - _Requirements: 7.1-7.4, 8.1-8.3_

- [x] 14. Implement environment variable security
  - Verify `.env` file is in `.gitignore` (should already be present as `.env*`)
  - Create `.env.example` file with placeholder values for: DATABASE_URL, DIRECT_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  - Add comments in `.env.example` explaining where to obtain each credential
  - Create `DEPLOYMENT.md` documentation with instructions for removing .env from Git history if needed
  - Document credential rotation steps in case of exposure
  - _Requirements: 13.1-13.5, 14.1-14.5_

- [x] 15. Fix chart rendering dimension warnings
  - Review all chart components in `components/charts/` directory
  - Add explicit height to ResponsiveContainer or parent div for each chart
  - Ensure AttendenceChart, CountChart, FinanceChart, and Performance components have defined dimensions
  - Test charts render without console warnings on initial load and after resize
  - _Requirements: 15.1-15.5_

- [x] 16. Wire Student and Parent forms into UI
  - [x] 16.1 Integrate StudentForm into FormModal
    - Update `components/microComponents/FormModal.tsx` to handle "student" table type
    - Pass appropriate relatedData (parents, grades, classes) to StudentForm
    - Ensure create/update/delete actions are properly connected
    - _Requirements: 11.3-11.5_
  - [x] 16.2 Integrate ParentForm into FormModal
    - Update `components/microComponents/FormModal.tsx` to handle "parent" table type
    - Ensure create/update/delete actions are properly connected
    - _Requirements: 12.3-12.5_
  - [x] 16.3 Update student list page to use new CRUD operations
    - Verify `app/(all-dashboard)/list/students/page.tsx` uses FormModal with student type
    - Ensure table displays create/update/delete buttons
    - Test end-to-end student CRUD flow in UI
    - _Requirements: 1.1-1.7, 2.1-2.7, 3.1-3.5_
  - [x] 16.4 Update parent list page to use new CRUD operations
    - Verify `app/(all-dashboard)/list/parents/page.tsx` uses FormModal with parent type
    - Ensure table displays create/update/delete buttons
    - Test end-to-end parent CRUD flow in UI
    - _Requirements: 4.1-4.7, 5.1-5.7, 6.1-6.5_

- [ ]\* 16.5 Write end-to-end integration tests
  - Test complete student creation flow (form → Clerk → database)
  - Test complete parent creation flow
  - Test student update with Clerk synchronization
  - Test parent update with Clerk synchronization
  - Test student deletion with Clerk user removal
  - Test parent deletion with Clerk user removal
  - Test error scenarios: duplicate username, weak password, Clerk API failures
  - _Requirements: 1.1-1.8, 2.1-2.7, 3.1-3.5, 4.1-4.8, 5.1-5.7, 6.1-6.5_

- [x] 17. Final checkpoint - Comprehensive testing and documentation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- All CRUD operations follow the established Teacher CRUD pattern for consistency
- TypeScript is used throughout the implementation
- Next.js server actions handle form submissions
- Clerk manages authentication and user accounts
- Prisma ORM handles database operations
