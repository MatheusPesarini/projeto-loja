import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import { AuthProvider } from '@/context/AuthContext';
import { isAuthenticated } from '@/lib/session/dal';
import Navbar from '@/components/header/header';

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
					<Navbar isAuthenticated={auth} />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
