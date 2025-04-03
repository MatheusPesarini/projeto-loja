import AdminDashboard from '@/app/(private)/adminDashboard/page';
import UserDashboard from '@/app/(private)/userDashboard/page';
import { getUserRole } from '@/lib/cookie/dal';

export default async function Dashboard() {
	// O middleware já garante que o usuário está autenticado,
	// apenas precisamos obter seu papel
	const userRole = await getUserRole();

	// Renderizar com base no papel
	if (userRole === 'admin') {
		return <AdminDashboard />;
	}

	return <UserDashboard />;
}
