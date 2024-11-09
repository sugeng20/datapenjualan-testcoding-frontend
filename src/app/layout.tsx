import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Providers from "@/components/ProgressBarProvider";

export const metadata: Metadata = {
  title: "Data Penjualan Application",
  description: "Generated by create next app",
};

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.className} bg-[#F6F6F6]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
