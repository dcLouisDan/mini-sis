import z, { email } from "zod";

export const createUserSchema = z
  .object({
    email: z.email(),
    password: z.string().min(1),
    password_confirmation: z.string().min(1),
    role: z.string().optional().default("student"),
  })
  .refine(
    ({ password, password_confirmation }) => password == password_confirmation,
    {
      error: "Passwords do not match",
      path: ["password_confirmation"],
    },
  );

export type CreateUserInput = z.input<typeof createUserSchema>;
export type CreateUserOutput = z.output<typeof createUserSchema>;

export const registerUserResponseSchema = z.object({
  accessToken: z.string(),
});

export type RegisterUserResponseOutput = z.output<
  typeof registerUserResponseSchema
>;

export const updateUserSchema = z
  .object({
    email: z.email(),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
    role: z.string().optional().default("student"),
  })
  .refine(
    ({ password, password_confirmation }) => password === password_confirmation,
    {
      error: "Passwords do not match",
      path: ["password_confirmation"],
    },
  );

export type UpdateUserInput = z.input<typeof updateUserSchema>;
export type UpdateUserOutput = z.output<typeof updateUserSchema>;

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginUserInput = z.input<typeof loginUserSchema>;
export type LoginUserOutput = z.output<typeof loginUserSchema>;

export const loginUserResponseSchema = z.object({
  accessToken: z.string(),
});

export type LoginUserResponseOutput = z.output<typeof loginUserResponseSchema>;

export const getUserResponseSchema = z.object({
  id: z.string(),
  email: z.email(),
  role: z.string(),
});

export type GetUserResponseOutput = z.output<typeof getUserResponseSchema>;
