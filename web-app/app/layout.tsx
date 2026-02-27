import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Provider from "@/components/hoc/Provider";
import Wrapper from "@/components/hoc/Wrapper";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OX Game",
  description: "A simple OX game built with Next.js and React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansThai.variable}`}>
        <Provider>
          <Wrapper>{children}</Wrapper>
        </Provider>
      </body>
    </html>
  );
}
