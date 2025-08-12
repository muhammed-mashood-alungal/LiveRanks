import { Server, Socket } from "socket.io";
import { EVENTS } from "./events.socket";
import { getRoomName } from "./service.socket";

export const leaderboardSocket = (io: Server, socket: Socket) => {
  socket.on(EVENTS.SUBSCRIBE_LEADERBOARD, ({ region, mode }) => {
    const room = getRoomName(region , mode);
    socket.join(room);

    const topPlayers = [];
    socket.emit(EVENTS.UPDATE_LEADERBOARD, topPlayers);
  });
};
