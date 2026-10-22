"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/data/menu";
import { site, whatsappLink } from "@/data/site";
import { useMounted } from "@/lib/useMounted";
import { useT } from "@/i18n/lang";
import { bookingMessage, humanDate, isoDate, slotsFor, type BookingRequest } from "@/lib/booking";
import { orderLinesText, useOrder } from "@/lib/order";
import { Icon } from "./Icon";
import { SlideVideo } from "./SlideVideo";
import { useSite } from "./SiteProvider";

type Errors = Partial<Record<"name" | "phone" | "date" | "time", string>>;

function ConfirmDishes({ items, sum, onAnswer }: { items: string; sum: string; onAnswer: (withDishes: boolean | null) => void }) {
  const { t } = useT();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dlg = ref.current;
    if (dlg && !dlg.open) dlg.showModal();
  }, []);
  const c = t.book.confirm;
  return (
    <dialog className="confirm glass--dark" ref={ref} aria-labelledby="confirm-title" data-lenis-prevent
      onClose={() => onAnswer(null)} onClick={(e) => { if (e.target === e.currentTarget) onAnswer(null); }}>
      <span className="order-mark order-mark--lg" aria-hidden="true">!</span>
      <h2 className="confirm__title display" id="confirm-title">{c.title} <span className="italic">{c.titleAccent}</span></h2>
      <p className="confirm__text">{c.text(items, sum)}</p>
      <div className="confirm__actions">
        <button type="button" className="btn btn--primary" onClick={() => onAnswer(true)}>{c.yes}</button>
        <button type="button" className="btn btn--outline" onClick={() => onAnswer(false)}>{c.no}</button>
      </div>
    </dialog>
  );
}

