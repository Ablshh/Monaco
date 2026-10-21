"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { Icon } from "./Icon";
import { useSite } from "./SiteProvider";

// Точки на фото зала: координаты в долях исходного изображения
const IMG = { w: 1361, h: 1256 };
const TABLES = [
  { name: "Длинный стол", note: "Для компании от шести", x: 0.84, y: 0.7 },
  { name: "У стены", note: "Тихо, на двоих", x: 0.305, y: 0.72 },
  { name: "Под лампой", note: "В центре зала, для четверых", x: 0.705, y: 0.64 },
];
const CARD_W = 260;

export function Hall() {
  const { goBook } = useSite();
  const hostRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{ width: number; points: { x: number; y: number }[] }>({ width: 0, points: [] });
  const [active, setActive] = useState<number | null>(null);

  // Пересчёт координат фото в координаты экрана при object-fit: cover
  const place = useCallback(() => {
    const host = hostRef.current;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const s = Math.max(r.width / IMG.w, r.height / IMG.h);
    const dw = IMG.w * s, dh = IMG.h * s;
    setLayout({
      width: r.width,
      points: TABLES.map((t) => ({ x: (r.width - dw) / 2 + t.x * dw, y: (r.height - dh) / 2 + t.y * dh })),
    });
  }, []);
  useEffect(() => {
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  const { width, points } = layout;
  const p = active !== null ? points[active] : null;
  const cardStyle = p
    ? { left: p.x + 28 + CARD_W > width - 80 ? p.x - 28 - CARD_W : p.x + 28, top: Math.max(110, p.y - 60) }
    : undefined;

  return (
    <section className="slide hall grain" id="hall" data-slide aria-label="Зал">
      <div className="slide__media" ref={hostRef}>
        <img src={asset("/img/photo-interior.jpg")} alt="Тёплый зал с низкими лампами и длинными столами" loading="lazy" />
      </div>
      <div className="hall__shade" aria-hidden="true" />
      <h2 className="hall__title display">Выберите <span className="italic">стол</span></h2>

      {points.map((pt, i) => (
        <button
          key={TABLES[i].name} className="spot" type="button"
          style={{ left: pt.x, top: pt.y }}
          aria-label={`${TABLES[i].name} — ${TABLES[i].note.toLowerCase()}`}
          aria-pressed={active === i}
          onClick={() => setActive(i)}
        >
          <span className="spot__dot" aria-hidden="true" />
        </button>
      ))}

      {active !== null && (
        <div className="hall__card glass" key={active} style={cardStyle}>
          <p className="hall__card-name display">{TABLES[active].name}</p>
          <p className="quiet">{TABLES[active].note}</p>
          <a className="btn btn--primary btn--sm" href="#book"
            onClick={(e) => { e.preventDefault(); goBook({ comment: `Пожелание по столу: ${TABLES[active].name}` }); }}>
            Хочу этот стол <Icon name="arrow-short" />
          </a>
        </div>
      )}
      <p className="hall__hint label">Нажмите на точку</p>
      <div className="hall__chips" role="group" aria-label="Стол">
        {TABLES.map((t, i) => (
          <button key={t.name} type="button" className="pill" aria-pressed={active === i} onClick={() => setActive(i)}>
            {t.name}
          </button>
        ))}
      </div>
    </section>
  );
}
