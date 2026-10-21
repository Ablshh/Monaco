import type { NextConfig } from "next";

// GitHub Pages отдаёт сайт из подпапки (/имя-репозитория), её передаёт сборка в Actions.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
