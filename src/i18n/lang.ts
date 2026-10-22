"use client";

import { useSyncExternalStore } from "react";
import { DICT } from "./dict";

export type Lang = "kk" | "ru" | "en";
/** Строка на трёх языках */
export type Txt = Record<Lang, string>;

export const LANGS: { id: Lang; short: string; name: string; locale: string }[] = [
  { id: "kk", short: "ҚАЗ", name: "Қазақша", locale: "kk-KZ" },
  { id: "ru", short: "РУС", name: "Русский", locale: "ru-RU" },
  { id: "en", short: "ENG", name: "English", locale: "en-GB" },
];

const KEY = "monaco-lang";
const listeners = new Set<() => void>();
let current: Lang | null = null;

const isLang = (v: unknown): v is Lang => v === "kk" || v === "ru" || v === "en";

/** Выбор гостя из браузера; при первом визите — язык системы, по умолчанию русский */
function initial(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (isLang(saved)) return saved;
  } catch {}
  const nav = (navigator.language || "").toLowerCase();
  return nav.startsWith("kk") ? "kk" : nav.startsWith("en") ? "en" : "ru";
}

function getLang(): Lang {
  return (current ??= initial());
}

export function setLang(lang: Lang) {
  current = lang;
  try { localStorage.setItem(KEY, lang); } catch {}
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

/** Текущий язык. Статическая сборка и первая отрисовка — на русском */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getLang, () => "ru");
}

/** Словарь текущего языка и выбор строки из { kk, ru, en } */
export function useT() {
  const lang = useLang();
  return { lang, t: DICT[lang], tx: (x: Txt) => x[lang], locale: LANGS.find((l) => l.id === lang)!.locale };
}
