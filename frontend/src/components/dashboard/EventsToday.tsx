import Event from "@/components/dashboard/Event"
import { useGetApiEventGet } from "@/api/endpoints/event/event";
import { expandRecurringEvents } from "@mantine/schedule";
import { theme } from "@/data/theme";
import { Stack } from "@mantine/core";

export default function EventsToday() {
    const dayStart = new Date();
    dayStart.setUTCHours(0, 0, 0, 0);
    const dayEnd = new Date();
    dayEnd.setUTCHours(23, 59, 59, 9999)

    const { data: response, error, isLoading, mutate } = useGetApiEventGet();
    const events = response?.data ?? [];
    const preprocessedEvents = events.map((event) => ({
            ...event,
            color: theme.colors.event
        }));
    const expandedEvents = expandRecurringEvents({
        events: preprocessedEvents,
        rangeStart: dayStart,
        rangeEnd: dayEnd
    });

    console.log(expandedEvents);

    const cards = expandedEvents.map((event) => (
        <Event event={event} />
    ))

    return (
        <Stack>
            {cards}
        </Stack>
    );
}
