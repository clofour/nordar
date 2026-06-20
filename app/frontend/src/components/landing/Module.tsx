import { Stack } from "@mantine/core";
import type { ReactNode } from "react";
import Reveal from "../shared/Reveal";

interface ModuleProps {
	id?: string;
	children: ReactNode;
}

export default function Module({ id, children }: ModuleProps) {
	return (
		<Reveal>
			<Stack id={id} w="100%" h="65vh" justify="center" align="center" ta="center" gap="50px">
				{children}
			</Stack>
		</Reveal>
	);
}
