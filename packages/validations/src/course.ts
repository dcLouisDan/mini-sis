import z from "zod";

export const createCourseSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});

export type CreateCourseInput = z.input<typeof createCourseSchema>;
export type CreateCourseOutput = z.output<typeof createCourseSchema>;

export const updateCourseSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});

export type UpdateCourseInput = z.input<typeof updateCourseSchema>;
export type UpdateCourseOutput = z.output<typeof updateCourseSchema>;

export const courseSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
