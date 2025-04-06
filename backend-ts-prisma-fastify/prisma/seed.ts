import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.upsert({
		where: {
			email: 'test@test.com',
		},
		update: {},
		create: {
			email: 'test@test.com',
			name: 'Test User',
			password: 'password',
		},
	});

	const product = await prisma.product.upsert({
		where: {
			id: '1',
		},
		update: {},
		create: {
			name: 'Test Product',
			price: 100,
			quantity: 10,
			category: 'Test Category',
		},
	});
	console.log(user);
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
