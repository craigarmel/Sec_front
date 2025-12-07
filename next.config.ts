import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Image configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.codeur.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      // Allow common image hosting domains
      {
        protocol: 'https',
        hostname: '**.codeur.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    // Fallback for unoptimized images if needed
    unoptimized: false,
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
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
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // 'unsafe-eval' needed for Next.js in dev
              "style-src 'self' 'unsafe-inline'", // 'unsafe-inline' needed for Tailwind
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              // Allow connections to localhost in development, 'self' in production
              process.env.NODE_ENV === 'production'
                ? "connect-src 'self'"
                : "connect-src 'self' http://localhost:* ws://localhost:* wss://localhost:*",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  // Disable debug in production
  reactStrictMode: true,
  // Production optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
