/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    swcLoader: true,
    swcMinify: true,
  },
};

export default nextConfig;
