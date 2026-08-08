import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3013",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // The API this project talks to runs on localhost in development.
    // Next.js blocks the image optimizer from fetching private/loopback
    // IPs by default (SSRF protection); this is safe to relax only in dev.
    dangerouslyAllowLocalIP: isDev,
  },
};

export default nextConfig;
