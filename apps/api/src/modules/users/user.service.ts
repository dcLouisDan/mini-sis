import type {
  CreateUserOutput,
  LoginUserOutput,
  UpdateUserOutput,
} from "@repo/validations/user";
import type { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import type { UserUpdateInput } from "../../generated/prisma/models";
import { hashPassword, verifyPassword } from "../../lib/utils/password-utils";
import type { ServiceResult } from "../../types/service-result";

export const userService = {
  login: async ({
    email,
    password,
  }: LoginUserOutput): Promise<ServiceResult<User>> => {
    try {
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: { type: "not-found", raw: new Error("User not found") },
        };
      }
      const passwordHash = user.password_hash;

      const passwordVerify = verifyPassword(password, passwordHash);
      if (!passwordVerify) {
        return {
          ok: false,
          error: { type: "input", raw: new Error("Incorrect Password") },
        };
      }

      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, error: { type: "unknown", raw: err as Error } };
    }
  },
  create: async ({
    password,
    password_confirmation,
    email,
    role,
  }: CreateUserOutput): Promise<ServiceResult<User>> => {
    try {
      if (password !== password_confirmation) {
        return {
          ok: false,
          error: { type: "input", raw: new Error("Passwords do not match.") },
        };
      }

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          email,
          password_hash: hashedPassword,
          role,
        },
      });

      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, error: { type: "unknown", raw: err as Error } };
    }
  },
  getById: async (user_id: string): Promise<ServiceResult<User>> => {
    try {
      const user = await prisma.user.findFirst({ where: { id: user_id } });
      if (!user) {
        return {
          ok: false,
          error: { type: "not-found", raw: new Error("User not found") },
        };
      }

      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, error: { type: "unknown", raw: err as Error } };
    }
  },
  update: async (
    user_id: string,
    data: UpdateUserOutput,
  ): Promise<ServiceResult<User>> => {
    try {
      const { email, role, password, password_confirmation } = data;
      const updateData: UserUpdateInput = {
        email: email,
        role: role,
      };

      const hasPasswordUpdate = !!password && !!password_confirmation;
      const arePasswordsEqual = password === password_confirmation;
      if (hasPasswordUpdate && arePasswordsEqual) {
        const hashedPassword = await hashPassword(password);
        updateData.password_hash = hashedPassword;
      } else if (hasPasswordUpdate && !arePasswordsEqual) {
        return {
          ok: false,
          error: { type: "input", raw: new Error("Passwords do not match.") },
        };
      }

      const user = await prisma.user.update({
        where: { id: user_id },
        data: updateData,
      });

      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, error: { type: "unknown", raw: err as Error } };
    }
  },
  delete: async (user_id: string) => {
    try {
      const user = await prisma.user.delete({
        where: { id: user_id },
      });

      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, error: { type: "unknown", raw: err as Error } };
    }
  },
};
