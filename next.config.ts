import type { NextConfig } from "next";

// Старый URL товара → действующий товар.
const REMOVED_PRODUCTS: Record<string, string> = {
  "hotend-h2d": "hotend-h2-04-hardened",
  "hotend-h2c": "hotend-h2-04-hardened",
  "hotend-p2s": "hotend-h2-04-hardened",
  "paht-cf-request-spool": "paht-cf-black-spool",
};

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // www.forma-3d.uz → основной домен одним 301 (корень — сразу на /ru, как и основной домен).
  async redirects() {
    const www = [{type: "host" as const, value: "www.forma-3d.uz"}];
    return [
      {source: "/", has: www, destination: "https://forma-3d.uz/ru", statusCode: 301},
      {source: "/:path+", has: www, destination: "https://forma-3d.uz/:path+", statusCode: 301},
      // Удалённые товары → их замены (аудит 2026-10-30, removed-products-404-001).
      ...Object.entries(REMOVED_PRODUCTS).map(([from, to]) => ({source: `/:lang(ru|uz)/product/${from}`, destination: `/:lang/product/${to}`, statusCode: 301 as const})),
    ];
  },
};

export default nextConfig;
