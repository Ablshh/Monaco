"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

type Props = {
  src: string;
  poster: string;
  className?: string;
  /** Первый экран: грузить сразу. Остальные начинают грузиться, когда экран подъезжает к виду */
  eager?: boolean;
};

/** Фоновое видео экрана. Играет, только пока экран на виду; при «меньше движения» остаётся постер.
 *  Пока видео не пошло, само оно прозрачное, а видна картинка: так браузер телефона не показывает свою кнопку «play» */
export function SlideVideo({ src, poster, className, eager = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); return; }
    // React не пишет атрибут muted в разметку, а без него Safari на телефоне блокирует автозапуск
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    const onPlaying = () => setPlaying(true);
    v.addEventListener("playing", onPlaying);
    if (!v.paused && v.readyState > 2) setPlaying(true);
    let visible = false;
    const play = () => { v.play().catch(() => {}); };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) play(); else v.pause();
    }, { threshold: 0.05, rootMargin: eager ? "0px" : "50% 0px" });
    io.observe(v);
    if (eager) play();
    // Если браузер всё же не дал запустить (например, режим энергосбережения) — пробуем с первым касанием
    const retry = () => { if (visible && v.paused) play(); };
    const events = ["touchend", "pointerup", "click", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, retry, { passive: true }));
    return () => {
      io.disconnect();
      v.removeEventListener("playing", onPlaying);
      events.forEach((e) => window.removeEventListener(e, retry));
    };
  }, [eager]);
  return (
    <>
      <video
        ref={ref} className={`slide-video${playing ? " is-playing" : ""}${className ? " " + className : ""}`}
        autoPlay={eager} muted loop playsInline preload={eager ? "auto" : "none"} aria-hidden="true"
      >
        <source src={asset(src)} type="video/mp4" />
      </video>
      <img className={`slide-poster${className ? " " + className : ""}`} src={asset(poster)} alt=""
        aria-hidden="true" decoding="async" fetchPriority={eager ? "high" : undefined} />
    </>
  );
}
