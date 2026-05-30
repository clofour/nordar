import Event from "@/components/dashboard/Event";
import { useGetApiEventGet } from "@/api/endpoints/event/event";
import { expandRecurringEvents, type ScheduleEventData } from "@mantine/schedule";
import { theme } from "@/data/theme";
import { Stack } from "@mantine/core";
import type { EventGet } from "@/api/models";

export default function EventsToday() {
	const dayStart = new Date();
	dayStart.setHours(0, 0, 0, 0);
	const dayEnd = new Date();
	dayEnd.setHours(23, 59, 59, 9999);

	const { data: response, error, isLoading, mutate } = useGetApiEventGet();
	const events = response?.data ?? [];
	const preprocessedEvents = events.map((event) => ({
		...event,
		color: theme.colors.event,
	}));
	const expandedEvents = expandRecurringEvents({
		events: preprocessedEvents,
		rangeStart: dayStart,
		rangeEnd: dayEnd,
	}) as (ScheduleEventData & EventGet)[];

	const cards = expandedEvents.map((event) => <Event event={event} />);

	return <Stack gap="xs">{cards}</Stack>;
}
