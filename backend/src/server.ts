import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";
import { seedBooks } from "./app/modules/book/book.seed";
let server: Server;

async function main() {
  try {
    // console.log("before");
    await mongoose.connect(config.database_url as string);

    if (config.node_env === 'development') {
      await seedBooks();
    }
    // console.log("after");
    console.log(config.database_url);
    server = app.listen(config.port, () => {
      console.log(` app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log("unhandled rejection is detected,shutting down....");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("uncaughtException", () => {
  console.log("uncaught exception detected");
  process.exit(1);
});
