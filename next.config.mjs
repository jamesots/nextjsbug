import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  poweredByHeader: false,
  experimental: {
    turbopackServerFastRefresh: false,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Powered-By', value: 'Next.js, Payload' },
        { key: 'Accept-CH', value: 'Sec-CH-Prefers-Color-Scheme' },
        { key: 'Vary', value: 'Sec-CH-Prefers-Color-Scheme' },
        { key: 'Critical-CH', value: 'Sec-CH-Prefers-Color-Scheme' },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
