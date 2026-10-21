import type { Metadata } from "next";
import Link from "next/link";
import { CarteNav } from "@/components/CarteNav";
import { Icon } from "@/components/Icon";
import { banquet, categories, formatPrice, type Dish } from "@/data/menu";
import { ORDER_TEXT, site, whatsappLink } from "@/data/site";
import { asset } from "@/lib/asset";
import { plural } from "@/lib/booking";
import "@/styles/menu.css";

export const metadata: Metadata = {
  title: "Меню — Monaco, Кызылорда",
  description: "Меню ресторана Monaco: закуски, салаты, стейки, национальная кухня, коктейли, десерты и банкетные сеты.",
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function DishRow({ d }: { d: Dish }) {
  const off = d.available === false;
  return (
    <li className={`dish${off ? " dish--off" : ""}`}>
      <div className="dish__row">
        <h3 className="dish__name">{d.name}</h3>
        {off ? <span className="dish__off">Временно нет</span>
          : d.tag && <span className={`dish__tag${d.tag === "Остро" ? " dish__tag--hot" : ""}`}>{d.tag}</span>}
        <span className="dish__lead" aria-hidden="true" />
        <span className="dish__price num">
          {off && <span className="sr-only">Временно нет в наличии. Цена: </span>}
          {formatPrice(d.price)}
        </span>
      </div>
      {(d.description || d.weight) && (
        <p className="dish__meta">
          {d.description && <span>{d.description}</span>}
          {d.weight && <span className="dish__w">{d.weight}</span>}
        </p>
      )}
    </li>
  );
}

export default function MenuPage() {
  const banquetText = "Здравствуйте! Хотим банкет в Monaco. Дата: , гостей: , сет: .";
  return (
    <div className="carte">
      <a className="skip-link" href="#carte">К блюдам</a>

      <header className="carte-top">
        <Link className="carte-top__back" href="/"><Icon name="arrow-left" /><span>На сайт</span></Link>
        <Link className="carte-top__logo" href="/" aria-label="Monaco — на главную">
          <img src={asset("/monaco-logo-dark.svg")} alt="" width={30} height={35} className="carte-top__mark" />
          <span>{site.name}</span>
        </Link>
        <Link className="carte-top__book" href="/#book">Забронировать</Link>
      </header>

      <section className="carte-cover">
        <img className="carte-cover__mark" src={asset("/monaco-logo-dark.svg")} alt="" width={120} height={140} />
        <h1 className="carte-cover__title display">Меню</h1>
        <p className="carte-cover__sub italic">{site.name} · {site.city}</p>
        <p className="carte-cover__note">Вес указан для готового блюда. Цены в тенге.</p>
      </section>

      <CarteNav items={[...categories.map((c) => ({ id: c.id, title: c.title })), { id: "banquet", title: "Банкеты" }]} />

      <main id="carte" className="carte-body">
        {categories.map((c, i) => (
          <section className="course" id={c.id} key={c.id} aria-labelledby={`h-${c.id}`}>
            <header className="course__head">
              <span className="course__num">{ROMAN[i]}</span>
              <h2 className="course__title" id={`h-${c.id}`}>{c.title}</h2>
              <span className="course__count">{c.dishes.length} {plural(c.dishes.length, "позиция", "позиции", "позиций")}</span>
            </header>
            <ul className="dishes">{c.dishes.map((d) => <DishRow key={d.name} d={d} />)}</ul>
          </section>
        ))}
      </main>

      <section className="banquet" id="banquet" aria-labelledby="banquet-title">
        <header className="banquet__head">
          <p className="label">Для компаний от {banquet.minGuests} до {banquet.maxGuests} гостей</p>
          <h2 className="banquet__title display" id="banquet-title">Банкетное <span className="italic">меню</span></h2>
        </header>
        <div className="banquet__sets">
          {banquet.sets.map((s) => (
            <article className="set" key={s.name}>
              {"tag" in s && s.tag && <span className="set__tag">{s.tag}</span>}
              <h3 className="set__name">{s.name}</h3>
              <p className="set__price num">{formatPrice(s.price)}<small>{s.per}</small></p>
              <ul>{s.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </article>
          ))}
        </div>
        <a className="btn banquet__cta" href={whatsappLink(banquetText)} target="_blank" rel="noopener">
          <Icon name="whatsapp" />Обсудить банкет в WhatsApp
        </a>
      </section>

      <footer className="carte-foot">
        <p>{site.address} · {site.hours} · <a href={site.phoneHref}>{site.phone}</a></p>
        <p className="carte-foot__demo">Прототип: блюда и цены условные, сверить с рестораном перед публикацией.</p>
      </footer>

      <div className="carte-dock" role="group" aria-label="Заказ и бронь">
        <a className="carte-dock__order" href={whatsappLink(ORDER_TEXT)} target="_blank" rel="noopener"><Icon name="bag" />Заказать</a>
        <Link className="carte-dock__book" href="/#book">Забронировать стол</Link>
      </div>
    </div>
  );
}
