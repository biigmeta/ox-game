import React from "react";

interface PlayerInfoProps {
  playerName: string;
  playerScore: number;
}

export default function PlayerInfo({
  playerName,
  playerScore,
}: PlayerInfoProps) {
  return (
    <div className="w-full flex flex-row items-center justify-between p-8">
      <div>
        <p className="truncate">
          Player: <span className="font-bold text-xl">{playerName || "-"}</span>
        </p>
      </div>
      <p>
        Score: <span className="font-bold text-xl">{playerScore || 0}</span>
      </p>
    </div>
  );
}
