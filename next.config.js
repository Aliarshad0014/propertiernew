/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows any domain with the https protocol
      },
      {
        protocol: "http",
        hostname: "**", // This allows any domain with the http protocol
      },
    ],
  },
};

module.exports = nextConfig;
