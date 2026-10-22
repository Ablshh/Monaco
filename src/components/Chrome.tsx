"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/data/site";
import { useT } from "@/i18n/lang";
import { Icon } from "./Icon";
import { LangSegments, LangSwitch } from "./LangSwitch";
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

const NAV = ["home", "menu", "wine", "events", "book"] as const;

export function Header() {
  const { active, goBook } = useSite();
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
    <>
      <a className="skip-link" href="#book">{t.skipBook}</a>
      <header className={`hdr${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
        <nav className="hdr__nav" id="hdr-nav" aria-label={t.nav.label}>
          {NAV.map((id) => (
            <Anchor key={id} to={id} onGo={close} className={active === id ? "is-active" : undefined}
              aria-current={active === id ? "true" : undefined}>
              {t.nav[id]}
            </Anchor>
          ))}
          <a className="hdr__nav-m" href={whatsappLink(t.orderText)} target="_blank" rel="noopener">{t.header.orderWa}</a>
          <a className="hdr__nav-m" href="#book" onClick={(e) => { e.preventDefault(); close(); goBook(); }}>{t.header.bookTable}</a>
          <LangSegments className="hdr__lang-m" />
        </nav>

        <Anchor to="home" className="hdr__logo" aria-label={t.header.toHome}>
          <Logo className="hdr__mark" />
          <span className="hdr__name">{site.name}</span>
        </Anchor>

        <div className="hdr__end">
          <LangSwitch className="hdr__lang" />
          <div className="duo" role="group" aria-label={t.header.actions}>
            <a className="duo__order" href={whatsappLink(t.orderText)} target="_blank" rel="noopener">
              <Icon name="bag" />{t.header.order}
            </a>
            <a className="duo__book" href="#book" onClick={(e) => { e.preventDefault(); goBook(); }}>
              {t.header.book} <Icon name="arrow-short" />
            </a>
          </div>
          <Link className="hdr__menu-m" href="/menu">{t.header.menu}</Link>
          <button
            className="btn-icon hdr__burger" type="button"
            aria-label={open ? t.header.closeNav : t.header.openNav}
            aria-expanded={open} aria-controls="hdr-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}

/** Отдельная кнопка меню: всегда в правом нижнем углу */
export function MenuFab() {
  const { t } = useT();
  return (
    <Link className="menu-fab" href="/menu" aria-label={t.fab.aria}>
      <svg className="menu-fab__ring" viewBox="0 0 120 120" aria-hidden="true">
        <defs><path id="fab-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
        <text>
          <textPath href="#fab-circle" textLength="286" lengthAdjust="spacing">
            {t.fab.ring}
          </textPath>
        </text>
      </svg>
      <span className="menu-fab__core"><Icon name="book" /><span>{t.fab.label}</span></span>
    </Link>
  );
}

export function EdgeSocials() {
  const { t } = useT();
  return (
    <aside className="edge" aria-label={t.socials}>
      <a href={site.instagram} className="label" target="_blank" rel="noopener">Instagram</a>
      <span className="edge__rule" aria-hidden="true" />
      <a href={whatsappLink(t.hello)} className="label" target="_blank" rel="noopener">WhatsApp</a>
    </aside>
  );
}

const SLIDES = ["home", "menu", "wine", "events", "book"] as const;

export function Dots() {
  const { active } = useSite();
  const { t } = useT();
  const i = Math.max(0, SLIDES.findIndex((id) => id === active));
  return (
    <nav className="dots" aria-label={t.slides.label}>
      <span className="dots__count num" aria-hidden="true"><b>{String(i + 1).padStart(2, "0")}</b> / {String(SLIDES.length).padStart(2, "0")}</span>
      {SLIDES.map((id) => (
        <Anchor key={id} to={id} aria-label={t.slides[id]} className={active === id ? "is-active" : undefined} />
      ))}
    </nav>
  );
}

export function Footer() {
  const { t } = useT();
  return (
    <footer className="foot">
      <Logo className="foot__mark" />
      <span className="foot__name display">{site.name}</span>
      <span className="quiet">{t.place.kind}</span>
      <span className="quiet foot__credit">{t.footerCredit}</span>
    </footer>
  );
}
