"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { BookingRequest } from "@/lib/booking";

type Prefill = Partial<Pick<BookingRequest, "date" | "time" | "guests" | "comment">>;

type SiteContext = {
  /** id экрана, который сейчас на виду */
  active: string;
  scrollToId: (id: string) => void;
  /** Заполнить форму брони и прокрутить к ней */
  goBook: (prefill?: Prefill) => void;
  prefill: Prefill & { stamp: number };
};

const Ctx = createContext<SiteContext | null>(null);

export function useSite(): SiteContext {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSite вне SiteProvider");
  return c;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [active, setActive] = useState("home");
  const [prefill, setPrefill] = useState<SiteContext["prefill"]>({ stamp: 0 });

  /* Плавная прокрутка без магнита к экранам */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    lenisRef.current = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Активный экран: подсветка в шапке и точках, приближение фото */
  useEffect(() => {
    const slides = Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          slides.forEach((s) => s.classList.toggle("is-active", s === en.target));
          setActive(en.target.id);
        });
      },
      { threshold: 0.5 },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    history.replaceState(null, "", "#" + id);
  }, []);

  const goBook = useCallback(
    (p?: Prefill) => {
      if (p) setPrefill((prev) => ({ ...prev, ...p, stamp: prev.stamp + 1 }));
      scrollToId("book");
      setTimeout(() => {
        document.querySelector<HTMLInputElement>('#book input[name="name"]')?.focus({ preventScroll: true });
      }, prefersReducedMotion() ? 0 : 1300);
    },
    [scrollToId],
  );

  return <Ctx.Provider value={{ active, scrollToId, goBook, prefill }}>{children}</Ctx.Provider>;
}
