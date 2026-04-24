import * as z from "zod";
// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/settings";

export const SubjectFormSchema = z.object({
  SubjectName: z
    .string()
    .min(3, {
      message: "SubjectName is required",
    })
    .trim(),
  id: z.coerce.number().optional(),
  teachers: z.array(z.string()).min(1, "Select at least one teacher"), //this is teachers IDs
});

export type SubjectSchema = z.infer<typeof SubjectFormSchema>;
