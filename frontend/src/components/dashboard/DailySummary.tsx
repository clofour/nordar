import { useGetApiGoalStats } from "@/api/endpoints/goal/goal";
import { Stack, SimpleGrid, Paper, Group, ThemeIcon, Text, Checkbox, Title } from "@mantine/core";
import { IconStar, IconCompass, IconActivity } from "@tabler/icons-react";
import SummaryCard from "./SummaryCard";

export default function DailySummary() {
    const { data: response, error, isLoading, mutate } = useGetApiGoalStats();
    const goalStats = response?.data;

    const summaryCardData = [
        {
            name: "North Stars",
            value: goalStats?.northStarCount,
            icon: IconStar
        },
        {
            name: "Bearings",
            value: goalStats?.bearingCount,
            icon: IconCompass
        },
        {
            name: "Movements",
            value: goalStats?.movementCount,
            icon: IconActivity
        }
    ]

    return (
        <SimpleGrid cols={{ base: 2, lg: 4 }}>
            {summaryCardData.map((card) => (
                <SummaryCard card={card} />
            ))}
        </SimpleGrid>
    );
}
