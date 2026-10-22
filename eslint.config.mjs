import next from "eslint-config-next";

const config = [
  ...next,
  { ignores: [".next/**", "out/**"] },
  { rules: { "@next/next/no-img-element": "off" } },
];

export default config;
