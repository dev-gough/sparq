import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is the default bundler for `next dev` and `next build` in Next 16.
  // Optional FS cache speeds cold restarts in development.
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error']
    } : false,
  },
  images: {
    // Next 16 defaults: qualities [75], minimumCacheTTL 4h — fine for marketing assets
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/news-and-events',
        destination: '/investors/reports',
        permanent: true,
      },
      {
        source: '/our-products',
        destination: '/products',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
