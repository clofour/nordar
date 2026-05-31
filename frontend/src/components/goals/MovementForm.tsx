import { Button, Group, Input, SegmentedControl, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm, schemaResolver } from "@mantine/form";
import { postApiGoalCreateMovement } from "@/api/endpoints/goal/goal.js";
import { PostApiGoalCreateMovementBody } from "@/api/endpoints/goal/goal.zod.js";
import { getErrorMessage } from "@/data/error";
import type { MovementCreate } from "@/api/models";
import { NotificationType, useNotification } from "@/helpers";

interface MovementFormProps {
	close: () => void;
	parentId: string;
	initialValues?: MovementCreate | undefined;
}

export default function MovementForm({ close, parentId, initialValues }: MovementFormProps) {
	const notify = useNotification();

	const formSchema = PostApiGoalCreateMovementBody.omit({
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
		const response = await postApiGoalCreateMovement(requestData);

		if (response.status === 200) {
			close();
		} else {
			notify(NotificationType.Error, response.data ?? getErrorMessage(response.status))
		}
	};

	return (
		<>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput
						label="Name"
						description="What is your goal?"
						placeholder="Be healthy"
						required
						key={form.key("name")}
						{...form.getInputProps("name")}
					/>
					<Textarea
						label="Description"
						description="What does your goal consist of?"
						placeholder="Be healthy"
						required
						key={form.key("description")}
						{...form.getInputProps("description")}
					/>
					<Textarea
						label="Difficulty"
						description="How difficult will this goal be? Are you ready to take it on?"
						placeholder="Be healthy"
						key={form.key("difficulty")}
						{...form.getInputProps("difficulty")}
					/>
					<Input.Wrapper label="Motivation Type" description="What type of motivation will you use?">
						<SegmentedControl data={["Carrot", "Stick"]} fullWidth key={form.key("motivationType")} {...form.getInputProps("motivationType")} />
					</Input.Wrapper>
					<Textarea
						label="Motivation"
						description="How will you motivate yourself?"
						placeholder="Be healthy"
						key={form.key("motivation")}
						{...form.getInputProps("motivation")}
					/>
					<Textarea
						label="Triggers"
						description="How will you remind yourself to work on your goal?"
						placeholder="Be healthy"
						key={form.key("triggers")}
						{...form.getInputProps("triggers")}
					/>
					<Textarea
						label="Temptations"
						description="Will any temptations get in your way? How will you remove these temptations?"
						placeholder="Be healthy"
						key={form.key("temptations")}
						{...form.getInputProps("temptations")}
					/>
					<Textarea
						label="Obstacles"
						description="What obstacles will you face while you try to accomplish your goal? How will you face these?"
						placeholder="Be healthy"
						key={form.key("obstacles")}
						{...form.getInputProps("obstacles")}
					/>
					<Textarea
						label="Kill Conditions"
						description="When will you stop working on this goal?"
						placeholder="Be healthy"
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
