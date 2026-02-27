"use client";
import Board from "@/components/game/Board";
import PlayerInfo from "@/components/game/PlayerInfo";
import SelectPlayer from "@/components/game/SelectPlayer";
import TopBar from "@/components/game/TopBar";
import { GameResult, Player } from "@/types/game";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const [player, setPlayer] = useState<Player | null>(null);
  const router = useRouter();

  const handleGameOver = async (result: GameResult) => {
    console.log("Game Over:", result);
    
  };

  const handleSelectPlayer = (selectedPlayer: Player) => {
    setPlayer(selectedPlayer);
  };

  const resetPlayer = () => {
    setPlayer(null);
  };

  return (
    <div className="w-full  h-full flex flex-col bg-[var(--card)] rounded-md shadow-md">
      <TopBar resetPlayer={resetPlayer} />
      <PlayerInfo playerName="sdfds" playerScore={0} />
      <div className="flex flex-col items-center justify-center grow relative">
        {player ? (
          <Board player={player} onGameOver={handleGameOver} />
        ) : (
          <SelectPlayer onSelect={handleSelectPlayer} />
        )}
      </div>
    </div>
  );
}
