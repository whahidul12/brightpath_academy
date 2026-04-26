import * as z from "zod";

export const ParentFormSchema = z.object({
  id: z.string().optional(),
  image: z.string().optional(),
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
    .string()
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
    .trim(),
});

export type ParentSchema = z.infer<typeof ParentFormSchema>;
