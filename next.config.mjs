/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow any local image source, including ones carrying a query string
    // (e.g. cache-busting "?v=2"). Omitting `search` permits any query so a
    // stray query string can never throw at render.
    localPatterns: [{ pathname: '/**' }],
  },
};

export default nextConfig;
