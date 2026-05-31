import { useAuth } from "@/contexts/AuthContext";
import { Center, Loader } from "@mantine/core";
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

interface AuthenticationRequirementProps {
	type: boolean;
	children?: ReactNode;
}

export default function AuthenticationRequirement({ type, children }: AuthenticationRequirementProps) {
	const { authenticationState } = useAuth();
	
	if (authenticationState == null)
		return (
			<Center w="100%" h="100%">
				<Loader />
			</Center>
		);

	if (type == true && authenticationState == false) {
		return <Navigate to="/auth" />;
	}
	if (type == false && authenticationState == true) {
		return <Navigate to="/app" />;
	}

	return children ?? <Outlet />;
}
