import * as z from "zod";
// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/settings";

export const ClassFormSchema = z.object({
  ClassName: z
    .string()
    .min(3, {
      message: "ClassName is required",
    })
    .trim(),
  id: z.coerce.number().optional(),
  capacity: z.coerce.number().min(1, {
    message: "Capacity is required",
  }),
  gradeID: z.coerce.number().min(1, {
    message: "Grade is required",
  }),
  supervisorID: z.coerce.number().optional(),
});

export type ClassSchema = z.infer<typeof ClassFormSchema>;
