import { Button, Checkbox, Group, Input, NumberInput, SegmentedControl, Select, Stack, TextInput } from "@mantine/core";
import { useForm, schemaResolver } from "@mantine/form";
import { DatePickerInput, TimePicker } from "@mantine/dates";
import { getErrorMessage } from "@/data/error";
import { createOnetime, createRecurring, useCreateOnetime, useCreateRecurring } from "@/api/endpoints/event/event";
import { RecurrenceTypes, WeekDay } from "@/api/models";
import { CreateOnetimeBody, CreateRecurringBody } from "@/api/endpoints/event/event.zod";
import { durationToMinutes, NotificationType, useNotification } from "@/helpers";
import { EventTypes } from "@/metadata/events";

interface EventFormProps {
	close: () => void;
}

interface EventValues {
	name: string;
	startDate: string | null;
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
	const notify = useNotification();

	const tomorrowDate = new Date();
	tomorrowDate.setDate(tomorrowDate.getDate() + 1);

	const processValues = (values: EventValues) => {
		return {
			...values,
			duration: durationToMinutes(values.duration),
		};
	};
	const form = useForm<EventValues>({
		mode: "controlled",
		initialValues: {
			name: "",
			startDate: null,
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
					formSchema = CreateOnetimeBody;
					break;
				case EventTypes.Recurring:
					formSchema = CreateRecurringBody;
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

	const onMutationSuccess = () => {
		close();
	};
	const onMutationError = (error: number) => {
		notify(NotificationType.Error, getErrorMessage(error));
	};
	const onetimeMutation = useCreateOnetime({
		mutation: { onError: onMutationError, onSuccess: onMutationSuccess },
	});
	const recurringMutation = useCreateRecurring({
		mutation: { onError: onMutationError, onSuccess: onMutationSuccess },
	});
	const handleSubmit = async (values: EventValues) => {
		let processedValues = processValues(values);
		if (processedValues.startDate == null) return;
		let baseRequestData = {
			name: processedValues.name,
			startDate: processedValues.startDate,
			startTime: processedValues.startTime,
			timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,
			duration: processedValues.duration,
		};

		let requestData;

		switch (processedValues.type) {
			case EventTypes.Onetime:
				requestData = {
					...baseRequestData,
				};
				onetimeMutation.mutate({ data: requestData });
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

				recurringMutation.mutate({ data: requestData });
				break;

			default:
				throw RangeError("Event type must be either 'EventTypes.Onetime' or 'EventTypes.Recurring'.");
		}
	};

	const eventTypeOptions = [
		{ label: "One-time", value: EventTypes.Onetime },
		{ label: "Recurring", value: EventTypes.Recurring },
	];
	const unitOptions = [
		{ label: "day(s)", value: RecurrenceTypes.DAILY },
		{ label: "week(s)", value: RecurrenceTypes.WEEKLY },
		{ label: "month(s)", value: RecurrenceTypes.MONTHLY },
		{ label: "year(s)", value: RecurrenceTypes.YEARLY },
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
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput label="Name" placeholder="Go to the gym" required key={form.key("name")} {...form.getInputProps("name")} />

					<Group grow justify="flex-between">
						<DatePickerInput label="Start date" placeholder="Tomorrow" required key={form.key("startDate")} {...form.getInputProps("startDate")} />

						<TimePicker label="Start time" format="24h" required key={form.key("startTime")} {...form.getInputProps("startTime")} />
					</Group>

					<TimePicker label="Duration" type="duration" required key={form.key("duration")} {...form.getInputProps("duration")} />

					<Input.Wrapper label="Type" required>
						<SegmentedControl data={eventTypeOptions} fullWidth key={form.key("type")} {...form.getInputProps("type")} />
					</Input.Wrapper>

					{form.values.type == EventTypes.Recurring && (
						<>
							<Input.Wrapper label="Every" required>
								<Group grow justify="flex-between">
									<NumberInput placeholder="1" required key={form.key("recurrenceAmount")} {...form.getInputProps("recurrenceAmount")} />
									<Select required data={unitOptions} key={form.key("recurrenceType")} {...form.getInputProps("recurrenceType")} />
								</Group>
							</Input.Wrapper>

							{form.values.recurrenceType == RecurrenceTypes.WEEKLY && (
								<Checkbox.Group label="Day of the week" required key={form.key("weekDays")} {...form.getInputProps("weekDays")}>
									<Group mt="xs">
										{weekDayOptions.map((weekday) => (
											<Checkbox key={weekday.value} label={weekday.label} value={weekday.value} />
										))}
									</Group>
								</Checkbox.Group>
							)}

							{form.values.recurrenceType == RecurrenceTypes.MONTHLY && (
								<NumberInput label="Day of the month" min={1} max={31} required key={form.key("monthDay")} {...form.getInputProps("monthDay")} />
							)}

							{form.values.recurrenceType == RecurrenceTypes.YEARLY && (
								<Group grow justify="flex-between">
									<NumberInput label="Day of the month" required key={form.key("monthDay")} {...form.getInputProps("monthDay")} />
									<Select
										label="Month of the year"
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
