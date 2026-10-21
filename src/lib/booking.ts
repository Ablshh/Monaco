import { site } from "@/data/site";

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

export function plural(n: number, one: string, few: string, many: string): string {
  const a = n % 10, b = n % 100;
  if (a === 1 && b !== 11) return one;
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few;
  return many;
}
export function guestsWord(n: number): string {
  return `${n} ${plural(n, "гость", "гостя", "гостей")}`;
}
export function humanDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" });
}

export type BookingRequest = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  comment?: string;
};

/** Текст заявки, который гость отправляет в WhatsApp ресторана */
export function bookingMessage(b: BookingRequest): string {
  return [
    `Здравствуйте! Хочу забронировать стол в ${site.name}.`,
    "",
    `Имя: ${b.name}`,
    `Телефон: ${b.phone}`,
    `Дата: ${humanDate(b.date)}`,
    `Время: ${b.time}`,
    `Гостей: ${b.guests}`,
    ...(b.comment ? [`Пожелание: ${b.comment}`] : []),
  ].join("\n");
}
