import { Link, Outlet, useLocation } from "react-router";
import { ActionIcon, AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLayoutDashboard, IconCalendar, IconSparkles, IconNotes, IconLogout } from "@tabler/icons-react";
import Logo, { LogoLayout } from "@/components/shared/Logo/Logo";
import { useAuth } from "./contexts/AuthContext";
import { postApiAuthSignOut } from "./api/endpoints/auth/auth";
import { NotificationType, useNotification } from "./helpers";
import { getErrorMessage } from "./data/error";
import ThemeToggle from "./components/misc/ThemeToggle";
import LogOutButton from "./components/auth/LogOutButton";

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
				<Group h="100%" justify="space-between" px="md">
					<Group gap="sm">
						<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
						<Logo layout={LogoLayout.Horizontal} size="xl" />
					</Group>
					<Group>
						<ThemeToggle />
						<LogOutButton />
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
