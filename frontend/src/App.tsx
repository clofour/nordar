import { Link, Outlet, useLocation } from "react-router";
import { AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLayoutDashboard, IconCalendar, IconSparkles, IconNotes } from "@tabler/icons-react";
import Logo, { LogoLayout } from "@/components/shared/Logo/Logo";

export default function App() {
	const location = useLocation();

	const navLinks = [
		{ href: "/app/dashboard", label: "Home", icon: IconLayoutDashboard },
		{ href: "/app/calendar", label: "Calendar", icon: IconCalendar },
		{ href: "/app/goals", label: "Goals", icon: IconSparkles },
		{ href: "/app/reflections", label: "Reflections", icon: IconNotes },
	];

	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }} padding="md">
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
					<Group gap="sm">
						<Logo layout={LogoLayout.Horizontal} size="xl" />
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				{navLinks.map((link) => (
					<NavLink
						key={link.label}
						component={Link}
						to={link.href}
						label={link.label}
						leftSection={<link.icon size={18} />}
						active={location.pathname.startsWith(link.href)}
					/>
				))}
			</AppShell.Navbar>
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}
