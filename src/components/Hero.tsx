"use client";

import { site } from "@/data/site";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/lang";
import { asset } from "@/lib/asset";
import { toMin } from "@/lib/booking";
import { Anchor } from "./Chrome";
import { SlideVideo } from "./SlideVideo";

function restaurantMinutes(): number {
  const [h, m] = new Intl.DateTimeFormat("ru-RU", {
    timeZone: site.timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(new Date()).split(":").map(Number);
  return h * 60 + m;
}

function OpenStatus() {
  const { t } = useT();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(restaurantMinutes());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <p className="hero__status" />;
  const open = now >= toMin(site.openTime) && now < toMin(site.closeTime);
  return (
    <p className={"hero__status" + (open ? " is-open" : "")}>
      <span className="hero__status-dot" aria-hidden="true" />
      {open ? t.hero.open : t.hero.closed}
      <span className="hero__status-sub">{open ? t.hero.until(site.closeTime) : t.hero.opensAt(site.openTime)}</span>
    </p>
  );
}

export function Hero() {
  const { t } = useT();
  return (
    <section className="slide hero" id="home" data-slide aria-label={t.hero.aria}>
      <div className="slide__media hero__media" style={{ backgroundImage: `url(${asset("/video/hero-poster.jpg")})` }}>
        <SlideVideo className="hero__video" src="/video/hero.mp4" poster="/video/hero-poster.jpg" eager />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <h1 className="hero__title">
        <span className="hero__word display">{site.name}</span>
        <span className="hero__accent italic">restaurant</span>
      </h1>

      <div className="hero__foot">
        <OpenStatus />
        <Anchor to="menu" className="hero__scroll label">
          {t.hero.scroll}<span className="hero__scroll-line" aria-hidden="true" />
        </Anchor>
        <p className="hero__info">{t.place.address}<br /><span className="nowrap">{t.place.hours}</span></p>
      </div>
    </section>
  );
}
