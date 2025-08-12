import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import http from 'http'
import {Server} from 'socket.io'
import { env } from "./config/env.config";
import { connectRedis } from "./config/redis.config";
import { connectDB } from "./config/mongodb.config";

dotenv.config();
const app = express();

app.use(express.json());

connectRedis()
connectDB()



const server = http.createServer(app);
const io = new Server(server, {
//   cors: {
//     origin: env.CLIENT_ORIGIN,
//     methods: ['GET', 'POST'],
//   },
});




server.listen(env.PORT, () => {
  console.log(`Server Started on Port= ${env.PORT}`);
});

