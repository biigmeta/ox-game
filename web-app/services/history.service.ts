import { useUserStore } from "@/stores/useUserStore";
import { GameResult, Player } from "@/types/game";
import { IUser } from "@/types/user";
import httpRequest from "@/utils/httpRequest";

export interface HistoryResponse {
  score: number;
  total: number;
  bonus: number;
  streak: number;
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
  }): Promise<HistoryResponse> {
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
}

export const historyService = new HistoryService();
