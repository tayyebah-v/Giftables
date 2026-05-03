import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Allow phone / LAN dev URLs to load `/_next/*` without cross-origin warnings. */
  allowedDevOrigins: [
    "127.0.0.1",
    "172.20.10.3",
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.20.*.*",
    "172.31.*.*",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
