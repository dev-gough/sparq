import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // optimizeCss/critters removed: ineffective for App Router streaming
    cssChunking: 'strict',
    // Soft route navigations via browser View Transitions + React <ViewTransition>
    // (experimental; falls back to instant swap where unsupported)
    viewTransition: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error']
    } : false,
  },
  images: {
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
