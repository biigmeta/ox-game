import React from "react";
import Divider from "../general/Divider";
interface InfoCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
}
export default function InfoCard({
  title,
  value,
  prefix,
  suffix,
}: InfoCardProps) {
  return (
    <div className="bg-[var(--card)] rounded-md shadow-md p-4 border-t-2 border-[var(--primary)]">
      <h2 className="">{title}</h2>
      <p className="text-xl font-bold">
        {prefix}
        {value}
        {suffix}
      </p>
    </div>
  );
}
