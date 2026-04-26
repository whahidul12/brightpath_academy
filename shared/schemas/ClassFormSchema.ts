import * as z from "zod";

export const ClassFormSchema = z.object({
  // Prisma likely expects 'name', not 'ClassName'
  name: z.string().min(3, { message: "Class name is required" }).trim(),

  id: z.coerce.number().optional(),
  capacity: z.coerce.number().min(1, { message: "Capacity is required" }),

  // Ensure these match your Prisma schema types (Int vs String)
  gradeId: z.coerce.number().min(1, { message: "Grade is required" }),

  // Changing to string because teacher IDs are typically UUIDs/Strings
  supervisorId: z.string().optional().or(z.literal("")),
});

export type ClassSchema = z.infer<typeof ClassFormSchema>;
