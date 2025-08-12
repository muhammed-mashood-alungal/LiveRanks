import { ILeaderType } from "@/types/leaderboard-data.type";

export interface ILeaderBoardService {
  updateLeaderBoard(
    region: string,
    mode: string,
    player: string,
    delta: number,
    limit?: number
  ): Promise<ILeaderType[]>;
  fetchLeaderBoard(
    region: string,
    mode: string,
    limit?: number
  ): Promise<ILeaderType[]>;
}
