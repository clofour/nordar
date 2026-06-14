import DailySummary from "@/components/dashboard/DailySummary";
import EventsToday from "@/components/dashboard/EventsToday";
import PageTitle from "@/components/shared/PageTitle";
import { Stack, Title } from "@mantine/core";

export default function Dashboard() {
	return (
		<Stack>
			<PageTitle name="Dashboard" description="A snapshot of your day." />
			<DailySummary />

			<Title order={3}>Today</Title>
			<EventsToday />
		</Stack>
	);
}
