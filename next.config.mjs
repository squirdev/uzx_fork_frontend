/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        // domains: ["23.227.193.122"],
        remotePatterns: [{
                protocol: "https",
                hostname: "coin-images.coingecko.com",
            },
            {
                protocol: "https",
                hostname: "cdn.example.com",
            },
            {
                protocol: "https",
                hostname: "uzxkr.com",
            },
        ],
    },
    i18n: {
        locales: ['en', 'ch', 'zh', 'de', 'jp', 'sp', 'tr'], // Add your supported locales
        defaultLocale: 'en', // Set the default locale
        localeDetection: false,
    },
    reactStrictMode: false
};

export default nextConfig;