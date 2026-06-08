import { Schedule } from "@mantine/schedule";
import { useListEvents } from "@/api/endpoints/event/event";
import { theme } from "@/data/theme";

export default function Calendar() {
	const { data: response, error, isLoading, mutate } = useListEvents();

	const events = response?.data.map((event) => ({
		...event,
		color: theme.colors.event,
	}));

	return (
		<>
			<Schedule events={events ?? []} layout="responsive" />
		</>
	);
}
