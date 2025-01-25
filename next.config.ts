import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pixabay.com', 'images.unsplash.com'], // Add cdn.pixabay.com here
  },
};

export default nextConfig;
