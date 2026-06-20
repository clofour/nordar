import { Stack } from "@mantine/core";
import type { ReactNode } from "react";

interface SectionIntroductionProps {
	children: ReactNode;
}

export default function SectionIntroduction({ children }: SectionIntroductionProps) {
	return (
        <Stack w="100%" justify="center" align="center" ta="center">
            {children}
        </Stack>
    );
}
