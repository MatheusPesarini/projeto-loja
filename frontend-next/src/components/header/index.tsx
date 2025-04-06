import { verifySession } from '@/lib/cookie/dal';
import Link from 'next/link';
import LogoutButton from '../logoutButton/page';

export default async function Header() {
	const session = await verifySession();
	const userAuth = session?.isAuth;

	return (
		<header className="flex py-2 px-4 bg-gray-800 text-white">
			<div className="flex items-center justify-between w-full max-w-7xl mx-auto">
				<h1>Teste</h1>
				<nav>
					<ul className="flex space-x-4">
						{userAuth ? (
							<>
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
