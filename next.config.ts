import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging-api.cititasker.africa",
      },
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
