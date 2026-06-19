import { EventState, type EventGet } from "@/api/models";
import { Paper, Group, Text, Checkbox } from "@mantine/core";
import type { ScheduleEventData } from "@mantine/schedule";
import { useEffect, useState } from "react";
import { EventTypes } from "@/metadata/events";
import {
	setOnetimeInstanceState,
	setRecurringInstanceState,
	useGetOnetimeInstanceState,
	useGetRecurringInstanceState,
	useSetOnetimeInstanceState,
	useSetRecurringInstanceState,
} from "@/api/endpoints/event/event";
import { NotificationType, useNotification } from "@/helpers";
import { getErrorMessage } from "@/data/error";

interface EventProps {
	event: ScheduleEventData & EventGet;
}

export default function Event({ event }: EventProps) {
	const notify = useNotification();

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
		isLoading
	} = event.type == "recurring" && "recurringEventId" in event && "recurrenceId" in event
		? useGetRecurringInstanceState(event.recurringEventId, new Date(event.recurrenceId).toISOString())
		: useGetOnetimeInstanceState(event.id);
	useEffect(() => {
		if (response?.data) {
			setChecked(getBoolFromState(response.data.eventState));
		}
	}, [response?.data?.eventState]);

	const prompt = () => {
		const result = Math.random();

		if (result < 0.5) {
			console.log("Easter egg!");
		}
	};

	const onMutationError = (error: number) => {
		notify(NotificationType.Error, getErrorMessage(error));
	};
	const onetimeMutation = useSetOnetimeInstanceState({
		mutation: { onError: onMutationError }
	});
	const recurringMutation = useSetRecurringInstanceState({
		mutation: { onError: onMutationError }
	});
	const onChange = async (checkBoxEvent: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckboxValue = checkBoxEvent.currentTarget.checked;
		const newState = getStateFromBool(newCheckboxValue);

		const requestData = {
			eventState: newState,
		};

		if (event.type == "onetime") {
			onetimeMutation.mutate({eventId: event.id, data: requestData});
		} else if (event.type == "recurring" && "recurringEventId" in event && "recurrenceId" in event) {
			recurringMutation.mutate({eventId: event.recurringEventId, eventOccurrence: new Date(event.recurrenceId).toISOString(), data: requestData});
		} else {
			throw Error("Incorrect schema on Event object.");
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
