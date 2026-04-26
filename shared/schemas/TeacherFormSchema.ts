import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/settings";

export const TeacherFormSchema = z.object({
  image: z.string().optional(),
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(50, { message: "Username must be at most 50 characters long" })
    .trim(),
  firstName: z
    .string()
    .min(1, { message: "First name must be at least 1 character long" })
    .max(50)
    .trim(),
  lastName: z
    .string()
    .min(1, { message: "Last name must be at least 1 character long" })
    .max(50)
    .trim(),
  email: z
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" })
    .trim()
    .optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .trim()
    .optional(),
  address: z
    .string()
    .min(1, { message: "Address must be at least 1 character long" })
    .trim()
    .optional(),
  dateOfBirth: z.coerce.date({ message: "Invalid date format" }),
  gender: z.enum(["male", "female"], {
    message: "Please select male or female",
  }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    message: "Please select a valid blood group",
  }),
  subject: z.array(z.string()).optional(),
});

export type TeacherSchema = z.infer<typeof TeacherFormSchema>;
