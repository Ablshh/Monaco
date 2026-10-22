import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  allowedDevOrigins: process.env.DEV_ORIGINS?.split(",") ?? [],
};

export default nextConfig;
