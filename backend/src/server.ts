import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import http from 'http'
import {Server} from 'socket.io'
import { env } from "./config/env.config";
import { connectRedis } from "./config/redis.config";
import { connectDB } from "./config/mongodb.config";
import socketLoader from "./socket";

dotenv.config();
const app = express();

app.use(express.json());

connectRedis()
connectDB()

app.use(morgan('dev'))


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
socketLoader(io)

server.listen(env.PORT, () => {
  console.log(`Server Started on Port= ${env.PORT}`);
});

