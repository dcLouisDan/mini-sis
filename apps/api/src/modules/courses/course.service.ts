import type {
  CreateCourseOutput,
  UpdateCourseOutput,
} from "@repo/validations/course";
import type { ServiceResult } from "../../types/service-result";
import type { Course } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const courseService = {
  create: async (data: CreateCourseOutput): Promise<ServiceResult<Course>> => {
    try {
      const course = await prisma.course.create({
        data,
      });

      return { ok: true, data: course };
    } catch (err) {
      return { ok: false, error: { type: "unknown", raw: err as Error } };
    }
  },
  update: async (
    course_id: string,
    data: UpdateCourseOutput,
  ): Promise<ServiceResult<Course>> => {
    try {
      const course = await prisma.course.update({
        where: { id: course_id },
        data,
      });

      return { ok: true, data: course };
    } catch (err) {
      return { ok: false, error: { type: "unknown", raw: err as Error } };
    }
  },
  delete: async (course_id: string) => {
    try {
      const course = await prisma.course.delete({
        where: { id: course_id },
      });

      return { ok: true, data: course };
    } catch (err) {
      return { ok: false, error: { type: "unknown", raw: err as Error } };
    }
  },
};
