import { IUser } from "./user";

export type Player = "X" | "O";
export type BoardState = (Player | null)[];
export type GameResult = "win" | "lose" | "draw";

export interface IHistory {
  id: string;
  userId: string;
  player: Player;
  result: GameResult;
  score: number;
  bonus: number;
  total: number;
  streak: number;
  description?: string;
  createdAt: string;
  user: IUser;
}

export interface IHistorySummary {
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  totalDraws: number;
  highestTotal: number;
  winRate: number;
}
