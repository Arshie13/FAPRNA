import type { NextConfig } from "next";
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) config.plugins = [...config.plugins, new PrismaPlugin()]
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev"
      }
    ],
  },
};

export default nextConfig;
