import ClosingCTA from "@/components/landing/ClosingCTA";
import FAQ from "@/components/landing/FAQ";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Footer from "@/components/landing/Footer";
import Gradient from "@/components/landing/Gradient";
import Hero from "@/components/landing/Hero";
import LinkButton from "@/components/landing/LinkButton";
import Overview from "@/components/landing/Overview";
import Problem from "@/components/landing/Problem";
import SocialProof from "@/components/landing/SocialProof";
import Background from "@/components/misc/Background";
import Logo, { LogoLayout } from "@/components/shared/Logo/Logo";
import { AppShell, Group, Stack } from "@mantine/core";

export default function Landing() {
	return (
		<AppShell header={{ height: 60 }} footer={{ height: 100 }} padding="md">
			<AppShell.Header>
				<Group h="100%" justify="space-between" px="md">
					<Group>
						<Logo layout={LogoLayout.Horizontal} size="xl" />
					</Group>
					<Group gap="xs">
						<LinkButton variant="default" label="Sign In" to="/auth/signin" />
						<LinkButton variant="gradient" label="Start free" to="/auth/signup" />
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				<Background starDensity={0.00025} background={<Gradient />} />
				<Stack p="100px 20px 0px 20px" gap="100">
					<Hero />
					<Problem />
					<SocialProof />
					<Overview />
					<FeatureGrid />
					<FAQ />
					<ClosingCTA />
					<Footer />
				</Stack>
			</AppShell.Main>
		</AppShell>
	);
}
