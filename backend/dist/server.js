"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const env_config_1 = require("./config/env.config");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
//   cors: {
//     origin: env.CLIENT_ORIGIN,
//     methods: ['GET', 'POST'],
//   },
});
server.listen(env_config_1.env.PORT, () => {
    console.log(`Server Started on Port= ${env_config_1.env.PORT}`);
});
//# sourceMappingURL=server.js.map