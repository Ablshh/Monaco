"use client";

import Link from "next/link";
import { Fragment } from "react";
import { banquet, categories, formatPrice } from "@/data/menu";
import { whatsappLink } from "@/data/site";
import { useT } from "@/i18n/lang";
import { Icon } from "./Icon";
import { SlideVideo } from "./SlideVideo";

function chefPicks() {
  const picks = categories.flatMap((c) =>
    c.dishes
      .filter((d) => (d.tag === "Шеф" || d.tag === "Хит") && d.available !== false)
      .map((d) => ({ cat: c, dish: d })),
  );
  const seen = new Set<string>();
  const first = picks.filter((p) => !seen.has(p.cat.id) && seen.add(p.cat.id));
  const rest = picks.filter((p) => !first.includes(p));
  return [...first, ...rest].slice(0, 4);
}

const Ornament = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 1c.7 4.6 2.6 7.6 6 9.5-3.4 1.9-5.3 4.9-6 9.5-.7-4.6-2.6-7.6-6-9.5 3.4-1.9 5.3-4.9 6-9.5z" />
  </svg>
);

export function MenuShowcase() {
  const { t, tx } = useT();
  const total = categories.reduce((n, c) => n + c.dishes.length, 0);
  const marquee = [0, 1, 2, 3].flatMap((k) =>
    categories.map((c) => <Fragment key={k + c.id}><span>{tx(c.title)}</span><Ornament /></Fragment>),
  );
  return (
    <section className="slide menu" id="menu" data-slide aria-label={t.showcase.title}>
      <div className="menu__bg" aria-hidden="true"><SlideVideo src="/video/menu.mp4" poster="/video/menu-poster.jpg" /></div>
      <p className="label menu__kicker">{t.showcase.kicker}</p>
      <h2 className="menu__title display">{t.showcase.title} <span className="italic">Monaco</span></h2>
      <div className="menu__cols">
        {chefPicks().map(({ cat, dish }) => (
          <article className="menu__col" key={dish.id}>
            <span className="label">{tx(cat.title)}</span>
            <h3>{tx(dish.name)}</h3>
            <p>{dish.description && tx(dish.description)}</p>
            <span className="price num">{formatPrice(dish.price)}</span>
          </article>
        ))}
      </div>
      <div className="menu__actions">
        <Link className="btn btn--primary" href="/menu"><Icon name="book" />{t.showcase.openAll}</Link>
        <span className="quiet menu__count">{t.showcase.count(categories.length, total)}</span>
      </div>
      <div className="marquee" aria-hidden="true"><div className="marquee__track">{marquee}</div></div>
    </section>
  );
}

export function Events() {
  const { t } = useT();
  const cheapest = Math.min(...banquet.sets.map((s) => s.price));
  return (
    <section className="slide events grain" id="events" data-slide aria-label={t.events.aria}>
      <div className="slide__media">
        <SlideVideo src="/video/events.mp4" poster="/video/events-poster.jpg" />
      </div>
      <div className="events__shade" aria-hidden="true" />

      <div className="events__head">
        <p className="label quiet">{t.events.kicker}</p>
        <h2 className="events__title display">{t.events.title} <span className="italic">{t.events.titleAccent}</span></h2>
      </div>
      <p className="events__big display num" aria-hidden="true">{banquet.maxGuests}</p>

      <ul className="events__list">
        {t.events.items(banquet.maxGuests, formatPrice(cheapest)).map((it) => (
          <li key={it.title}>
            <span className="events__num label num">{it.num}</span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </li>
        ))}
      </ul>

      <div className="events__actions">
        <a className="btn btn--primary" target="_blank" rel="noopener"
          href={whatsappLink(t.events.waText)}>
          <Icon name="whatsapp" />{t.events.discuss}
        </a>
        <Link className="btn btn--glass" href="/menu#banquet">{t.events.banquetMenu} <Icon name="arrow-short" /></Link>
      </div>
    </section>
  );
}

export function Wine() {
  const { t, tx } = useT();
  const wines = categories.find((c) => c.id === "wine")?.dishes.filter((d) => d.available !== false) ?? [];
  return (
    <section className="slide wine grain" id="wine" data-slide aria-label={t.wine.aria}>
      <div className="slide__media wine__media">
        <SlideVideo src="/video/wine.mp4" poster="/video/wine-poster.jpg" />
      </div>
      <div className="wine__shade" aria-hidden="true" />
      <h2 className="wine__title">
        <span className="display">Vino</span>
        <span className="italic">&amp; bar</span>
      </h2>
      <div className="wine__card glass">
        <p className="label wine__kicker">{t.wine.kicker}</p>
        <ul className="wine__list">
          {wines.map((w) => (
            <li key={w.id}>
              <span className="wine__name">{tx(w.name)}</span>
              <span className="price num">{formatPrice(w.price)}</span>
              {w.description && <span className="wine__note">{tx(w.description)}</span>}
            </li>
          ))}
        </ul>
        <Link className="btn btn--primary" href="/menu#wine">{t.wine.toMenu} <Icon name="arrow-short" /></Link>
      </div>
    </section>
  );
}
