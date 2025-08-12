import { redisClient } from "@/config/redis.config";
import { LeaderboardRepository } from "@/repositories/leaderboard.repository";
import { LeaderBoardServices } from "@/services/leaderboard.service";
import { Server, Socket } from "socket.io";
import { leaderboardSocket } from "./leaderboard.socket";
import { scoreSocket } from "./score.socket";


const leaderBoardRepo = new LeaderboardRepository(redisClient)
const leaderBoardService = new LeaderBoardServices(leaderBoardRepo)

const socketLoader = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("SOCKET CONNECTED : " + socket.id);
     leaderboardSocket(io,socket,leaderBoardService)
     scoreSocket(io,socket,leaderBoardService)
     
  });
 
};

export default socketLoader;
