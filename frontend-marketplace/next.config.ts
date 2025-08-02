import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatar.vercel.sh',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '4000',
				pathname: '/images/**',
			},
			{
				protocol: 'http',
				hostname: 'image-api',
				port: '4000',
				pathname: '/images/**',
			}
		],
	},
};

export default nextConfig;
