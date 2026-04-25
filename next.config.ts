import type { NextConfig } from "next";
const { i18n } = require("./next-i18next.config");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_API_GRAPHQL_URL: process.env.REACT_APP_API_GRAPHQL_URL,
    REACT_APP_API_WS: process.env.REACT_APP_API_WS,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "165.22.242.234",
        port: "4001",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3007",
        pathname: "/uploads/**",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
