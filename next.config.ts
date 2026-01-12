import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase to 10 MB or whatever you need
    },
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/thumbnails/**',
      },
      {
        protocol: 'https',
        hostname: '*.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bgtkntt.kemendikdasmen.go.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
    // Alternative: Allow all domains (less secure but more flexible)
    // dangerouslyAllowSVG: true,
    // unoptimized: false,
  },
  productionBrowserSourceMaps: false,
  
};

export default nextConfig;