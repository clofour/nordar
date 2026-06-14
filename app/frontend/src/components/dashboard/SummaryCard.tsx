import { Paper, Group, ThemeIcon, Text } from "@mantine/core";
import type { Icon } from "@tabler/icons-react";

interface CardData {
	name: string;
	value: string | number | undefined;
	icon: Icon;
}

interface SummaryCardProps {
	card: CardData;
}

export default function SummaryCard({ card }: SummaryCardProps) {
	return (
		<Paper key={card.name} p="md" withBorder>
			<Group gap="xs" mb="xs">
				<ThemeIcon size="sm" variant="light">
					<card.icon size={14} />
				</ThemeIcon>
				<Text size="xs" fw={500} c="dimmed">
					{card.name}
				</Text>
			</Group>
			<Text size="xl" fw={700}>
				{card.value}
			</Text>
		</Paper>
	);
}
