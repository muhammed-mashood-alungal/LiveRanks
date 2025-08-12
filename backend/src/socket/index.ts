import { LeaderboardRepository } from "@/repositories/leaderboard.repository";
import { LeaderBoardServices } from "@/services/leaderboard.service";
import { Server, Socket } from "socket.io";
import { leaderboardSocket } from "./leaderboard.socket";
import { scoreSocket } from "./score.socket";

const leaderBoardRepo = new LeaderboardRepository();
const leaderBoardService = new LeaderBoardServices(leaderBoardRepo);

const players = new Map<string, string>();

const socketLoader = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    players.set(socket.id, `player:${players.size + 1}`);

    leaderboardSocket(io, socket, leaderBoardService, players);
    scoreSocket(io, socket, leaderBoardService, players);
  });
};

export default socketLoader;
