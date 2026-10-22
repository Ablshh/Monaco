import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "@/styles/base.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic", "cyrillic-ext"], // cyrillic-ext — казахские ә, ғ, қ, ң, ө, ұ, ү, і
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Monaco — ресторан в Кызылорде",
  description: "Ресторан Monaco в Кызылорде: стейки, гриль, национальная кухня, банкеты до 50 гостей. Забронируйте стол онлайн.",
  icons: { icon: (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/monaco-logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1F0305",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