export function Booking() {
  const { prefill } = useSite();
  const { t, tx, locale } = useT();
  const { lines, count, total } = useOrder();
  const MSG = t.book.errors;
  const [form, setForm] = useState<BookingRequest>({ name: "", phone: "", date: "", time: "", guests: 2, comment: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);
  const [sentWithDishes, setSentWithDishes] = useState(false);
  const mounted = useMounted();
  const today = mounted ? isoDate(new Date()) : "";
  const date = form.date || today;

  const [seenStamp, setSeenStamp] = useState(0);
  if (prefill.stamp !== seenStamp) {
    setSeenStamp(prefill.stamp);
    const { stamp: _stamp, ...rest } = prefill;
    setForm((f) => ({ ...f, ...rest }));
    setSentUrl(null);
  }

  const times = date ? slotsFor(date) : [];
  const max = site.booking.maxGuests;
  const set = <K extends keyof BookingRequest>(k: K, v: BookingRequest[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = MSG.name;
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = MSG.phone;
    if (!date) e.date = MSG.date;
    if (!form.time || !times.includes(form.time)) e.time = MSG.time;
    setErrors(e);
    const first = (["date", "time", "name", "phone"] as const).find((k) => e[k]);
    if (first) document.querySelector<HTMLElement>(`#book [name="${first}"]`)?.focus();
    return !first;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (count > 0) setAsking(true);
    else send(false);
  }

  function send(withDishes: boolean) {
    const dishes = withDishes ? orderLinesText(lines, total, t, tx) : [];
    const url = whatsappLink(bookingMessage({ ...form, date, name: form.name.trim(), phone: form.phone.trim() }, t, locale, dishes));
    const a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    a.click();
    setSentUrl(url);
    setSentWithDishes(withDishes);
  }

  return (
    <section className="slide book grain" id="book" data-slide aria-label={t.book.aria}>
      <div className="slide__media"><SlideVideo src="/video/book.mp4" poster="/video/book-poster.jpg" /></div>
      <div className="book__shade" aria-hidden="true" />

      <form className="book__panel glass--dark" noValidate onSubmit={submit}>
        {sentUrl ? (
          <div className="booking-done" aria-live="polite">
            <Icon name="check" className="book__check" />
            <h2 className="book__title display">{t.book.doneTitle} <span className="italic">{t.book.doneAccent}</span></h2>
            <p className="num">
              {humanDate(date, locale)} · {form.time} · {t.book.guestsWord(form.guests)}
              {sentWithDishes && <> · {t.order.items(count)}</>}
            </p>
            <p className="quiet">{t.book.doneText}</p>
            <div className="book__actions">
              <a className="btn btn--primary btn--sm" href={sentUrl} target="_blank" rel="noopener">
                <Icon name="whatsapp" />{t.book.reopen}
              </a>
              <button type="button" className="btn btn--outline btn--sm" onClick={() => setSentUrl(null)}>{t.book.edit}</button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="book__title display">{t.book.title} <span className="italic">{t.book.titleAccent}</span></h2>
            <div className="book__grid">
              <div className="field">
                <label className="field__label" htmlFor="b-date">{t.book.date}</label>
                <input className="field__input num" id="b-date" type="date" name="date" min={today} required
                  value={date} aria-invalid={!!errors.date}
                  onChange={(e) => set("date", e.target.value)} />
                {errors.date && <p className="field__error">{errors.date}</p>}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="b-time">{t.book.time}</label>
                <select className="field__input num" id="b-time" name="time" required
                  value={form.time} aria-invalid={!!errors.time}
                  onChange={(e) => set("time", e.target.value)}>
                  <option value="">{t.book.time}</option>
                  {times.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <p className="field__error">{errors.time}</p>}
              </div>
              <div className="field">
                <span className="field__label" id="b-guests-l">{t.book.guests}</span>
                <div className="stepper" role="group" aria-labelledby="b-guests-l">
                  <button type="button" aria-label={t.book.less} disabled={form.guests <= 1}
                    onClick={() => set("guests", Math.max(1, form.guests - 1))}><Icon name="minus" /></button>
                  <input type="number" name="guests" min={1} max={max} inputMode="numeric"
                    aria-label={`${t.book.guests}: ${t.book.guestsWord(form.guests)}`}
                    value={form.guests}
                    onChange={(e) => set("guests", Math.min(max, Math.max(1, +e.target.value || 1)))} />
                  <button type="button" aria-label={t.book.more} disabled={form.guests >= max}
                    onClick={() => set("guests", Math.min(max, form.guests + 1))}><Icon name="plus" /></button>
                </div>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="b-name">{t.book.name}</label>
                <input className="field__input" id="b-name" name="name" autoComplete="given-name"
                  placeholder={t.book.namePh} required value={form.name} aria-invalid={!!errors.name}
                  onChange={(e) => set("name", e.target.value)} />
                {errors.name && <p className="field__error">{errors.name}</p>}
              </div>
              <div className="field book__wide">
                <label className="field__label" htmlFor="b-phone">{t.book.phone}</label>
                <input className="field__input num" id="b-phone" name="phone" type="tel" autoComplete="tel"
                  placeholder="+7 700 000-00-00" required value={form.phone} aria-invalid={!!errors.phone}
                  onChange={(e) => set("phone", e.target.value)} />
                {errors.phone && <p className="field__error">{errors.phone}</p>}
              </div>
              <div className="field book__wide">
                <label className="field__label" htmlFor="b-comment">{t.book.wish} <span className="quiet">{t.book.optional}</span></label>
                <input className="field__input" id="b-comment" name="comment" placeholder={t.book.wishPh}
                  value={form.comment} onChange={(e) => set("comment", e.target.value)} />
              </div>
            </div>
            {count > 0 && (
              <details className="book-order">
                <summary>
                  <span className="order-mark" title={t.book.detailsMark} aria-hidden="true">!</span>
                  <span className="book-order__head">
                    <span className="book-order__title">{t.book.details}</span>
                    <span className="book-order__sum num">{t.order.items(count)} · {formatPrice(total)}</span>
                  </span>
                  <Icon name="chevron" className="book-order__chev" />
                </summary>
                <div className="book-order__body">
                  <p className="book-order__note">{t.book.detailsNote}</p>
                  <ul className="book-order__list">
                    {lines.map(({ dish, qty, sum }) => (
                      <li key={dish.id}>
                        <span><span className="num">{qty} ×</span> {tx(dish.name)}</span>
                        <span className="num">{formatPrice(sum)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="book-order__total"><span>{t.order.total}</span><b className="num">{formatPrice(total)}</b></p>
                  <Link className="book-order__edit" href="/menu">{t.book.editOrder}</Link>
                </div>
              </details>
            )}
            <div className="book__actions">
              <button className="btn btn--primary" type="submit"><Icon name="whatsapp" />{t.book.submit}</button>
              <p className="booking-note">{t.book.note}</p>
            </div>
          </>
        )}
      </form>

      {asking && (
        <ConfirmDishes items={t.order.items(count)} sum={formatPrice(total)}
          onAnswer={(yes) => { setAsking(false); if (yes !== null) send(yes); }} />
      )}

      <dl className="book__info">
        <div><dt className="label quiet">{t.book.address}</dt><dd>{t.place.address}, {t.place.city}</dd></div>
        <div><dt className="label quiet">{t.book.hours}</dt><dd>{t.place.hours}</dd></div>
        <div><dt className="label quiet">{t.book.phone}</dt><dd><a href={site.phoneHref}>{site.phone}</a></dd></div>
      </dl>
    </section>
  );
}
