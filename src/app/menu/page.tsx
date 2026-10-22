import type { Metadata } from "next";
import { Carte } from "@/components/Carte";
import "@/styles/menu.css";

export const metadata: Metadata = {
  title: "Меню — Monaco, Кызылорда",
  description: "Меню ресторана Monaco: закуски, салаты, стейки, национальная кухня, коктейли, десерты и банкетные сеты.",
};

export default function MenuPage() {
  return <Carte />;
}
