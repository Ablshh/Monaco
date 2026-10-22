import type { NextConfig } from "next";

// GitHub Pages отдаёт сайт из подпапки (/имя-репозитория), её передаёт сборка в Actions.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  // Открывать dev-сервер с телефона или другого компьютера в локальной сети
  allowedDevOrigins: ["192.168.0.27", "26.190.50.236"],
};

export default nextConfig;
