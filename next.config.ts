import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Modern formats — AVIF first, then WebP fallback
    formats: ['image/avif', 'image/webp'],

    // Match real device widths used in your Swiper (clamp 170px → 230px)
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 170, 200, 230, 256],

    // Cache optimized images for 30 days (default is 60s — way too short)
    minimumCacheTTL: 60 * 60 * 24 * 30,

    // Limit concurrent image optimization (prevents server overload on 3G burst)
    dangerouslyAllowSVG: false,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.gtbg.uicore.pro',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Compress all responses (HTML, JS, CSS)
  compress: true,

  output: 'standalone',
  transpilePackages: ['motion','@reduxjs/toolkit', 'redux', 'react-redux'],

  // Cache headers for static assets — 1 year immutable
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache your local webp mockups aggressively
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/Mobile-App-Hero-BG.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }

    // Tree-shake Swiper — only import what you use
    config.resolve.alias = {
      ...config.resolve.alias,
      'swiper/react': 'swiper/react',
    };

    return config;
  },
};

export default nextConfig;