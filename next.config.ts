import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging-api.cititasker.africa",
        // pathname: "cititasker.africa",
        // search: "",
      },
    ],
  },
};

export default nextConfig;
