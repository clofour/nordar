import { Button, Group, Input, SegmentedControl, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm, schemaResolver } from "@mantine/form";
import { createMovement, updateMovement } from "@/api/endpoints/goal/goal";
import { CreateMovementBody, UpdateMovementBody } from "@/api/endpoints/goal/goal.zod";
import { getErrorMessage } from "@/data/error";
import type { MovementCreate } from "@/api/models";
import { NotificationType, useNotification } from "@/helpers";
import { Mode } from "@/pages/Goals";

type MovementFormProps =
	| {
			mode: Mode.Create;
			id?: never;
			parentId: string;
			initialValues?: never;
	  }
	| {
			mode: Mode.Edit;
			id: string;
			parentId?: never;
			initialValues: MovementCreate;
	  };

export default function MovementForm({ mode, id, parentId, initialValues }: MovementFormProps) {
	const notify = useNotification();

	const schema = mode == Mode.Create ? CreateMovementBody : UpdateMovementBody;
	const formSchema = schema.omit({
		bearingId: true,
	});
	const form = useForm({
		mode: "uncontrolled",
		initialValues: initialValues,
		validate: schemaResolver(formSchema, { sync: true }),
	});

	const handleSubmit = async (values: typeof form.values) => {
		const requestData = {
			...values,
			bearingId: parentId,
		};

		let response;
		if (mode == Mode.Create) {
			response = await createMovement(requestData);
		} else {
			response = await updateMovement(id, requestData);
		}

		if (response.status === 200) {
			
		} else {
			notify(NotificationType.Error, response.data ?? getErrorMessage(response.status));
		}
	};

	return (
		<>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput
						label="Name"
						description="What is your goal?"
						placeholder="Go on a 1-hour morning run two times every week"
						required
						key={form.key("name")}
						{...form.getInputProps("name")}
					/>
					<Textarea
						label="Description"
						description="What does your goal consist of? Be specific."
						placeholder="I will wake up at 6 AM on Mondays, Wednesdays and Fridays and go on a 1 hour run to Central Park."
						required
						key={form.key("description")}
						{...form.getInputProps("description")}
					/>
					<Textarea
						label="Difficulty"
						description="How difficult will this goal be? Are you ready to take it on?"
						placeholder="Waking up at 6 AM will be hard, but I'm a bit worried about the run itself too. An hour sounds like a very long time. Regardless, I'm ready to take on the challenge."
						key={form.key("difficulty")}
						{...form.getInputProps("difficulty")}
					/>
					<Input.Wrapper label="Motivation Type" description="What type of motivation will you use?">
						<SegmentedControl data={["Carrot", "Stick"]} fullWidth key={form.key("motivationType")} {...form.getInputProps("motivationType")} />
					</Input.Wrapper>
					<Textarea
						label="Motivation"
						description="How will you motivate yourself?"
						placeholder="I will give $5 to my brother every time I skip the run."
						key={form.key("motivation")}
						{...form.getInputProps("motivation")}
					/>
					<Textarea
						label="Triggers"
						description="How will you remind yourself to work on your goal?"
						placeholder="I will set up an alarm at 5:30 AM and take my shoes out the night before."
						key={form.key("triggers")}
						{...form.getInputProps("triggers")}
					/>
					<Textarea
						label="Temptations"
						description="Will any temptations get in your way? How will you remove these temptations?"
						placeholder="I might get tempted to look at my phone when I wake up. To prevent that, I will place my phone on the other side of the room."
						key={form.key("temptations")}
						{...form.getInputProps("temptations")}
					/>
					<Textarea
						label="Obstacles"
						description="What obstacles will you face while you try to accomplish your goal? How will you face these?"
						placeholder="I could have issues with the weather or travel. If I can't go out, I'll do a 30 minute workout at home to make sure the habit doesn't break. As for travel, I'll make sure to bring my running shoes and pick out a route beforehand."
						key={form.key("obstacles")}
						{...form.getInputProps("obstacles")}
					/>
					<Textarea
						label="Kill Conditions"
						description="When will you stop working on this goal?"
						placeholder="I will give up on this goal if I get injured and a doctor tells me to stop."
						key={form.key("killConditions")}
						{...form.getInputProps("killConditions")}
					/>

					<Group justify="flex-end" mt="md">
						<Button type="submit">Submit</Button>
					</Group>
				</Stack>
			</form>
		</>
	);
}
