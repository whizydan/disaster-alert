/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allows production builds to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
