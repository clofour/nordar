import { Box, Paper, Stack, Text } from "@mantine/core";

interface ItemProps {
	name?: string;
	eventName: string | undefined;
	date: string;
}

export default function Item({ name, eventName, date }: ItemProps) {
	const formattedDate = new Date(date).toLocaleDateString("en-GB");

	return (
		<Box>
			<Text>{name}</Text>

			<Text size="sm" c="dimmed">
				{eventName != null && `${eventName} · ${formattedDate}`}
				{eventName == null && `${formattedDate}`}
			</Text>
		</Box>
	);
}
