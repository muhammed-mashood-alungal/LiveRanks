import { type RedisClientType } from "redis";
import { ILeaderBoardRepository } from "./leaderboard.interface";
import { ILeaderType } from "@/types/leaderboard-data.type";
import { getRedisClient } from "@/config/redis.config";

export class LeaderboardRepository implements ILeaderBoardRepository {
  private get client(): RedisClientType {
    return getRedisClient();
  }

  async fetchLeaderBoard(
    leaderBoard: string,
    limit: number = 10
  ): Promise<ILeaderType[]> {
    const top = await this.client.zRangeWithScores(leaderBoard, 0, limit - 1, {
      REV: true,
    });

    return top;
  }

  async updateLeaderBoard(
    leaderBoard: string,
    player: string,
    delta: number
  ): Promise<void> {
    const currentScore = await this.client.zScore(leaderBoard, player);

    const playerData = {
      value: player,
      score: (currentScore || 0) + Number(delta),
    };

    await this.client.zAdd(leaderBoard, [playerData]);
  }
}
