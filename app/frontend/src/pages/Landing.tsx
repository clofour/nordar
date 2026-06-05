import ClosingCTA from "@/components/landing/ClosingCTA";
import FAQ from "@/components/landing/FAQ";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Hero from "@/components/landing/Hero";
import LinkButton from "@/components/landing/LinkButton";
import Overview from "@/components/landing/Overview";
import Problem from "@/components/landing/Problem";
import SocialProof from "@/components/landing/SocialProof";
import Logo, { LogoLayout } from "@/components/shared/Logo/Logo";
import { NotificationType, useNotification } from "@/helpers";
import { AppShell, Button, Group } from "@mantine/core";

export default function Landing() {
	return (
		<AppShell header={{ height: 60 }} footer={{ height: 100 }} padding="md">
			<AppShell.Header>
				<Group h="100%" justify="space-between" px="md">
					<Group>
						<Logo layout={LogoLayout.Horizontal} size="xl" />
					</Group>
					<Group gap="xs">
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
				<Hero />
				<Problem />
				<Overview />
				<SocialProof />
				<FeatureGrid />
				<FAQ />
				<ClosingCTA />
			</AppShell.Main>
			<AppShell.Footer>

			</AppShell.Footer>
		</AppShell>
	);
}
