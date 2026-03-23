import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  reactCompiler: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/services/ai-ml-strategy",
        destination: "/data-agents",
        permanent: true,
      },
      {
        source: "/services/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
