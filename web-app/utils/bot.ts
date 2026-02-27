import { BoardState, Player } from "@/types/game";
import { isValidMove } from "./game";

export function getBotMove(
  squares: BoardState,
  botPlayer: Player = "O"
): number {
  const availableMoves = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null) as number[];

  if (availableMoves.length === 0) return -1;
  const randomMove =
    availableMoves[Math.floor(Math.random() * availableMoves.length)];
  return randomMove;
}
