import { redisClient } from "@/config/redis.config";
import { LeaderboardRepository } from "@/repositories/leaderboard.repository";
import { LeaderBoardServices } from "@/services/leaderboard.service";
import { Server, Socket } from "socket.io";
import { leaderboardSocket } from "./leaderboard.socket";
import { scoreSocket } from "./score.socket";

const leaderBoardRepo = new LeaderboardRepository(redisClient);
const leaderBoardService = new LeaderBoardServices(leaderBoardRepo);

const socketLoader = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("SOCKET CONNECTED : " + socket.id);
    
    const players = new Map();
    players.set(socket.id, `player:${players.size + 1}`);

    leaderboardSocket(io, socket, leaderBoardService, players);
    scoreSocket(io, socket, leaderBoardService, players);
  });
};

export default socketLoader;
