"use client";

import { useSyncExternalStore } from "react";
import { categories, formatPrice, type Dish } from "@/data/menu";
import type { Dict } from "@/i18n/dict";
import type { Txt } from "@/i18n/lang";

export type OrderItem = { id: string; qty: number };
export type OrderLine = { dish: Dish; qty: number; sum: number };

const KEY = "monaco-order";
const MAX_QTY = 99;
const EMPTY: OrderItem[] = [];
const DISHES = new Map(categories.flatMap((c) => c.dishes).map((d) => [d.id, d]));
const listeners = new Set<() => void>();
let current: OrderItem[] | null = null;

function read(): OrderItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(raw)) return EMPTY;
    return raw.filter((x): x is OrderItem =>
      typeof x?.id === "string" && Number.isInteger(x?.qty) && x.qty > 0 && DISHES.get(x.id)?.available !== false);
  } catch {
    return EMPTY;
  }
}

function get(): OrderItem[] {
  return (current ??= read());
}

function write(next: OrderItem[]) {
  current = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { current = null; fn(); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(fn); window.removeEventListener("storage", onStorage); };
}

export function setQty(id: string, qty: number) {
  const items = get();
  const q = Math.max(0, Math.min(MAX_QTY, Math.round(qty)));
  const has = items.some((x) => x.id === id);
  if (q === 0) write(items.filter((x) => x.id !== id));
  else if (has) write(items.map((x) => (x.id === id ? { id, qty: q } : x)));
  else write([...items, { id, qty: q }]);
}

export function clearOrder() {
  write(EMPTY);
}

export function useOrder() {
  const items = useSyncExternalStore(subscribe, get, () => EMPTY);
  const lines: OrderLine[] = items.flatMap(({ id, qty }) => {
    const dish = DISHES.get(id);
    return dish ? [{ dish, qty, sum: dish.price * qty }] : [];
  });
  return {
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    total: lines.reduce((n, l) => n + l.sum, 0),
    qtyOf: (id: string) => items.find((x) => x.id === id)?.qty ?? 0,
  };
}

export function orderLinesText(lines: OrderLine[], total: number, d: Dict, tx: (x: Txt) => string): string[] {
  return [
    ...lines.map((l) => `${l.qty} × ${tx(l.dish.name)} — ${formatPrice(l.sum)}`),
    `${d.order.total}: ${formatPrice(total)}`,
  ];
}
