import { Button, rem, Stack, type ButtonVariant } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link } from "react-router";
import Logo, { LogoLayout } from "../shared/Logo/Logo";
import LinkButton from "./LinkButton";

export default function ClosingCTA() {
	return (
		<Stack justify="center" align="center" ta="center">
			<Logo layout={LogoLayout.Icon} />
			<h2>Lorem ipsum dolor sit amet consectetur adipiscing elit.</h2>
			<p>Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi.</p>
			<LinkButton variant="filled" label="Sign Up" to="/auth/signup" />
			<p>Placeholder</p>
		</Stack>
	);
}
