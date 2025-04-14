import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import { AuthProvider } from '@/context/AuthContext';
import { isAuthenticated } from '@/lib/session/dal';

export const metadata: Metadata = {
	title: 'Micro SaaS',
	description: 'Created by Matheus Pesarini',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth = await isAuthenticated();

	return (
		<html lang="pt-BR">
			<body className={'antialiased'}>
				<AuthProvider>
					<Header isAuthenticated={auth} />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
