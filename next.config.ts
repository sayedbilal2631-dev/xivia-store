/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com", // external image host
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com", // example of another allowed host
      },
    ],
  },
};

module.exports = nextConfig;
