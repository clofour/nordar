import Event from "@/components/dashboard/Event";
import { useListEvents } from "@/api/endpoints/event/event";
import { expandRecurringEvents, type ScheduleEventData } from "@mantine/schedule";
import { theme } from "@/data/theme";
import { Stack } from "@mantine/core";
import type { EventGet } from "@/api/models";
import EmptyState from "../shared/EmptyState";
import { IconCalendarEvent } from "@tabler/icons-react";
import DataStateWrapper from "../shared/DataStateWrapper";

export default function EventsToday() {
	const dayStart = new Date();
	dayStart.setHours(0, 0, 0, 0);
	const dayEnd = new Date();
	dayEnd.setHours(23, 59, 59, 999);

	const { data: response, error, isLoading, mutate } = useListEvents();
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

	const cards = expandedEvents.map((event) => <Event key={event.id} event={event} />);

	return (
		<DataStateWrapper isLoading={isLoading} isEmpty={cards.length == 0} emptyProps={{
			Icon: IconCalendarEvent,
			text: "No events yet",
			description: "All your events will be shown here. Create your first event.",
			cta: "Add event"
		}}>
			<Stack gap="xs">
				{cards}
			</Stack>
		</DataStateWrapper>
	);
}
