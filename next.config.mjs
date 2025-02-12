/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // habilitar minificação SWC
  experimental: {
    swcLoader: true, // usar SWC como loader
    swcMinify: true, // usar SWC para minificação
  },
};

export default nextConfig;
