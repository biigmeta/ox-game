import { BoardState, GameResult, Player } from "@/types/history";
import { getBotMove } from "@/utils/bot";
import { checkWinner, isDraw, isValidMove } from "@/utils/game";
import clsx from "clsx";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface BoardProps {
  player: Player;
  onGameOver: (result: GameResult) => void;
}

const botDelay = 1000; // 1.0 seconds delay for bot move

export default function Board({ player, onGameOver }: BoardProps) {
  const router = useRouter();
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null));
  const [isPlayerMove, setIsPlayerMove] = useState(true);
  const [gameStatus, setGameStatus] = useState<"playing" | GameResult>(
    "playing"
  );

  const handleClick = (i: number) => {
    if (gameStatus !== "playing" || !isValidMove(squares, i) || !isPlayerMove)
      return;

    const nextSquares = squares.slice();
    nextSquares[i] = player;
    setSquares(nextSquares);
    setIsPlayerMove(false);
    checkGameStatus(nextSquares, player);
  };

  const handleGameOver = async (gameResult: GameResult) => {

    onGameOver(gameResult);

    const result = await Swal.fire({
      title: "Game Over",
      text: `Result: ${gameResult}`,
      confirmButtonText: "Play Again",
      cancelButtonText: "Back",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      resetGame();
      return;
    }

    setGameStatus(gameResult);
    router.back();
  };

  const checkGameStatus = (currentSquares: BoardState, lastPlayer: Player) => {
    const winner = checkWinner(currentSquares);
    if (winner) {
      const status: GameResult = winner === player ? "win" : "lose";
      setGameStatus(status);
      handleGameOver(status);
      return;
    }
    if (isDraw(currentSquares)) {
      const status: GameResult = "draw";
      setGameStatus(status);
      handleGameOver(status);
      return;
    }

    if (lastPlayer === player) {
      // Bot turn
      setTimeout(() => {
        const botIndex = getBotMove(currentSquares, player === "X" ? "O" : "X");
        if (botIndex !== -1) {
          const nextSquares = currentSquares.slice();
          nextSquares[botIndex] = player === "X" ? "O" : "X";
          setSquares(nextSquares);
          setIsPlayerMove(true);
          checkGameStatus(nextSquares, player === "X" ? "O" : "X");
        }
      }, botDelay);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsPlayerMove(true);
    setGameStatus("playing");
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 ">
      <div>
        {gameStatus && (
          <GameStatus
            player={player}
            currentTurn={isPlayerMove ? player : player === "X" ? "O" : "X"}
          />
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 bg-[var(--secondary-light)] rounded-lg p-2">
        {squares.map((square: Player | null, i) => (
          <button
            key={i}
            className="w-20 md:w-24 h-20 md:h-24 bg-[var(--card)] text-4xl font-bold flex items-center justify-center hover:bg-[var(--background)] duration-300 rounded-md"
            onClick={() => handleClick(i)}
          >
            {square && (
              <p
                className={clsx({
                  "text-[var(--primary)]": square === "O",
                  "text-[var(--accent)]": square === "X",
                })}
              >
                {square}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function GameStatus({
  player,
  currentTurn,
}: {
  player: Player;
  currentTurn: Player;
}) {

  return (
    <div className="w-full text-center py-4 px-8 text-lg font-bold bg-[var(--secondary-light)] dark:bg-[var(--secondary-dark)] rounded-lg shadow-md">
      {player === currentTurn ? (
        <p>
          {`Your Turn`}
          <span
            className={clsx({
              "text-[var(--primary)]": player === "O",
              "text-[var(--accent)]": player === "X",
            })}
          >{` (${player})`}</span>
        </p>
      ) : (
        <p>
          {`Bot's Turn`}
          <span
            className={clsx({
              "text-[var(--primary)]": currentTurn === "O",
              "text-[var(--accent)]": currentTurn === "X",
            })}
          >{` (${currentTurn})`}</span>
        </p>
      )}
    </div>
  );
}
