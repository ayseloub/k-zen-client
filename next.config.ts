import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.kzen.biz.id',
      },
      {
        protocol: 'https',
        hostname: 'blob.kzenkarier.id',
      },
    ],
  },
};

export default nextConfig;