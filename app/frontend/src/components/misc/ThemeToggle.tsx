import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme();

    function onClick() {
        setColorScheme(computedColorScheme !== "light" ? "light" : "dark");
    }

    return (
        <ActionIcon variant="subtle" aria-label="Log Out" onClick={onClick}>
            {computedColorScheme === "light" ? <IconSun /> : <IconMoon />}
        </ActionIcon>
    );
}
