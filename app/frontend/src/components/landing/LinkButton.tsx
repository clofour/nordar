import { Button, type ButtonVariant, type MantineSize } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link } from "react-router";

interface LinkButtonProps {
	label: string;
	to: string;
	variant: ButtonVariant;
	size?: MantineSize;
}

export default function LinkButton({ label, to, variant, size="sm" }: LinkButtonProps) {
	return (
		<Button variant={variant} size={size} component={Link} to={to}>
			{label}
		</Button>
	);
}
