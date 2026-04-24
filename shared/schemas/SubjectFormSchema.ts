import * as z from "zod";
// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/settings";

export const SubjectFormSchema = z.object({
  SubjectName: z
    .string()
    .min(3, {
      message: "SubjectName is required",
    })
    .trim(),
});

export type SubjectSchema = z.infer<typeof SubjectFormSchema>;
