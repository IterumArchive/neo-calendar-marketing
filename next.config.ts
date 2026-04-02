import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile workspace packages
  transpilePackages: ["@iterumarchive/neo-calendar-full"],
};

export default nextConfig;
