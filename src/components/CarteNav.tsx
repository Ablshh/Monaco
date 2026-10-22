"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";

/** Липкая полоса разделов меню: подсвечивает раздел, который сейчас читают.
 *  Когда полоса прилипла к верху, слева появляется «На сайт» — верхняя строка уже уехала */
export function CarteNav({ items, label, back }: { items: { id: string; title: string }[]; label: string; back: string }) {
  const [current, setCurrent] = useState(-1);
  const [stuck, setStuck] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spy = () => {
      let idx = -1;
      items.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 140) idx = i;
      });
      setCurrent(idx);
      const nav = navRef.current;
      setStuck(!!nav && window.scrollY > 0 && nav.getBoundingClientRect().top <= 0);
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
    <nav className={`carte-nav${stuck ? " is-stuck" : ""}`} aria-label={label} ref={navRef}>
      <Link className="carte-nav__back" href="/" aria-hidden={!stuck} tabIndex={stuck ? undefined : -1}>
        <Icon name="arrow-left" /><span>{back}</span>
      </Link>
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
