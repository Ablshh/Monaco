// Иконки одной толщины линии, авторские SVG
const paths = {
  arrow: <path d="M2 12h36M31 5l7 7-7 7" />,
  "arrow-short": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: <path d="M4 9h16M4 15h16" />,
  whatsapp: (
    <>
      <path d="M4 20l1.3-3.9A8.5 8.5 0 1 1 8 18.8L4 20z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9a5 5 0 0 1-2.3-2.3l.9-1-1-2L9.5 8z" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12H6L5 8z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </>
  ),
  book: <path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5zM12 6.5v13" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={`icon icon--${name}${className ? " " + className : ""}`}
      viewBox={name === "arrow" ? "0 0 40 24" : "0 0 24 24"}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
