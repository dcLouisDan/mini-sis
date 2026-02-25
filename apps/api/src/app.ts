import buildServer from "./server";

const server = buildServer();

async function main() {
  try {
    await server.listen({
      port: 3001,
      host: "0.0.0.0",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
