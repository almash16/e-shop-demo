import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Development platform setup for Cloudflare
if (process.env.NODE_ENV === 'development') {
  setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['fakestoreapi.com'],
        unoptimized: true, // Required for Cloudflare Pages
      },
}

export default nextConfig;
