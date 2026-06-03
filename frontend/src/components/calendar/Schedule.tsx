import { Schedule } from "@mantine/schedule";
import { useGetApiEventGet } from "@/api/endpoints/event/event";
import { theme } from "@/data/theme";

export default function Calendar() {
	const { data: response, error, isLoading, mutate } = useGetApiEventGet();

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
