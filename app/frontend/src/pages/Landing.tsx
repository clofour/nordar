import LinkButton from "@/components/landing/LinkButton";
import Logo, { LogoLayout } from "@/components/shared/Logo/Logo";
import { NotificationType, useNotification } from "@/helpers";
import { AppShell, Button, Group } from "@mantine/core";

export default function Landing() {
	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header>
				<Group h="100%" justify="space-between" px="md">
					<Group>
						<Logo layout={LogoLayout.Horizontal} size="xl" />
					</Group>
					<Group>
						<LinkButton
							variant="default"
							label="Sign In"
							to="/auth/signin"
						/>
						<LinkButton
							variant="filled"
							label="Sign Up"
							to="/auth/signup"
						/>
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				"hi!"
			</AppShell.Main>
		</AppShell>
	);
}
