import { useListReflections } from "@/api/endpoints/reflection/reflection";
import { Paper, SimpleGrid, Stack, Text } from "@mantine/core";

interface StatsProps {
	aspect: string;
	date: string;
	goal: string;
}

export default function Stats() {
	return (
		<Paper shadow="sm" withBorder p="md">
			Hi!
		</Paper>
	);
}
