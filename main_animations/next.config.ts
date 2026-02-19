import type { NextConfig } from "next";
import path from "node:path";

// Loader path from orchids-visual-edits - use direct resolve to get the actual file
const loaderPath = require.resolve('orchids-visual-edits/loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Set the root to the project root to avoid Turbopack picking up lockfiles from home directory
  // experimental: {
  //   turbopack: {
  //     root: path.resolve(__dirname, '../'),
  //   }
  // }
};

export default nextConfig;
