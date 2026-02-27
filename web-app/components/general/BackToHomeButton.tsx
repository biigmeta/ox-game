import Link from "next/link";
import React from "react";

export default function BackToHomeButton() {
  return (
    <Link
      href={"/"}
      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
    >
      Back to Home
    </Link>
  );
}
