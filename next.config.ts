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
    // Route /api-proxy to Cloudflare Tunnel
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return [];
    }
    return [
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