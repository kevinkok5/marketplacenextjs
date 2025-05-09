/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["mdx", "tsx", "ts"],

    eslint: {
        ignoreDuringBuilds: true,
    },
    // experimental: {
    //     missingSuspenseWithCSRBailout: false,
    // },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "i.pinimg.com",
                pathname: "**",
            },
            {
                protocol: "http", // ⚠️ Si ton backend est en local, il est probablement en HTTP et non HTTPS
                hostname: "127.0.0.1",
                // port: "8000",
                pathname: "**",
            },
            {
                protocol: "http", // ⚠️ Si ton backend est en local, il est probablement en HTTP et non HTTPS
                hostname: "192.168.0.143",
                // port: "8000",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "github.com",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
