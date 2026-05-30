import { EventState, type EventGet } from "@/api/models";
import { Paper, Group, Text, Checkbox } from "@mantine/core";
import type { ScheduleEventData } from "@mantine/schedule";
import { useEffect, useState } from "react";
import { EventTypes } from "@/metadata/events";
import {
	putApiEventSetOnetimeInstanceStateOnetimeEventId,
	putApiEventSetRecurringInstanceStateRecurringEventIdEventOccurence,
	useGetApiEventGetOnetimeInstanceStateOnetimeEventId,
	useGetApiEventGetRecurringInstanceStateRecurringEventIdEventOccurence,
} from "@/api/endpoints/event/event";

interface EventProps {
	event: ScheduleEventData & EventGet;
}

export default function Event({ event }: EventProps) {
	const [checked, setChecked] = useState(false);
	function getBoolFromState(state: EventState) {
		const stateBoolMap = {
			[EventState.Complete]: true,
			[EventState.Incomplete]: false,
			[EventState.Unknown]: false,
		};
		return stateBoolMap[state];
	}
	function getStateFromBool(bool: boolean) {
		return bool ? EventState.Complete : EventState.Incomplete;
	}

	const {
		data: response,
		error,
		isLoading,
		mutate,
	} = event.type == "recurring" && "recurringEventId" in event && "recurrenceId" in event
		? useGetApiEventGetRecurringInstanceStateRecurringEventIdEventOccurence(event.recurringEventId, new Date(event.recurrenceId).toISOString())
		: useGetApiEventGetOnetimeInstanceStateOnetimeEventId(event.id);
	useEffect(() => {
		if (response?.data) {
			setChecked(getBoolFromState(response.data.eventState));
		}
	}, [response?.data?.eventState]);

	const onChange = async (checkBoxEvent: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckboxValue = checkBoxEvent.currentTarget.checked;
		const newState = getStateFromBool(newCheckboxValue);

		const requestData = {
			eventState: newState,
		};

		let response = null;
		if (event.type == "onetime") {
			response = await putApiEventSetOnetimeInstanceStateOnetimeEventId(event.id, requestData);
		} else if (event.type == "recurring" && "recurringEventId" in event && "recurrenceId" in event) {
			response = await putApiEventSetRecurringInstanceStateRecurringEventIdEventOccurence(
				event.recurringEventId,
				new Date(event.recurrenceId).toISOString(),
				requestData,
			);
		}

		if (response && response.status === 200) {
			setChecked(newCheckboxValue);
		} else {
			console.log("Error");
		}
	};

	return (
		<Paper key={event.title} p="sm" withBorder>
			<Group>
				<Checkbox checked={checked} onChange={onChange} radius="xl" />
				<Text size="sm">{event.title}</Text>
			</Group>
		</Paper>
	);
}
