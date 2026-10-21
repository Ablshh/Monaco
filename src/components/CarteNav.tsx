"use client";

import { useEffect, useRef, useState } from "react";

/** Липкая полоса разделов меню: подсвечивает раздел, который сейчас читают */
export function CarteNav({ items }: { items: { id: string; title: string }[] }) {
  const [current, setCurrent] = useState(-1);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spy = () => {
      let idx = -1;
      items.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 140) idx = i;
      });
      setCurrent(idx);
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    return () => window.removeEventListener("scroll", spy);
  }, [items]);

  // Активный пункт держим в центре полосы, когда она прокручивается вбок
  useEffect(() => {
    const track = trackRef.current, a = track?.children[current] as HTMLElement | undefined;
    if (!track || !a) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: a.offsetLeft - track.clientWidth / 2 + a.offsetWidth / 2, behavior: smooth ? "smooth" : "auto" });
  }, [current]);

  return (
    <nav className="carte-nav" aria-label="Разделы меню">
      <div className="carte-nav__track" ref={trackRef}>
        {items.map((it, i) => (
          <a key={it.id} href={"#" + it.id} className={i === current ? "is-active" : undefined}
            aria-current={i === current ? "true" : undefined}>
            {it.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
