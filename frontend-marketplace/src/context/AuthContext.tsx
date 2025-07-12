'use client';

import { createContext, useContext, useState } from 'react';

type AuthContextType = {
	isAuthenticated: boolean;
	setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider');
	}
	return context;
}
