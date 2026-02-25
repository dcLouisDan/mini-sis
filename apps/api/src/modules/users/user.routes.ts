import {
  createUserSchema,
  getUserResponseSchema,
  loginUserResponseSchema,
  loginUserSchema,
  registerUserResponseSchema,
} from "@repo/validations/user";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  getUserHandler,
  loginHandler,
  registerHandler,
} from "./user.controller";

async function userRoutes(server: FastifyInstance) {
  // Register User
  server.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/register",
    schema: {
      body: createUserSchema,
      response: {
        201: registerUserResponseSchema,
      },
    },
    handler: registerHandler,
  });

  // Login User
  server.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/login",
    schema: {
      body: loginUserSchema,
      response: {
        200: loginUserResponseSchema,
      },
    },
    handler: loginHandler,
  });

  // Get User by ID
  server.withTypeProvider<ZodTypeProvider>().route({
    method: "get",
    url: "/:id",
    preHandler: [server.authenticate],
    schema: {
      response: {
        200: getUserResponseSchema,
      },
    },
    handler: getUserHandler,
  });
}

export default userRoutes;
