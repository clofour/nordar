import { useGetApiAuthIsAuthenticated } from "@/api/endpoints/auth/auth";
import { Center, Loader } from "@mantine/core";
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

interface AuthenticationRequirementProps {
	type: boolean;
	children?: ReactNode;
}

export default function AuthenticationRequirement({ type, children }: AuthenticationRequirementProps) {
	const { data: response, error, isLoading, mutate } = useGetApiAuthIsAuthenticated();

	if (isLoading) return (
		<Center w="100%" h="100%">
			<Loader />
		</Center>
	)

	if (type == true && response?.status != 200) {

		return (<Navigate to="/auth" />)
	}
	if (type == false && response?.status == 200) {
		return (<Navigate to="/app" />)
	}

	return children ?? <Outlet />;
}
