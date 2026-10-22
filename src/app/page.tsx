import { Booking } from "@/components/Booking";
import { Dots, EdgeSocials, Footer, Header, MenuFab } from "@/components/Chrome";
import { Hero } from "@/components/Hero";
import { Events, MenuShowcase, Wine } from "@/components/Sections";
import { LangSync } from "@/components/LangSwitch";
import { SiteProvider } from "@/components/SiteProvider";
import "@/styles/home.css";

export default function Home() {
  return (
    <SiteProvider>
      <LangSync />
      <Header />
      <MenuFab />
      <EdgeSocials />
      <Dots />
      <main>
        <Hero />
        <MenuShowcase />
        <Wine />
        <Events />
        <Booking />
      </main>
      <Footer />
    </SiteProvider>
  );
}
