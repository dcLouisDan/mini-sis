import type { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import type {
  UserCreateInput,
  UserUpdateInput,
} from "../../generated/prisma/models";

export const userRespository = {
  create: async (data: UserCreateInput): Promise<RepoResult<User>> => {
    try {
      const user = await prisma.user.create({
        data,
      });

      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, error: err as Error };
    }
  },
  update: async (
    user_id: string,
    data: UserUpdateInput,
  ): Promise<RepoResult<User>> => {
    try {
      const user = await prisma.user.update({
        where: { id: user_id },
        data,
      });

      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, error: err as Error };
    }
  },
  delete: async (user_id: string) => {
    try {
      const user = await prisma.user.delete({
        where: { id: user_id },
      });

      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, error: err as Error };
    }
  },
};

type RepoResult<T> = { ok: true; data: T } | { ok: false; error: Error };
