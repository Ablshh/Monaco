// Статичные экраны главной: витрина меню, банкеты, бар
import Link from "next/link";
import { Fragment } from "react";
import { banquet, categories, formatPrice } from "@/data/menu";
import { whatsappLink } from "@/data/site";
import { asset } from "@/lib/asset";
import { plural } from "@/lib/booking";
import { Icon } from "./Icon";

/** Блюда с пометкой «Шеф» и «Хит»: сначала по одному из раздела, потом добираем до четырёх */
function chefPicks() {
  const picks = categories.flatMap((c) =>
    c.dishes
      .filter((d) => (d.tag === "Шеф" || d.tag === "Хит") && d.available !== false)
      .map((d) => ({ cat: c.title, dish: d })),
  );
  const seen = new Set<string>();
  const first = picks.filter((p) => !seen.has(p.cat) && seen.add(p.cat));
  const rest = picks.filter((p) => !first.includes(p));
  return [...first, ...rest].slice(0, 4);
}

const Ornament = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 1c.7 4.6 2.6 7.6 6 9.5-3.4 1.9-5.3 4.9-6 9.5-.7-4.6-2.6-7.6-6-9.5 3.4-1.9 5.3-4.9 6-9.5z" />
  </svg>
);

export function MenuShowcase() {
  const total = categories.reduce((n, c) => n + c.dishes.length, 0);
  const marquee = [0, 1, 2, 3].flatMap((k) =>
    categories.map((c) => <Fragment key={k + c.id}><span>{c.title}</span><Ornament /></Fragment>),
  );
  return (
    <section className="slide menu" id="menu" data-slide aria-label="Меню">
      <div className="menu__bg" aria-hidden="true"><img src={asset("/img/m-plate.jpg")} alt="" loading="lazy" /></div>
      <p className="label menu__kicker">Выбор шефа</p>
      <h2 className="menu__title display">Меню <span className="italic">Monaco</span></h2>
      <div className="menu__cols">
        {chefPicks().map(({ cat, dish }) => (
          <article className="menu__col" key={dish.name}>
            <span className="label">{cat}</span>
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <span className="price num">{formatPrice(dish.price)}</span>
          </article>
        ))}
      </div>
      <div className="menu__actions">
        <Link className="btn btn--primary" href="/menu"><Icon name="book" />Открыть всё меню</Link>
        <span className="quiet menu__count">
          {categories.length} разделов · {total} {plural(total, "позиция", "позиции", "позиций")}
        </span>
      </div>
      <div className="marquee" aria-hidden="true"><div className="marquee__track">{marquee}</div></div>
    </section>
  );
}

export function Events() {
  const cheapest = Math.min(...banquet.sets.map((s) => s.price));
  return (
    <section className="slide events grain" id="events" data-slide aria-label="Банкеты и посиделки">
      <div className="slide__media">
        <img src={asset("/img/m-table.jpg")} alt="Стол сверху: стейки, салаты, вино, гости поднимают бокалы" loading="lazy" />
      </div>
      <div className="events__shade" aria-hidden="true" />

      <div className="events__head">
        <p className="label quiet">Банкеты и посиделки</p>
        <h2 className="events__title display">Праздник <span className="italic">на весь стол</span></h2>
      </div>
      <p className="events__big display num" aria-hidden="true">{banquet.maxGuests}</p>

      <ul className="events__list">
        <li>
          <span className="events__num label num">6–15 гостей</span>
          <h3>Посиделки</h3>
          <p>Общий стол, бешбармак на&nbsp;табаке, чай без счёта.</p>
        </li>
        <li>
          <span className="events__num label num">до 25 гостей</span>
          <h3>Дни рождения</h3>
          <p>Торт под ваше событие, оформление зала, своя музыка.</p>
        </li>
        <li>
          <span className="events__num label num">до {banquet.maxGuests} гостей</span>
          <h3>Банкеты и тои</h3>
          <p>Сеты от&nbsp;{formatPrice(cheapest)} за&nbsp;гостя, ведущий по&nbsp;договорённости.</p>
        </li>
      </ul>

      <div className="events__actions">
        <a className="btn btn--primary" target="_blank" rel="noopener"
          href={whatsappLink("Здравствуйте! Хотим банкет в Monaco. Дата: , гостей: .")}>
          <Icon name="whatsapp" />Обсудить банкет
        </a>
        <Link className="btn btn--glass" href="/menu#banquet">Банкетное меню <Icon name="arrow-short" /></Link>
      </div>
    </section>
  );
}

export function Wine() {
  return (
    <section className="slide wine grain" id="wine" data-slide aria-label="Бар">
      <div className="slide__media wine__media">
        <img src={asset("/img/m-wine.jpg")} alt="Красное вино льётся в бокал на чёрном фоне" loading="lazy" />
      </div>
      <div className="wine__shade" aria-hidden="true" />
      <h2 className="wine__title">
        <span className="display">Vino</span>
        <span className="italic">&amp; bar</span>
      </h2>
      <p className="wine__text">Винная карта, коктейли, авторские лимонады и чай в чайнике — к каждому блюду.</p>
    </section>
  );
}
