"use client";

import { handleSubmit } from "@/lib/actions/auth/logout";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await handleSubmit();
			router.refresh();
			router.push("/login");
		} catch (error) {
			console.error('Erro ao fazer login', error);
		}
	};

	return <button type="button" onClick={handleLogout}>Logout</button>;
}
