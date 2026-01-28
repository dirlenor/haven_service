/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/allservices",
        destination: "/services",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
