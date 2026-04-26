/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/favicon.ico",
                destination: "/logos/favicon-white.svg",
                permanent: false,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cms.assemblyofthepoor.org",
                port: "",
                pathname: "/wp-content/uploads/**",
            },
        ],
    },
};

export default nextConfig;

