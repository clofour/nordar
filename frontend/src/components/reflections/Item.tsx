import { Paper, Stack, Text } from "@mantine/core";

interface ItemProps {
	name: string;
	eventId: string | null | undefined;
	date: string;
}

export default function Item({ name, eventId, date }: PointProps) {
	return (
		<Paper>
			<Text>{name}</Text>
			<Text>
				{eventId} x {date}
			</Text>
		</Paper>
	);
}
