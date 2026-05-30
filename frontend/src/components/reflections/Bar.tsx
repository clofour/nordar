import type { ReflectionGet } from "@/api/models";
import { Card, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import type { ReactNode } from "react";
import Point from "@/components/reflections/Point";

interface BarProps {
	label: string;
	value: "positive" | "negative" | "improvement";
	reflections: ReflectionGet[];
}

export default function Bar({ label, value, reflections }: BarProps) {
	const itemData = reflections.flatMap((reflection) =>
		reflection[value].map((point) => ({
			name: point,
			eventId: reflection.eventId,
			date: reflection.date,
		})),
	);
	const items = itemData.map((data) => <Point name={data.name} eventId={data.eventId} date={data.date} />);

	return (
		<Card w="100%" h="100%" shadow="sm" withBorder>
			<Card.Section withBorder inheritPadding>
				<Group justify="space-between">
					<Text>{label}</Text>
					<Text>{itemData.length}</Text>
				</Group>
			</Card.Section>
			<ScrollArea>{items}</ScrollArea>
		</Card>
	);
}
