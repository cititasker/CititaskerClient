import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cititasker.africa",
        // pathname: "cititasker.africa",
        // search: "",
      },
    ],
  },
};

export default nextConfig;
