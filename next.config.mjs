/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["mdx", "tsx", "ts"],

    images: {
        domains: ["images.unsplash.com", "i.pinimg.com", "127.0.0.1"],
    },
};

export default nextConfig;
