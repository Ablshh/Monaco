"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LANGS, setLang, useT } from "@/i18n/lang";
import { Icon } from "./Icon";

/**
 * Выбор языка: компактная кнопка «🌐 РУС», по нажатию — список с полными названиями.
 * tone: dark — поверх видео на главной, light — на бумажной странице меню.
 */
export function LangSwitch({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const { lang, t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const cur = LANGS.find((l) => l.id === lang)!;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      ref.current?.querySelector<HTMLButtonElement>(".lang__btn")?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`lang lang--${tone}${className ? " " + className : ""}`} ref={ref}>
      <button
        type="button" className="lang__btn" aria-expanded={open} aria-controls={listId}
        aria-label={`${t.langLabel}: ${cur.name}`} onClick={() => setOpen((o) => !o)}
      >
        <Icon name="globe" /><span>{cur.short}</span><Icon name="chevron" />
      </button>
      {open && (
        <ul className="lang__menu" id={listId} aria-label={t.langLabel}>
          {LANGS.map((l) => (
            <li key={l.id}>
              <button type="button" lang={l.id} aria-current={l.id === lang ? "true" : undefined}
                onClick={() => { setLang(l.id); setOpen(false); }}>
                <span className="lang__name">{l.name}</span>
                <span className="lang__short">{l.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Три кнопки в ряд — для раскрытого меню на телефоне, где выпадающий список неудобен */
export function LangSegments({ className }: { className?: string }) {
  const { lang, t } = useT();
  return (
    <div className={`lang-seg${className ? " " + className : ""}`} role="group" aria-label={t.langLabel}>
      {LANGS.map((l) => (
        <button key={l.id} type="button" lang={l.id} aria-pressed={l.id === lang} aria-label={l.name}
          onClick={() => setLang(l.id)}>
          {l.short}
        </button>
      ))}
    </div>
  );
}

/** Держит <html lang> и заголовок вкладки в соответствии с выбранным языком */
export function LangSync({ title }: { title?: "site" | "carte" }) {
  const { lang, t } = useT();
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title === "carte" ? t.carte.title : t.docTitle;
  }, [lang, t, title]);
  return null;
}
