import type { NextConfig } from 'next';
import type { NextConfigComplete } from 'next/dist/server/config-shared';

const nextConfig: NextConfig | NextConfigComplete = {
  output: 'standalone',
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['videos.nibl.ink'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'videos.nibl.ink',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  experimental: {
    optimizeCss: true,
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // config.module.rules.push({
    //   test: /\.(mp4|webm|ogg|swf|ogv)$/,
    //   use: {
    //     loader: require.resolve('file-loader'),
    //     options: {
    //       publicPath: '/_next/static/videos/',
    //       outputPath: 'static/videos/',
    //     },
    //   },
    // });

    return config;
  },

  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    R2_PUBLIC_DOMAIN: process.env.R2_PUBLIC_DOMAIN,
  },
};

export default nextConfig;
