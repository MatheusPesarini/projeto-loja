import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* outras opções de config podem estar aqui */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatar.vercel.sh',
				port: '', // Deixe vazio para porta padrão (443 para https)
				pathname: '/**', // Permite qualquer caminho dentro deste hostname
			},
			// Adicione outros hostnames permitidos aqui, se necessário
		],
	},
};

export default nextConfig;
