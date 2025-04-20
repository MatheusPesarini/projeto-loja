'use client';

import React from 'react';
import { Button } from '../ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function ThemeButton() {
	const [theme, setThemeState] = React.useState<'light' | 'dark' | null>(null);

	React.useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains('dark');
		setThemeState(isDarkMode ? 'dark' : 'light');
	}, []);

	React.useEffect(() => {
		const isDark =
			theme === 'dark' ||
			(theme === null &&
				window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
	}, [theme]);

	const toggleTheme = () => {
		setThemeState((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
	};

	if (theme === null) {
		return null;
	}

	return (
		<Button className='w-auto p-0 cursor-pointer' onClick={toggleTheme}>
			<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Alternar tema</span>
		</Button>
	);
}
