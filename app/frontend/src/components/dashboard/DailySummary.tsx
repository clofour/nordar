import { useGoalStats } from "@/api/endpoints/goal/goal";
import { Stack, SimpleGrid, Paper, Group, ThemeIcon, Text, Checkbox, Title, Skeleton } from "@mantine/core";
import { IconStar, IconCompass, IconActivity } from "@tabler/icons-react";
import SummaryCard from "./SummaryCard";
import DataStateWrapper from "../shared/DataStateWrapper";

export default function DailySummary() {
	const { data: response, error, isLoading } = useGoalStats();
	const goalStats = response?.data;

	const summaryCardData = [
		{
			name: "North Stars",
			value: goalStats?.northStarCount,
			icon: IconStar,
		},
		{
			name: "Bearings",
			value: goalStats?.bearingCount,
			icon: IconCompass,
		},
		{
			name: "Movements",
			value: goalStats?.movementCount,
			icon: IconActivity,
		},
	];

	return (
		<DataStateWrapper isLoading={isLoading}>
			<SimpleGrid cols={{ base: 2, lg: 4 }}>
				{summaryCardData.map((card) => (
					<SummaryCard key={card.name} card={card} />
				))}
			</SimpleGrid>
		</DataStateWrapper>
	);
}
