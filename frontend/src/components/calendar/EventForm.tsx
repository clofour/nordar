import { Alert, Button, Checkbox, Group, Input, NumberInput, SegmentedControl, Select, Stack, TextInput } from "@mantine/core";
import { useForm, schemaResolver } from "@mantine/form";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { getErrorMessage } from "@/data/error";
import { postApiEventCreateOnetime, postApiEventCreateRecurring } from "@/api/endpoints/event/event";
import { RecurrenceTypes, WeekDay } from "@/api/models";
import { PostApiEventCreateOnetimeBody, PostApiEventCreateRecurringBody } from "@/api/endpoints/event/event.zod";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useState } from "react";
import { durationToMinutes } from "@/helpers";
import { EventTypes } from "@/metadata/events";

interface EventFormProps {
	close: () => void;
}

interface EventValues {
	name: string;
	startDate: string;
	startTime: string;
	duration: string;
	type: EventTypes;
	recurrenceAmount: number;
	recurrenceType: RecurrenceTypes;
	weekDays: WeekDay[];
	monthDay: number | null;
	yearMonth: number | null;
}

export default function EventForm({ close }: EventFormProps) {
	const [alert, setAlert] = useState("");

	const processValues = (values: EventValues) => {
		return {
			...values,
			duration: durationToMinutes(values.duration),
		};
	};
	const form = useForm<EventValues>({
		// TODO: Remove form descriptions, as they don"t add anything
		mode: "controlled",
		initialValues: {
			name: "",
			startDate: "", // TODO: Fix "Invalid Date" error
			startTime: "",
			duration: "",
			type: EventTypes.Onetime,
			recurrenceAmount: 1,
			recurrenceType: RecurrenceTypes.WEEKLY,
			weekDays: [],
			monthDay: null,
			yearMonth: null,
		},
		validate: (values) => {
			let processedValues = processValues(values);
			let formSchema;
			let formSchemaResolver;

			switch (processedValues.type) {
				case EventTypes.Onetime:
					formSchema = PostApiEventCreateOnetimeBody;
					break;
				case EventTypes.Recurring:
					formSchema = PostApiEventCreateRecurringBody;
					break;
				default:
					throw new RangeError("Type is not valid.");
			}

			formSchema = formSchema.omit({
				timeZoneId: true,
			});

			formSchemaResolver = schemaResolver(formSchema, { sync: true });
			return formSchemaResolver(processedValues);
		},
	});
	const handleSubmit = async (values: EventValues) => {
		let processedValues = processValues(values);
		let baseRequestData = {
			name: processedValues.name,
			startDate: processedValues.startDate,
			startTime: processedValues.startTime,
			timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,
			duration: processedValues.duration,
		};
		let requestData;
		let response;

		switch (processedValues.type) {
			case EventTypes.Onetime:
				requestData = {
					...baseRequestData,
				};
				response = await postApiEventCreateOnetime(requestData);
				break;

			case EventTypes.Recurring:
				requestData = {
					...baseRequestData,
					recurrenceAmount: values.recurrenceAmount,
					recurrenceType: values.recurrenceType,
					weekDays: values.weekDays,
					monthDay: values.monthDay,
					yearMonth: values.yearMonth,
				};

				response = await postApiEventCreateRecurring(requestData);
				break;

			default:
				throw RangeError("Event type must be either 'EventTypes.Onetime' or 'EventTypes.Recurring'.");
		}

		if (response.status === 200) {
			close();
		} else {
			setAlert(response.data ?? getErrorMessage(response.status));
		}
	};

	const eventTypeOptions = [
		{ label: "One-time", value: EventTypes.Onetime },
		{ label: "Recurring", value: EventTypes.Recurring },
	];
	const unitOptions = [
		{ label: "day", value: RecurrenceTypes.DAILY },
		{ label: "week", value: RecurrenceTypes.WEEKLY },
		{ label: "month", value: RecurrenceTypes.MONTHLY },
		{ label: "year", value: RecurrenceTypes.YEARLY },
	];
	const weekDayOptions = [
		{ label: "Monday", value: WeekDay.MO },
		{ label: "Tuesday", value: WeekDay.TU },
		{ label: "Wednesday", value: WeekDay.WE },
		{ label: "Thursday", value: WeekDay.TH },
		{ label: "Friday", value: WeekDay.FR },
		{ label: "Saturday", value: WeekDay.SA },
		{ label: "Sunday", value: WeekDay.SU },
	];
	const yearMonthOptions = [
		{ label: "January", value: 1 },
		{ label: "February", value: 2 },
		{ label: "March", value: 3 },
		{ label: "April", value: 4 },
		{ label: "May", value: 5 },
		{ label: "June", value: 6 },
		{ label: "July", value: 7 },
		{ label: "August", value: 8 },
		{ label: "September", value: 9 },
		{ label: "October", value: 10 },
		{ label: "November", value: 11 },
		{ label: "December", value: 12 },
	];

	return (
		<>
			<Alert variant="light" color="red" title="Error" icon={<IconExclamationCircle />} hidden={alert === ""}>
				{alert}
			</Alert>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput
						label="Name"
						description="What should this event be called?"
						placeholder="Go to the gym"
						required
						key={form.key("name")}
						{...form.getInputProps("name")}
					/>

					<Group grow justify="flex-between">
						<DatePickerInput
							label="Start date"
							description="What day should this event start?"
							placeholder="Tomorrow"
							required
							key={form.key("startDate")}
							{...form.getInputProps("startDate")}
						/>

						<TimePicker
							label="Start time"
							description="What time should this event start?"
							format="24h"
							required
							key={form.key("startTime")}
							{...form.getInputProps("startTime")}
						/>
					</Group>

					<TimePicker
						label="Duration"
						description="How long should this event last?"
						type="duration"
						required
						key={form.key("duration")}
						{...form.getInputProps("duration")}
					/>

					<Input.Wrapper label="Type" description="Should this event be recurring?" required>
						<SegmentedControl data={eventTypeOptions} fullWidth key={form.key("type")} {...form.getInputProps("type")} />
					</Input.Wrapper>

					{form.values.type == EventTypes.Recurring && (
						<>
							<Group grow justify="flex-between">
								<NumberInput
									label="Amount"
									description="How many recurrence units should there be?"
									placeholder="1"
									required
									key={form.key("recurrenceAmount")}
									{...form.getInputProps("recurrenceAmount")}
								/>
								<Select
									label="Unit"
									description="What should the recurrence unit be?"
									required
									data={unitOptions}
									key={form.key("recurrenceType")}
									{...form.getInputProps("recurrenceType")}
								/>
							</Group>

							{form.values.recurrenceType == RecurrenceTypes.WEEKLY && (
								<Checkbox.Group
									label="Day of the week"
									description="Which day of the week should this event take place?"
									required
									key={form.key("weekDays")}
									{...form.getInputProps("weekDays")}
								>
									<Group mt="xs">
										{weekDayOptions.map((weekday) => (
											<Checkbox key={weekday.value} label={weekday.label} value={weekday.value} />
										))}
									</Group>
								</Checkbox.Group>
							)}

							{form.values.recurrenceType == RecurrenceTypes.MONTHLY && (
								<NumberInput
									label="Day of the month"
									description="Which day of the month should this event take place?"
									min={1}
									max={31}
									required
									key={form.key("monthDay")}
									{...form.getInputProps("monthDay")}
								/>
							)}

							{form.values.recurrenceType == RecurrenceTypes.YEARLY && (
								<Group grow justify="flex-between">
									<NumberInput
										label="Day of the month"
										description="Which day of the month should this event take place?"
										required
										key={form.key("monthDay")}
										{...form.getInputProps("monthDay")}
									/>
									<Select
										label="Month of the year"
										description="Which month of the year should this event take place?"
										required
										data={yearMonthOptions}
										key={form.key("yearMonth")}
										{...form.getInputProps("yearMonth")}
									/>
								</Group>
							)}
						</>
					)}

					<Group justify="flex-end">
						<Button type="submit">Submit</Button>
					</Group>
				</Stack>
			</form>
		</>
	);
}
