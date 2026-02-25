import type { CreateUserOutput, LoginUserOutput } from "@repo/validations/user";
import type { FastifyReply, FastifyRequest } from "fastify";
import { userService } from "./user.service";

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginUserOutput }>,
  reply: FastifyReply,
) {
  const body = request.body;

  const res = await userService.login(body);

  if (res.ok) {
    const { data: user } = res;

    const responseData = {
      accessToken: request.jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };

    return reply.code(200).send(responseData);
  }

  const error = res.error;

  if (error.type == "input") {
    return reply.code(422).send({
      message: error.raw.message,
    });
  }

  if (error.type == "not-found") {
    return reply.code(404).send({
      message: error.raw.message,
    });
  }

  return reply.code(500).send({
    message: "Unknown error has occured",
  });
}

export async function registerHandler(
  request: FastifyRequest<{ Body: CreateUserOutput }>,
  reply: FastifyReply,
) {
  const body = request.body;

  const res = await userService.create(body);

  if (res.ok) {
    const { data: user } = res;

    const responseData = {
      accessToken: request.jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };

    return reply.code(201).send(responseData);
  }

  const error = res.error;

  if (error.type == "input") {
    return reply.code(422).send({
      message: error.raw.message,
    });
  }

  if (error.type == "not-found") {
    return reply.code(404).send({
      message: error.raw.message,
    });
  }

  return reply.code(500).send({
    message: "Unknown error has occured",
  });
}

export async function getProfileHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.user;

  const res = await userService.getById(id);

  if (res.ok) {
    const { data: user } = res;

    const responseData = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return reply.code(200).send(responseData);
  }

  const error = res.error;

  if (error.type == "input") {
    return reply.code(422).send({
      message: error.raw.message,
    });
  }

  if (error.type == "not-found") {
    return reply.code(404).send({
      message: error.raw.message,
    });
  }

  return reply.code(500).send({
    message: "Unknown error has occured",
  });
}

export async function getUserHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  const res = await userService.getById(id);

  if (res.ok) {
    const { data: user } = res;

    const responseData = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return reply.code(200).send(responseData);
  }

  const error = res.error;

  if (error.type == "input") {
    return reply.code(422).send({
      message: error.raw.message,
    });
  }

  if (error.type == "not-found") {
    return reply.code(404).send({
      message: error.raw.message,
    });
  }

  return reply.code(500).send({
    message: "Unknown error has occured",
  });
}
