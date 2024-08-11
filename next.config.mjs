/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"] // <-- and this
    },
    images: {
        domains:["cdn.dummyjson.com"]
    },
};

export default nextConfig;
