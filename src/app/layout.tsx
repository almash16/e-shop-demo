import { Suspense } from "react";
import { Header } from "core/components/header/header";
import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Loading from "./loading";
import { LocalContextProvider } from "core/contexts/local-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "eShop Demo",
  description: "demo with next13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocalContextProvider>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </LocalContextProvider>
      </body>
    </html>
  );
}
