'use client';

import LoginForm from '@/components/login-form/loginForm';

export default function Login() {
	return (
		<div className="flex w-full justify-center p-6 md:p-28">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
