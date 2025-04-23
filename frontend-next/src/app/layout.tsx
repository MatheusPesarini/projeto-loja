import type { Metadata } from 'next';
import './globals.css';
import { isAuthenticated } from '@/lib/session/dal';
import Navbar from '@/components/header/header';
import { Footer } from '@/components/footer/footer';
import { ThemeProvider } from "next-themes"
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: 'PatoLoja',
	description: 'Sua loja online',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth = await isAuthenticated();

	return (
		<html lang="pt-br" suppressHydrationWarning>
			<body className={`${inter.className} flex flex-col min-h-screen`}>
				<AuthProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar isAuthenticated={auth} />

						<main className="flex-grow">{children}</main>

						<Footer />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
