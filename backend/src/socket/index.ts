import { Server, Socket } from "socket.io";

const socketLoader = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("SOCKET CONNECTED : " + socket.id);
  });
};

export default socketLoader;
