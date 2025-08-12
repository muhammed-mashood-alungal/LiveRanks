import { Server, Socket } from "socket.io";
import { EVENTS } from "./events.socket";
import { getRoomName } from "./service.socket";

export const scoreSocket = (io: Server, socket: Socket) => {
  socket.on(EVENTS.UPDATE_SCORE, ({ playerId, delta, region, mode }) => {
    const room = getRoomName(region , mode);
    const updatedLeaderBoard = [];
    io.to(room).emit(EVENTS.UPDATE_LEADERBOARD, updatedLeaderBoard);
  });
};
