import { Server, Socket } from "socket.io";
import { EVENTS } from "./events.socket";
import { getRoomName } from "./service.socket";
import { ILeaderBoardService } from "@/services/leaderboard.interface.service";

export const leaderboardSocket = (
  io: Server,
  socket: Socket,
  leaderBoardService: ILeaderBoardService,
  players: Map<string, string>
) => {
  socket.on(EVENTS.SUBSCRIBE_LEADERBOARD, async (data) => {
    const {region, mode} = JSON.parse(data)
    const room = getRoomName(region, mode);
    socket.join(room);

    const topPlayers = await leaderBoardService.updateLeaderBoard(
      region,
      mode,
      players.get(socket.id),
      0
    );
    io.to(room).emit(EVENTS.UPDATE_LEADERBOARD, topPlayers);
  });
};
