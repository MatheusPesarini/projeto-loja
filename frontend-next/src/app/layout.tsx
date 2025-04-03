import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "Micro SaaS",
	description: "Created by Matheus Pesarini",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={"antialiased"}>
				<Header />
				{children}
			</body>
		</html>
	);
}
