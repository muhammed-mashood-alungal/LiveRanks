import { Server, Socket } from "socket.io";
import { EVENTS } from "./events.socket";
import { getRoomName } from "./service.socket";
import { ILeaderBoardService } from "@/services/leaderboard.interface.service";

export const scoreSocket = (
  io: Server,
  socket: Socket,
  leaderBoardService: ILeaderBoardService,
  players: Map<string, string>
) => {
  socket.on(EVENTS.UPDATE_SCORE, async ({ player, delta, region, mode }) => {
    const room = getRoomName(region, mode);
    const updatedLeaderBoard = await leaderBoardService.updateLeaderBoard(
      region,
      mode,
      player,
      delta
    );
    io.to(room).emit(EVENTS.UPDATE_LEADERBOARD, updatedLeaderBoard);
  });
};
