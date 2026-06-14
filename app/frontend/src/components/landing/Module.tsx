import { Stack } from "@mantine/core";
import type { ReactNode } from "react";
import Reveal from "../shared/Reveal";

interface ModuleProps {
	children: ReactNode;
}

export default function Module({ children }: ModuleProps) {
	return (
		<Reveal>
			<Stack w="100%" h="65vh" justify="center" align="center" ta="center">
				{children}
			</Stack>
		</Reveal>
	);
}
