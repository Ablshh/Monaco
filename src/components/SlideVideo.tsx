"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

type Props = {
  src: string;
  poster: string;
  className?: string;
  eager?: boolean;
};

export function SlideVideo({ src, poster, className, eager = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); return; }
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
