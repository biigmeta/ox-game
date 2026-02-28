import React from "react";
import { FaCircleUser } from "react-icons/fa6";

import { FaStar } from "react-icons/fa6";
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
      <div className="flex items-center gap-4">
        <FaCircleUser size={20} className="text-[var(--primary)]"/>
        <p className="truncate">
          <span className="font-bold text-xl">{playerName || "-"}</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <FaStar size={20} className="text-yellow-400" />
        <p className="font-bold text-xl">{playerScore || 0}</p>
      </div>
    </div>
  );
}
