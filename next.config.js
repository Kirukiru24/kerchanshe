/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/admin/login",
        destination: "/login",
      },
    ];
  },
};

module.exports = nextConfig;