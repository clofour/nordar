import { Schedule } from "@mantine/schedule";
import { useListEvents } from "@/api/endpoints/event/event";
import { theme } from "@/data/theme";
import DataStateWrapper from "../shared/DataStateWrapper";
import { IconCalendarEvent } from "@tabler/icons-react";

interface PlanProps {
	createEvent: () => void;
}

export default function Plan({ createEvent }: PlanProps) {
	const { data: response, error, isLoading, mutate } = useListEvents();

	const events = response?.data.map((event) => ({
		...event,
		color: theme.colors.event,
	}));

	return (
		<DataStateWrapper isLoading={isLoading} isEmpty={events?.length == 0} emptyProps={{
			Icon: IconCalendarEvent,
			text: "No events yet",
			description: "All your events will be shown here. Create your first event.",
			cta: "Add event",
			onCtaClick: createEvent
		}}>
			<Schedule events={events ?? []} layout="responsive" />
		</DataStateWrapper>
	);
}
