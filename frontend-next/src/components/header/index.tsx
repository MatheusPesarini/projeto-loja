import { isAuthenticated } from '@/lib/cookie/dal';
import Link from 'next/link';
import LogoutButton from '../logoutButton/page';

export default async function Header() {
	const session = await isAuthenticated();
	const boolSessionAuth = session;

	return (
		<header className="flex py-2 px-4 bg-gray-800 text-white">
			<div className="flex items-center justify-between w-full max-w-7xl mx-auto">
				<h1>Teste</h1>
				<nav>
					<ul className="flex space-x-4">
						{boolSessionAuth ? (
							<>
								<li>
									<Link href={'/'}>Home</Link>
								</li>
								<li>
									<Link href={'/shopProducts'}>Produtos</Link>
								</li>
								<li>
									<Link href={'/dashboard'}>Dashboard</Link>
								</li>
								<li>
									<LogoutButton />
								</li>
							</>
						) : (
							<>
								<li>
									<Link href={'/register'}>Cadastro</Link>
								</li>
								<li>
									<Link href={'/login'}>Login</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}
