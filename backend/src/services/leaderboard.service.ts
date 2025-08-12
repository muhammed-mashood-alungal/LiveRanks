import { ILeaderBoardRepository } from "@/repositories/leaderboard.interface";
import { leaderboardName } from "@/utils/leaderboard-name.util";
import { ILeaderBoardService } from "./leaderboard.interface.service";
import { ILeaderType } from "@/types/leaderboard-data.type";

export class LeaderBoardServices implements ILeaderBoardService {
  constructor(private leaderBoardRepo: ILeaderBoardRepository) {}

  async fetchLeaderBoard(region: string, mode: string, limit?: number) : Promise<ILeaderType[]> {
    const leaderBoardName = await leaderboardName(region, mode);
    return this.leaderBoardRepo.fetchLeaderBoard(leaderBoardName, limit);
  }

  async updateLeaderBoard(
    region: string,
    mode: string,
    player: string,
    delta: number,
    limit?: number
  ) :Promise<ILeaderType[]>{
    const leaderBoardName = leaderboardName(region, mode);
    await this.leaderBoardRepo.updateLeaderBoard(
      leaderBoardName,
      player,
      delta
    );
    return this.leaderBoardRepo.fetchLeaderBoard(leaderBoardName, limit);
  }
}
