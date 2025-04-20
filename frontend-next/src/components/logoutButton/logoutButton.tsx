'use client';

import { useAuth } from '@/context/AuthContext';
import { submitLogout } from '@/lib/actions/auth/postLogout';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
	const router = useRouter();
	const { setIsAuthenticated } = useAuth();

	const handleLogout = async () => {
		try {
			await submitLogout();
			setIsAuthenticated(false);
			router.push('/login');
		} catch (error) {
			console.error('Erro ao fazer logout', error);
		}
	};

	return (
		<Button className='w-auto p-0 cursor-pointer' onClick={handleLogout}>
			<LogOut className="h-[1.2rem] w-[1.2rem]" />
			<span className="sr-only">Alternar tema</span>
		</Button>
	);
}
