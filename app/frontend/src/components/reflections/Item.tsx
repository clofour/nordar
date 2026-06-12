import { Box, Paper, Stack, Text } from "@mantine/core";

interface ItemProps {
	name?: string;
	eventId: string | null | undefined;
	date: string;
}

export default function Item({ name, eventId, date }: ItemProps) {
	const formattedDate = new Date(date).toLocaleDateString("en-GB");

	return (
		<Box>
			<Text>{name}</Text>
			
			<Text size="sm" c="dimmed">
				{eventId != null && `${eventId} · ${formattedDate}`}
				{eventId == null && `${formattedDate}`}
			</Text>
		</Box>
	);
}
