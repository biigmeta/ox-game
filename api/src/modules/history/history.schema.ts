import { z } from "zod";

export const createHistoriesSchema = z.object({
  userId: z.string(),
  player: z.enum(["X", "O"]),
  result: z.enum(["win", "lose", "draw"]),
  description: z.string().optional().nullable(),
});
