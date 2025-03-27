/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        // domains: ["23.227.193.122"],
        remotePatterns: [{
                protocol: "http",
                hostname: "23.227.193.122",
            },
            {
                protocol: "https",
                hostname: "cdn.example.com",
            },
        ],
    },
    i18n: {
        locales: ['en', 'ch'], // Add your supported locales
        defaultLocale: 'en', // Set the default locale
    },
    reactStrictMode: false
};

export default nextConfig;