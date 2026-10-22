"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CarteNav } from "@/components/CarteNav";
import { Icon } from "@/components/Icon";
import { banquet, categories, formatPrice, type Dish } from "@/data/menu";
import { photoCredits } from "@/data/photoCredits";
import { site, whatsappLink } from "@/data/site";
import { localizeWeight } from "@/i18n/dict";
import { useT } from "@/i18n/lang";
import { asset } from "@/lib/asset";
import { LangSwitch, LangSync } from "./LangSwitch";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** Фото блюда крупно: открывается по нажатию на миниатюру, закрывается крестиком, фоном или Esc */
function DishZoom({ d, onClose }: { d: Dish; onClose: () => void }) {
  const { t, tx } = useT();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dlg = ref.current;
    dlg?.showModal();
    return () => dlg?.close();
  }, []);
  const name = tx(d.name);
  return (
    <dialog className={`zoom${d.available === false ? " zoom--off" : ""}`} ref={ref} aria-label={name} onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="zoom__card">
        <button className="zoom__close" type="button" onClick={onClose} aria-label={t.carte.close}><Icon name="close" /></button>
        <img className="zoom__photo" src={asset(`/menu/${d.id}.webp`)} alt={name} width={640} height={640} />
        <div className="zoom__text">
          <h3 className="zoom__name">{name}</h3>
          <p className="zoom__price num">{formatPrice(d.price)}</p>
          {(d.description || d.weight) && (
            <p className="zoom__meta">
              {d.description && tx(d.description)}
              {d.description && d.weight && " · "}
              {d.weight && localizeWeight(d.weight, t)}
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}

function DishRow({ d, onZoom }: { d: Dish; onZoom: (d: Dish) => void }) {
  const { t, tx } = useT();
  const off = d.available === false;
  const name = tx(d.name);
  return (
    <li className={`dish${off ? " dish--off" : ""}${d.photo ? " dish--photo" : ""}`}>
      {d.photo && (
        <button className="dish__zoom" type="button" onClick={() => onZoom(d)} aria-label={t.carte.zoom(name)}>
          <img className="dish__photo" src={asset(`/menu/${d.id}.webp`)} alt=""
            width={640} height={640} loading="lazy" decoding="async" />
        </button>
      )}
      <div className="dish__row">
        <h3 className="dish__name">{name}</h3>
        {off ? <span className="dish__off">{t.carte.off}</span>
          : d.tag && <span className={`dish__tag${d.tag === "Остро" ? " dish__tag--hot" : ""}`}>{t.carte.tags[d.tag]}</span>}
        <span className="dish__lead" aria-hidden="true" />
        <span className="dish__price num">
          {off && <span className="sr-only">{t.carte.offSr}</span>}
          {formatPrice(d.price)}
        </span>
      </div>
      {(d.description || d.weight) && (
        <p className="dish__meta">
          {d.description && <span>{tx(d.description)}</span>}
          {d.weight && <span className="dish__w">{localizeWeight(d.weight, t)}</span>}
        </p>
      )}
    </li>
  );
}

export function Carte() {
  const { t, tx } = useT();
  const [zoom, setZoom] = useState<Dish | null>(null);
  return (
    <div className="carte">
      <LangSync title="carte" />
      <a className="skip-link" href="#carte">{t.carte.skip}</a>

      <header className="carte-top">
        <Link className="carte-top__back" href="/"><Icon name="arrow-left" /><span>{t.carte.back}</span></Link>
        <Link className="carte-top__logo" href="/" aria-label={t.carte.toHome}>
          <img src={asset("/monaco-logo-dark.svg")} alt="" width={30} height={35} className="carte-top__mark" />
          <span>{site.name}</span>
        </Link>
        <div className="carte-top__end">
          <LangSwitch tone="light" />
          <Link className="carte-top__book" href="/#book">{t.carte.book}</Link>
        </div>
      </header>

      <section className="carte-cover">
        <h1 className="carte-cover__title display">{t.carte.cover}</h1>
        <p className="carte-cover__sub italic">{site.name} · {t.place.city}</p>
        <p className="carte-cover__note">{t.carte.note}</p>
      </section>

      <CarteNav label={t.carte.navLabel} back={t.carte.back}
        items={[...categories.map((c) => ({ id: c.id, title: tx(c.title) })), { id: "banquet", title: t.carte.banquetNav }]} />

      <main id="carte" className="carte-body">
        {categories.map((c, i) => (
          <section className="course" id={c.id} key={c.id} aria-labelledby={`h-${c.id}`}>
            <header className="course__head">
              <span className="course__num">{ROMAN[i]}</span>
              <h2 className="course__title" id={`h-${c.id}`}>{tx(c.title)}</h2>
              <span className="course__count">{t.carte.positions(c.dishes.length)}</span>
            </header>
            <ul className="dishes">{c.dishes.map((d) => <DishRow key={d.id} d={d} onZoom={setZoom} />)}</ul>
          </section>
        ))}
      </main>

      <section className="banquet" id="banquet" aria-labelledby="banquet-title">
        <header className="banquet__head">
          <p className="label">{t.carte.banquetFor(banquet.minGuests, banquet.maxGuests)}</p>
          <h2 className="banquet__title display" id="banquet-title">
            {t.carte.banquetTitle} <span className="italic">{t.carte.banquetAccent}</span>
          </h2>
        </header>
        <div className="banquet__sets">
          {banquet.sets.map((s) => (
            <article className="set" key={s.name.ru}>
              {"tag" in s && s.tag && <span className="set__tag">{tx(s.tag)}</span>}
              <h3 className="set__name">{tx(s.name)}</h3>
              <p className="set__price num">{formatPrice(s.price)}<small>{t.carte.perGuest}</small></p>
              <ul>{s.items.map((x) => <li key={x.ru}>{tx(x)}</li>)}</ul>
            </article>
          ))}
        </div>
        <a className="btn banquet__cta" href={whatsappLink(t.carte.banquetText)} target="_blank" rel="noopener">
          <Icon name="whatsapp" />{t.carte.banquetCta}
        </a>
      </section>

      <footer className="carte-foot">
        <p>{t.place.address} · {t.place.hours} · <a href={site.phoneHref}>{site.phone}</a></p>
        <p className="carte-foot__demo">{t.carte.demo}</p>
        <details className="carte-credits">
          <summary>{t.carte.credits}</summary>
          <ul>
            {photoCredits.map((c) => (
              <li key={c.photo}><a href={c.page} target="_blank" rel="noopener">{c.artist}</a>, {c.license}</li>
            ))}
          </ul>
        </details>
      </footer>

      {zoom && <DishZoom d={zoom} onClose={() => setZoom(null)} />}

      <div className="carte-dock" role="group" aria-label={t.carte.dockLabel}>
        <a className="carte-dock__order" href={whatsappLink(t.orderText)} target="_blank" rel="noopener"><Icon name="bag" />{t.carte.dockOrder}</a>
        <Link className="carte-dock__book" href="/#book">{t.carte.dockBook}</Link>
      </div>
    </div>
  );
}
