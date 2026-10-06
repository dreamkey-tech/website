import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.0.190',
    '192.168.0.190:3000',
    '192.168.',
    '192.168.:',
    '10.',
    '10.:',
    '172.16.',
    '172.16.:',
    'localhost',
    'localhost:3000',
  ],
  async rewrites() {
    const apiUrl = process.env.API_URL;
    return [
      // 1. Forward /api/auth/* requests directly to backend /api/auth/* (preserving /api)
      {
        source: '/api/auth/:path*',
        destination: `${apiUrl}/api/auth/:path*`,
      },
      // 2. Generic API routes (/api/v1/... -> backend /v1/...)
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
      // 3. Preserve api-proxy for backward compatibility with existing client
      {
        source: '/api-proxy/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "contribution.usercontent.google.com",
      },
    ],
  },
}

export default nextConfig