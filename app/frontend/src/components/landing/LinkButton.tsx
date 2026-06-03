import { Button, type ButtonVariant } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link } from "react-router";

interface LinkButtonProps {
    label: string;
    to: string;
    variant: ButtonVariant;
}

export default function LinkButton({ variant, label, to }: LinkButtonProps) {
    return (
        <Button variant={variant} component={Link} to={to}>
            {label}
        </Button>
    );
}
