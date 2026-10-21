"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const TABS = [
  { tab: "Стейки", title: "Steaks", img: "/img/m-steak.jpg",
    text: "Рибай, стриплойн, филе-миньон. Мраморная говядина и нож, который режет без усилия." },
  { tab: "Гриль", title: "Grill", img: "/img/m-grill.jpg",
    text: "Открытый огонь и корочка. Каре ягнёнка, сибас, шашлык из баранины." },
  { tab: "Подача", title: "Serving", img: "/img/m-plate.jpg",
    text: "Горячее выходит на раскалённом чугуне — с овощами, соусом и веточкой розмарина." },
  { tab: "Дастархан", title: "Dastarkhan", img: "/img/m-table.jpg",
    text: "Бешбармак на табаке, казы-карта, сорпа. Большой стол, за которым хватит места всем." },
];

export function Kitchen() {
  const [sel, setSel] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = useState({ x: 0, w: 0 });

  // Светлая подложка едет под выбранную вкладку
  useLayoutEffect(() => {
    const place = () => {
      const b = tabsRef.current[sel];
      if (b) setThumb({ x: b.offsetLeft, w: b.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [sel]);
  useEffect(() => {
    document.fonts?.ready.then(() => {
      const b = tabsRef.current[0];
      if (b) setThumb((t) => (t.w ? t : { x: b.offsetLeft, w: b.offsetWidth }));
    });
  }, []);

  const select = (i: number, focus = false) => {
    setSel(i);
    if (focus) tabsRef.current[i]?.focus();
  };
  const t = TABS[sel];

  return (
    <section className="slide kitchen grain" id="kitchen" data-slide aria-label="Кухня">
      <div className="kitchen__stack" aria-hidden="true">
        {TABS.map((x, i) => (
          <img key={x.img} src={asset(x.img)} alt="" loading="lazy" className={i === sel ? "is-on" : undefined} />
        ))}
      </div>
      <div className="kitchen__shade" aria-hidden="true" />

      <div className="tabs glass" role="tablist" aria-label="Кухня">
        <span className="tabs__thumb" aria-hidden="true"
          style={{ width: thumb.w, transform: `translateX(${thumb.x}px)` }} />
        {TABS.map((x, i) => (
          <button
            key={x.tab} ref={(el) => { tabsRef.current[i] = el; }}
            role="tab" aria-selected={i === sel} aria-controls="k-panel" tabIndex={i === sel ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") select((i + 1) % TABS.length, true);
              if (e.key === "ArrowLeft") select((i - 1 + TABS.length) % TABS.length, true);
            }}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <div className="kitchen__panel" id="k-panel" role="tabpanel" aria-live="polite">
        <h2 key={"t" + sel} className="kitchen__title display kitchen__swap">{t.title}</h2>
        <div key={"x" + sel} className="kitchen__text kitchen__swap">
          <span className="label num quiet">0{sel + 1} / 0{TABS.length}</span>
          <p>{t.text}</p>
        </div>
      </div>
    </section>
  );
}
