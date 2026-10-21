"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ORDER_TEXT, site, whatsappLink } from "@/data/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { useSite } from "./SiteProvider";

/** Ссылка на экран страницы: прокручивает плавно, без перезагрузки */
export function Anchor({ to, className, children, onGo, ...rest }:
  { to: string; className?: string; children?: React.ReactNode; onGo?: () => void } & React.AriaAttributes) {
  const { scrollToId } = useSite();
  return (
    <a
      href={"#" + to}
      className={className}
      onClick={(e) => { e.preventDefault(); onGo?.(); scrollToId(to); }}
      {...rest}
    >
      {children}
    </a>
  );
}

const NAV = [
  { id: "home", label: "Главная" },
  { id: "kitchen", label: "Кухня" },
  { id: "events", label: "Банкеты" },
  { id: "hall", label: "Зал" },
  { id: "book", label: "Контакты" },
];
// Какой пункт шапки подсвечивать, когда на виду экран без своего пункта
const NAV_FOR: Record<string, string> = { menu: "kitchen", wine: "events" };

export function Header() {
  const { active, goBook } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const current = NAV_FOR[active] ?? active;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`hdr${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <nav className="hdr__nav" id="hdr-nav" aria-label="Разделы">
        {NAV.map((n) => (
          <Anchor key={n.id} to={n.id} onGo={close} className={current === n.id ? "is-active" : undefined}
            aria-current={current === n.id ? "true" : undefined}>
            {n.label}
          </Anchor>
        ))}
        <a className="hdr__nav-m" href={whatsappLink(ORDER_TEXT)} target="_blank" rel="noopener">Заказать в WhatsApp</a>
        <a className="hdr__nav-m" href="#book" onClick={(e) => { e.preventDefault(); close(); goBook(); }}>Забронировать стол</a>
      </nav>

      <Anchor to="home" className="hdr__logo" aria-label="Monaco — на главный экран">
        <Logo className="hdr__mark" />
        <span className="hdr__name">{site.name}</span>
      </Anchor>

      <div className="hdr__end">
        <a className="hdr__phone" href={site.phoneHref}>{site.phone}</a>
        <div className="duo" role="group" aria-label="Заказ и бронь">
          <a className="duo__order" href={whatsappLink(ORDER_TEXT)} target="_blank" rel="noopener">
            <Icon name="bag" />Заказать
          </a>
          <a className="duo__book" href="#book" onClick={(e) => { e.preventDefault(); goBook(); }}>
            Забронировать <Icon name="arrow-short" />
          </a>
        </div>
        <Link className="hdr__menu-m" href="/menu">Меню</Link>
        <button
          className="btn-icon hdr__burger" type="button"
          aria-label={open ? "Закрыть разделы" : "Открыть разделы"}
          aria-expanded={open} aria-controls="hdr-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}

/** Отдельная кнопка меню: всегда в правом нижнем углу */
export function MenuFab() {
  return (
    <Link className="menu-fab" href="/menu" aria-label="Открыть меню ресторана">
      <svg className="menu-fab__ring" viewBox="0 0 120 120" aria-hidden="true">
        <defs><path id="fab-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
        <text>
          <textPath href="#fab-circle" textLength="286" lengthAdjust="spacing">
            МЕНЮ · MENU · МЕНЮ · MENU · МЕНЮ · MENU ·{" "}
          </textPath>
        </text>
      </svg>
      <span className="menu-fab__core"><Icon name="book" /><span>Меню</span></span>
    </Link>
  );
}

export function EdgeSocials() {
  return (
    <aside className="edge" aria-label="Соцсети">
      <a href={site.instagram} className="label" target="_blank" rel="noopener">Instagram</a>
      <span className="edge__rule" aria-hidden="true" />
      <a href={whatsappLink("Здравствуйте!")} className="label" target="_blank" rel="noopener">WhatsApp</a>
    </aside>
  );
}

const SLIDES = [
  ["home", "Главная"], ["kitchen", "Кухня"], ["menu", "Меню"], ["events", "Банкеты"],
  ["wine", "Бар"], ["hall", "Зал"], ["book", "Бронь"],
] as const;

export function Dots() {
  const { active } = useSite();
  const i = Math.max(0, SLIDES.findIndex(([id]) => id === active));
  return (
    <nav className="dots" aria-label="Экраны">
      <span className="dots__count num" aria-hidden="true"><b>{String(i + 1).padStart(2, "0")}</b> / {String(SLIDES.length).padStart(2, "0")}</span>
      {SLIDES.map(([id, label]) => (
        <Anchor key={id} to={id} aria-label={label} className={active === id ? "is-active" : undefined} />
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <Logo className="foot__mark" />
      <span className="foot__name display">{site.name}</span>
      <span className="quiet">{site.kindRu}</span>
      <span className="quiet foot__credit">Видео и фото: Mixkit, бесплатная лицензия</span>
    </footer>
  );
}
