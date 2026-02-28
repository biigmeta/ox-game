"use client";
import Board from "@/components/game/Board";
import PlayerInfo from "@/components/game/PlayerInfo";
import SelectPlayer from "@/components/game/SelectPlayer";
import TopBar from "@/components/game/TopBar";
import { useUserStore } from "@/stores/useUserStore";
import { GameResult, Player } from "@/types/game";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((state) => state.isHydrated);

  const [player, setPlayer] = useState<Player | null>(null);

  const handleGameOver = async (result: GameResult) => {
    console.log("Game Over:", result);
  };

  const handleSelectPlayer = (selectedPlayer: Player) => {
    setPlayer(selectedPlayer);
  };

  const resetPlayer = () => {
    setPlayer(null);
  };

  useEffect(() => {
    if (!isHydrated) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }
  }, [isHydrated, user, router]);

  return (
    <div className="w-full  h-full flex flex-col bg-[var(--card)] rounded-md shadow-md">
      <TopBar resetPlayer={resetPlayer} />
      <PlayerInfo
        playerName={`${user?.firstName} ${user?.lastName}`}
        playerScore={0}
      />
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
