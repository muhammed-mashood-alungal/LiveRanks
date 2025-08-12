import { ILeaderType } from "@/types/leaderboard-data.type";

export interface ILeaderBoardRepository {
  updateLeaderBoard(
    leaderBoard: string,
    player: string,
    delta: number
  ): Promise<void>;
  fetchLeaderBoard(
    leaderBoard: string,
    limit: number
  ): Promise<ILeaderType[]>;
}
