import Link from "next/link";
import React from "react";

export default function BackToHomeButton() {
  return (
    <Link
      href={"/"}
      className=" text-[var(--foreground)] hover:underline transition-colors"
    >
      Back to Home
    </Link>
  );
}
