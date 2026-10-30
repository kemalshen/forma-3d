import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // www.forma-3d.uz → основной домен одним 301 (корень — сразу на /ru, как и основной домен).
  async redirects() {
    const www = [{type: "host" as const, value: "www.forma-3d.uz"}];
    return [
      {source: "/", has: www, destination: "https://forma-3d.uz/ru", statusCode: 301},
      {source: "/:path+", has: www, destination: "https://forma-3d.uz/:path+", statusCode: 301},
    ];
  },
};

export default nextConfig;
