import { type RedisClientType } from "redis";
import { ILeaderBoardRepository } from "./leaderboard.interface";
import { ILeaderType } from "@/types/leaderboard-data.type";

export class LeaderboardRepository implements ILeaderBoardRepository {
  constructor(private client: RedisClientType) {}

  async fetchLeaderBoard(
    leaderBoard: string,
    limit: number = 10
  ): Promise<ILeaderType[]> {
    const flatData = await this.client.zRangeWithScores(
      leaderBoard,
      0,
      limit - 1,
      {
        REV: true,
      }
    );

    const top = [];
    for (let i = 0; i < flatData.length; i += 2) {
      top.push({ name: flatData[i], score: Number(flatData[i + 1]) });
    }
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
      score: currentScore + delta,
    };

    await this.client.zAdd(leaderBoard, [playerData]);
  }
}
