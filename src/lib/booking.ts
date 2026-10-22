import { site } from "@/data/site";
import type { Dict } from "@/i18n/dict";

export function pad(n: number): string {
  return (n < 10 ? "0" : "") + n;
}
export function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
export function toTime(m: number): string {
  return pad(Math.floor(m / 60) % 24) + ":" + pad(m % 60);
}
export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function slots(): string[] {
  const { firstSlot, lastSlot, stepMin } = site.booking;
  const out: string[] = [];
  for (let m = toMin(firstSlot); m <= toMin(lastSlot); m += stepMin) out.push(toTime(m));
  return out;
}

/** Свободные на выбранный день слоты: сегодня — только те, что ещё не прошли */
export function slotsFor(dateIso: string, now = new Date()): string[] {
  if (dateIso !== isoDate(now)) return slots();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  return slots().filter((t) => toMin(t) > nowMin);
}

export function humanDate(iso: string, locale: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
}

export type BookingRequest = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  comment?: string;
};

/** Текст заявки, который гость отправляет в WhatsApp ресторана — на языке сайта */
export function bookingMessage(b: BookingRequest, d: Dict, locale: string): string {
  const m = d.book.msg;
  return [
    m.hello,
    "",
    `${m.name}: ${b.name}`,
    `${m.phone}: ${b.phone}`,
    `${m.date}: ${humanDate(b.date, locale)}`,
    `${m.time}: ${b.time}`,
    `${m.guests}: ${b.guests}`,
    ...(b.comment ? [`${m.wish}: ${b.comment}`] : []),
  ].join("\n");
}
