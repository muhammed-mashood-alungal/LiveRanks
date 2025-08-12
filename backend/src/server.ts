import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import { connectRedis } from "./config/redis.config";
import { Server } from "socket.io";
import { env } from "./config/env.config";
import socketLoader from "./socket";

dotenv.config();
async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(morgan("dev"));

  await Promise.all([connectRedis()]);

  const server = http.createServer(app);
  const io = new Server(server);
  socketLoader(io);

  server.listen(env.PORT, () => {
    console.log(`Server Started on Port= ${env.PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
