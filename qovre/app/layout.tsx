import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qovre",
  description: "Slimme software voor ambitieuze bedrijven",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
