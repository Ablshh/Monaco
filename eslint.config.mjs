import next from "eslint-config-next";

const config = [
  ...next,
  { ignores: [".next/**", "out/**"] },
  // Сайт выгружается статикой (output: "export"), оптимизатора next/image там нет — обычный <img> честнее
  { rules: { "@next/next/no-img-element": "off" } },
];

export default config;
