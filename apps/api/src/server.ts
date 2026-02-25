import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import fastifyJwt, { type JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
    };
  }
}

function buildServer() {
  const server = Fastify({
    logger: true,
  });

  server.register(fastifyJwt, {
    secret: "my-secret",
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        return reply.send(error);
      }
    },
  );

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  return server;
}

export default buildServer;
