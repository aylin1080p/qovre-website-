import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Qovre",
    template: "%s | Qovre",
  },
  description: "Websites, webshops, SaaS en AI-oplossingen voor bedrijven in Nederland. Gebaseerd in Den Haag, actief door heel Nederland.",
  metadataBase: new URL("https://www.qovre.nl"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
