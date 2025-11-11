/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: '*.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: '*.s3.*.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: '*.digitaloceanspaces.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    }
};

export default nextConfig;