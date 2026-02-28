import { useUserStore } from "@/stores/useUserStore";
import { IPagination } from "@/types";
import { GameResult, IHistory, Player } from "@/types/history";
import { IUser } from "@/types/user";
import httpRequest from "@/utils/httpRequest";

export interface HistoryCreateResponse {
  score: number;
  total: number;
  bonus: number;
  streak: number;
}

export interface HistoryGetResponse {
  data: IHistory[];
  pagination: IPagination;
}
export interface HistorySummaryResponse {
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  totalDraws: number;
  highestTotal: number;
  winRate: number;
}

class HistoryService {
  /* -------------------------------------------------------------------------- */
  /*                                   Create                                   */
  /* -------------------------------------------------------------------------- */
  async create({
    player,
    result,
  }: {
    player: Player;
    result: GameResult;
  }): Promise<HistoryCreateResponse> {
    const user = useUserStore.getState().user;

    if (!user) {
      throw new Error("User not found");
    }

    const res = await httpRequest({
      method: "post",
      endpoint: "/histories",
      data: {
        userId: user.id,
        player,
        result,
      },
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }

    return res.data;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Get All                                  */
  /* -------------------------------------------------------------------------- */
  async getAll(pagination?: {
    page: number;
    limit: number;
    orderBy?: string;
    direction?: "asc" | "desc";
    search?: string;
  }): Promise<HistoryGetResponse> {
    const endpoint = pagination
      ? `/histories?page=${pagination.page}&limit=${pagination.limit}${
          pagination.orderBy ? `&orderBy=${pagination.orderBy}` : ""
        }${pagination.direction ? `&direction=${pagination.direction}` : ""}${
          pagination.search ? `&search=${pagination.search}` : ""
        }`
      : "/histories";

    const res = await httpRequest({
      method: "get",
      endpoint: endpoint,
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }

    return res.data;
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Get Summary                                */
  /* -------------------------------------------------------------------------- */
  async getSummary(): Promise<HistorySummaryResponse> {
    const endpoint = "/histories/summary";

    const res = await httpRequest({
      method: "get",
      endpoint: endpoint,
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }

    return res.data;
  }

  /* -------------------------------------------------------------------------- */
  /*                   Get By Email Or First Name Or Last Name                  */
  /* -------------------------------------------------------------------------- */
  async getByEmailOrName(
    query: string,
    pagination?: { page: number; limit: number }
  ): Promise<HistoryGetResponse> {
    const endpoint = `/histories/search?query=${query}${
      pagination ? `&page=${pagination.page}&limit=${pagination.limit}` : ""
    }`;

    const res = await httpRequest({
      method: "get",
      endpoint: endpoint,
    });

    if (res.status === "error") {
      throw new Error(res.message);
    }
    return res.data;
  }
}

export const historyService = new HistoryService();
