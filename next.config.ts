import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/services/ai-ml-strategy",
        destination: "/ai-agents",
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
