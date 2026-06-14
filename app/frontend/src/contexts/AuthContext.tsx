import { useIsAuthenticated } from "@/api/endpoints/auth/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
	authenticationState: boolean | null;
	setAuthenticationState: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [authenticationState, setAuthenticationState] = useState<boolean | null>(null);

	const {
		data: response,
		error,
		isLoading,
		mutate,
	} = useIsAuthenticated({
		swr: {
			dedupingInterval: 0,
		},
	});
	useEffect(() => {
		if (!isLoading) {
			setAuthenticationState(response?.status == 200);
		}
	}, [response, isLoading]);

	return <AuthContext.Provider value={{ authenticationState, setAuthenticationState }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
