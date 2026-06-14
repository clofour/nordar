import type { ReflectionGet } from "@/api/models";
import { Card, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import Item from "@/components/reflections/Item";
import type { Icon } from "@tabler/icons-react";

interface BarProps {
	label: string;
	value: "positive" | "negative" | "improvement";
	Icon: Icon;
	reflections: ReflectionGet[];
}

export default function Bar({ label, value, Icon, reflections }: BarProps) {
	const itemData = reflections.flatMap((reflection) =>
		reflection[value].map((point) => ({
			name: point,
			eventName: reflection.event?.name,
			date: reflection.date,
		})),
	);

	return (
		<Card w="100%" h="100%" withBorder>
			<Card.Section p="sm" withBorder>
				<Group justify="space-between">
					<Group>
						<Icon size={16} />
						<Text>{label}</Text>
					</Group>
					<Text>{itemData.length}</Text>
				</Group>
			</Card.Section>
			{itemData.map((data) => (
				<Card.Section p="xs" withBorder>
					<Item key={data.name} name={data.name} eventName={data.eventName} date={data.date} />
				</Card.Section>
			))}
		</Card>
	);
}
