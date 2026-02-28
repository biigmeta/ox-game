import { db } from "~/db/database";
import { HistoriesRepository } from "../history/history.repository";
import z from "zod";
import { createHistoriesSchema } from "./history.schema";

export class HistorieService {
  private bonusStreak = 3; // Number of consecutive wins needed for a bonus point

  constructor(
    private historieRepository: HistoriesRepository = new HistoriesRepository()
  ) {}

  async create(data: z.infer<typeof createHistoriesSchema>) {
    return db.$transaction(async (tx) => {
      const lastHistory = await this.historieRepository.findFirst(
        {
          where: { userId: data.userId },
          orderBy: { createdAt: "desc" },
        },
        tx
      );

      let score = 0;
      let total = lastHistory ? lastHistory.total : 0;
      let streak = lastHistory ? lastHistory.streak : 0;
      let bonus = 0;

      switch (data.result) {
        case "win":
          score = 1;
          streak = streak === this.bonusStreak ? 1 : streak + 1;
          break;
        case "lose":
          score = -1;
          streak = 0;
          break;
        case "draw":
          score = 0;
          streak = 0;
          break;
      }

      bonus = streak === this.bonusStreak ? 1 : 0; // Bonus point for a 3-win streak
      total = Math.max(0, total + score) + bonus; // Ensure total doesn't go negative

      const historie = await this.historieRepository.create(
        {
          data: {
            user: { connect: { id: data.userId } },
            player: data.player,
            result: data.result,
            score: score,
            total: total,
            bonus: bonus,
            streak: streak,
            description: data.description,
          },
        },
        tx
      );

      return historie;
    });
  }

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;

    return db.$transaction(async (tx) => {
      const [data, total] = await Promise.all([
        this.historieRepository.findMany(
          {
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
          },
          tx
        ),
        this.historieRepository.count({}, tx),
      ]);

      if (!data) throw new Error("No histories found");

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    });
  }

  async findById(id: string) {
    return this.historieRepository.findFirst({ where: { id: id } });
  }

  async findByUserId(userId: string) {
    return this.historieRepository.findMany({ where: { userId: userId } });
  }

  async softDelete(id: string) {
    return this.historieRepository.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: string) {
    return this.historieRepository.delete({ where: { id } });
  }
}
