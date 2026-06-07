import { Stack } from "@mantine/core";
import type { ReactNode } from "react";

interface ModuleProps {
    children: ReactNode;
}

export default function Module({ children }: ModuleProps) {
    return (
        <Stack justify="center" align="center" ta="center">
            {children}
        </Stack>
    );
}
