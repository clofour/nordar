import { signOut } from "@/api/endpoints/auth/auth";
import { useAuth } from "@/contexts/AuthContext";
import { getErrorMessage } from "@/data/error";
import { NotificationType, useNotification } from "@/helpers";
import { ActionIcon } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

export default function LogOutButton() {
	const notify = useNotification();

	const { setAuthenticationState } = useAuth();
	async function logout() {
		const response = await signOut();

		if (response.status == 204) {
			setAuthenticationState(false);
		} else {
			notify(NotificationType.Error, response.data ?? getErrorMessage(response.status));
		}
	}

	return (
		<ActionIcon variant="subtle" aria-label="Log Out" onClick={logout}>
			<IconLogout />
		</ActionIcon>
	);
}
