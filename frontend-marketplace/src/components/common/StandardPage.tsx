import Link from 'next/link';

export default function StandardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Nova Página</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Esta é uma nova página de exemplo.</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
