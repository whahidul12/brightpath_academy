import * as z from "zod";
// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/settings";

export const SubjectFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Subject name is required",
    })
    .trim(),
  id: z.coerce.number().optional(),
  teachers: z.array(z.string()).min(1, "Select at least one teacher"),
});

export type SubjectSchema = z.infer<typeof SubjectFormSchema>;
