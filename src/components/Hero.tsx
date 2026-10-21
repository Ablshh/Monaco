"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import { guestsWord, isoDate, slotsFor } from "@/lib/booking";
import { useMounted } from "@/lib/useMounted";
import { Icon } from "./Icon";
import { useSite } from "./SiteProvider";

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 50];

type Day = { value: string; label: string };

function nextDays(n: number): Day[] {
  const d0 = new Date();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(d0.getFullYear(), d0.getMonth(), d0.getDate() + i);
    const label = i === 0 ? "Сегодня" : i === 1 ? "Завтра"
      : d.toLocaleDateString("ru-RU", { weekday: "short", day: "numeric", month: "short" });
    return { value: isoDate(d), label };
  });
}

/** Быстрая бронь: день, время, гости → переносит выбор в полную форму */
function QuickBooking() {
  const { goBook } = useSite();
  // Даты зависят от «сегодня», поэтому считаются только в браузере
  const mounted = useMounted();
  const days = useMemo(() => {
    if (!mounted) return [];
    const list = nextDays(14);
    return slotsFor(list[0].value).length ? list : list.slice(1); // сегодня уже всё прошло
  }, [mounted]);
  const [dayPick, setDay] = useState("");
  const [timePick, setTime] = useState("");
  const [guests, setGuests] = useState(2);

  const day = dayPick || days[0]?.value || "";
  const times = day ? slotsFor(day) : [];
  const time = times.includes(timePick) ? timePick : times.includes("19:00") ? "19:00" : times[0] ?? "";

  return (
    <form
      className="quick glass"
      aria-label="Быстрая бронь"
      onSubmit={(e) => { e.preventDefault(); goBook({ date: day, time, guests }); }}
    >
      <label className="quick__cell">
        <span className="sr-only">Дата</span>
        <select className="quick__select" value={day} onChange={(e) => setDay(e.target.value)}>
          {days.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
      </label>
      <label className="quick__cell">
        <span className="sr-only">Время</span>
        <select className="quick__select num" value={time} onChange={(e) => setTime(e.target.value)}>
          {times.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="quick__cell">
        <span className="sr-only">Гостей</span>
        <select className="quick__select" value={guests} onChange={(e) => setGuests(+e.target.value)}>
          {GUEST_OPTIONS.map((n) => <option key={n} value={n}>{guestsWord(n)}</option>)}
        </select>
      </label>
      <button className="btn btn--primary" type="submit">Найти стол <Icon name="arrow-short" /></button>
    </form>
  );
}

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); return; }
    const play = () => { v.play().catch(() => {}); };
    // Не крутим видео, когда первый экран не виден
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? play() : v.pause()), { threshold: 0.05 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref} className="hero__video" autoPlay muted loop playsInline preload="auto"
      poster={asset("/video/hero-poster.jpg")} aria-hidden="true"
    >
      <source src={asset("/video/hero.mp4")} type="video/mp4" />
    </video>
  );
}

export function Hero() {
  return (
    <section className="slide hero" id="home" data-slide aria-label="Главная">
      <div className="slide__media hero__media" style={{ backgroundImage: `url(${asset("/video/hero-poster.jpg")})` }}>
        <HeroVideo />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <h1 className="hero__title">
        <span className="hero__word display">{site.name}</span>
        <span className="hero__accent italic">restaurant</span>
      </h1>

      <QuickBooking />

      <div className="hero__cols">
        <p>Стейки, гриль и&nbsp;бешбармак. Банкеты до&nbsp;50&nbsp;гостей.</p>
        <p>{site.address}<br /><span className="nowrap">{site.hours}</span></p>
      </div>
    </section>
  );
}
