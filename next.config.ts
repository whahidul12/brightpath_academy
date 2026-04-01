import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        // Optional: add port and pathname if you want to be stricter
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
