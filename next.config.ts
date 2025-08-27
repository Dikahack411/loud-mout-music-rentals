import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep minimal valid config; App Router and src/ are detected automatically
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
