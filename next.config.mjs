/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {hostname: 'm.media-amazon.com', pathname: '/images/**'},
          {hostname: 'www.amazon.in', pathname: '/images/**'},
        ],
    },
};

export default nextConfig;
