"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/data/site";
import { asset } from "@/lib/asset";
import { useMounted } from "@/lib/useMounted";
import { bookingMessage, guestsWord, humanDate, isoDate, plural, slotsFor, type BookingRequest } from "@/lib/booking";
import { Icon } from "./Icon";
import { useSite } from "./SiteProvider";

type Errors = Partial<Record<"name" | "phone" | "date" | "time", string>>;

const MSG = {
  name: "Впишите имя — так мы обратимся к вам, когда перезвоним",
  phone: "Нужен телефон, чтобы подтвердить стол — минимум 10 цифр",
  date: "Выберите день визита",
  time: "Выберите время — из свободных в списке",
};

/**
 * Заявка уходит в WhatsApp ресторана: форма собирает всё в одно сообщение
 * и открывает чат, гостю остаётся нажать «Отправить».
 */
export function Booking() {
  const { prefill } = useSite();
  const [form, setForm] = useState<BookingRequest>({ name: "", phone: "", date: "", time: "", guests: 2, comment: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const mounted = useMounted();
  const today = mounted ? isoDate(new Date()) : "";
  const date = form.date || today;

  // Перенос выбора из быстрой брони и со стола в зале: применяем, когда приходит новая отметка
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
    const url = whatsappLink(bookingMessage({ ...form, date, name: form.name.trim(), phone: form.phone.trim() }));
    // Ссылка вместо window.open: на телефоне откроет приложение, на компьютере — новую вкладку
    const a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    a.click();
    setSentUrl(url);
  }

  return (
    <section className="slide book grain" id="book" data-slide aria-label="Бронирование">
      <div className="slide__media"><img src={asset("/img/m-smoke.jpg")} alt="" loading="lazy" /></div>
      <div className="book__shade" aria-hidden="true" />

      <form className="book__panel glass--dark" noValidate onSubmit={submit}>
        {sentUrl ? (
          <div className="booking-done" aria-live="polite">
            <Icon name="check" className="book__check" />
            <h2 className="book__title display">Почти <span className="italic">готово</span></h2>
            <p className="num">{humanDate(date)} · {form.time} · {guestsWord(form.guests)}</p>
            <p className="quiet">В WhatsApp открылось сообщение с заявкой — нажмите «Отправить». Мы перезвоним, чтобы подтвердить стол.</p>
            <div className="book__actions">
              <a className="btn btn--primary btn--sm" href={sentUrl} target="_blank" rel="noopener">
                <Icon name="whatsapp" />Открыть WhatsApp ещё раз
              </a>
              <button type="button" className="btn btn--outline btn--sm" onClick={() => setSentUrl(null)}>Изменить заявку</button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="book__title display">Ваш <span className="italic">стол</span></h2>
            <div className="book__grid">
              <div className="field">
                <label className="field__label" htmlFor="b-date">Дата</label>
                <input className="field__input num" id="b-date" type="date" name="date" min={today} required
                  value={date} aria-invalid={!!errors.date}
                  onChange={(e) => set("date", e.target.value)} />
                {errors.date && <p className="field__error">{errors.date}</p>}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="b-time">Время</label>
                <select className="field__input num" id="b-time" name="time" required
                  value={form.time} aria-invalid={!!errors.time}
                  onChange={(e) => set("time", e.target.value)}>
                  <option value="">Время</option>
                  {times.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <p className="field__error">{errors.time}</p>}
              </div>
              <div className="field">
                <span className="field__label" id="b-guests-l">Гостей</span>
                <div className="stepper" role="group" aria-labelledby="b-guests-l">
                  <button type="button" aria-label="Меньше гостей" disabled={form.guests <= 1}
                    onClick={() => set("guests", Math.max(1, form.guests - 1))}><Icon name="minus" /></button>
                  <input type="number" name="guests" min={1} max={max} inputMode="numeric"
                    aria-label={`Число гостей: ${form.guests} ${plural(form.guests, "гость", "гостя", "гостей")}`}
                    value={form.guests}
                    onChange={(e) => set("guests", Math.min(max, Math.max(1, +e.target.value || 1)))} />
                  <button type="button" aria-label="Больше гостей" disabled={form.guests >= max}
                    onClick={() => set("guests", Math.min(max, form.guests + 1))}><Icon name="plus" /></button>
                </div>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="b-name">Имя</label>
                <input className="field__input" id="b-name" name="name" autoComplete="given-name"
                  placeholder="Как к вам обращаться" required value={form.name} aria-invalid={!!errors.name}
                  onChange={(e) => set("name", e.target.value)} />
                {errors.name && <p className="field__error">{errors.name}</p>}
              </div>
              <div className="field book__wide">
                <label className="field__label" htmlFor="b-phone">Телефон</label>
                <input className="field__input num" id="b-phone" name="phone" type="tel" autoComplete="tel"
                  placeholder="+7 700 000-00-00" required value={form.phone} aria-invalid={!!errors.phone}
                  onChange={(e) => set("phone", e.target.value)} />
                {errors.phone && <p className="field__error">{errors.phone}</p>}
              </div>
              <div className="field book__wide">
                <label className="field__label" htmlFor="b-comment">Пожелание <span className="quiet">— необязательно</span></label>
                <input className="field__input" id="b-comment" name="comment" placeholder="Повод, стол у окна, детский стул"
                  value={form.comment} onChange={(e) => set("comment", e.target.value)} />
              </div>
            </div>
            <div className="book__actions">
              <button className="btn btn--primary" type="submit"><Icon name="whatsapp" />Отправить в WhatsApp</button>
              <p className="booking-note">Заявка придёт ресторану в WhatsApp, мы перезвоним.</p>
            </div>
          </>
        )}
      </form>

      <dl className="book__info">
        <div><dt className="label quiet">Адрес</dt><dd>{site.address}, {site.city}</dd></div>
        <div><dt className="label quiet">Часы</dt><dd>{site.hours}</dd></div>
        <div><dt className="label quiet">Телефон</dt><dd><a href={site.phoneHref}>{site.phone}</a></dd></div>
      </dl>
    </section>
  );
}
