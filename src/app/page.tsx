import { Booking } from "@/components/Booking";
import { Dots, EdgeSocials, Footer, Header, MenuFab } from "@/components/Chrome";
import { Hall } from "@/components/Hall";
import { Hero } from "@/components/Hero";
import { Kitchen } from "@/components/Kitchen";
import { Events, MenuShowcase, Wine } from "@/components/Sections";
import { SiteProvider } from "@/components/SiteProvider";
import "@/styles/home.css";

export default function Home() {
  return (
    <SiteProvider>
      <a className="skip-link" href="#book">К бронированию</a>
      <Header />
      <MenuFab />
      <EdgeSocials />
      <Dots />
      <main>
        <Hero />
        <Kitchen />
        <MenuShowcase />
        <Events />
        <Wine />
        <Hall />
        <Booking />
      </main>
      <Footer />
    </SiteProvider>
  );
}
