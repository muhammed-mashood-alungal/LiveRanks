import { Server, Socket } from "socket.io";
import { EVENTS } from "./events.socket";
import { getRoomName } from "./service.socket";
import { ILeaderBoardService } from "@/services/leaderboard.interface.service";

export const leaderboardSocket = (
  io: Server,
  socket: Socket,
  leaderBoardService: ILeaderBoardService
) => {
  socket.on(EVENTS.SUBSCRIBE_LEADERBOARD, async ({ region, mode }) => {
    const room = getRoomName(region, mode);
    socket.join(room);

    const topPlayers = await leaderBoardService.fetchLeaderBoard(region, mode);
    socket.emit(EVENTS.UPDATE_LEADERBOARD, topPlayers);
  });
};
