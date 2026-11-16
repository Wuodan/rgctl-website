import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // localhost is allowed by default. 127.0.0.1 is not, and a blocked dev
  // websocket leaves the page as static HTML: clicks never hydrate.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
