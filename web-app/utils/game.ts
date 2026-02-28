import { BoardState, Player } from "@/types/history";

export function checkWinner(squares: BoardState): Player | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function isDraw(squares: BoardState): boolean {
  return squares.every((square) => square !== null) && !checkWinner(squares);
}

export function isValidMove(squares: BoardState, index: number): boolean {
  return squares[index] === null;
}
