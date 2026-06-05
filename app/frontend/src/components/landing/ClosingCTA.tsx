import { Button, Stack, type ButtonVariant } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link } from "react-router";
import Logo, { LogoLayout } from "../shared/Logo/Logo";
import LinkButton from "./LinkButton";

export default function ClosingCTA() {
    return (
        <Stack justify="center" align="center" ta="center">
            <Logo layout={LogoLayout.Icon} />
            <h2>Placeholder</h2>
            <p>Placeholder</p>
            <LinkButton
                variant="filled"
                label="Sign Up"
                to="/auth/signup"
            />
            <p>Placeholder</p>
        </Stack>
    );
}
