import { Button, Group, Input, SegmentedControl, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm, schemaResolver } from "@mantine/form";
import { postApiGoalCreateNorthStar } from "@/api/endpoints/goal/goal.js";
import { PostApiGoalCreateNorthStarBody } from "@/api/endpoints/goal/goal.zod.js";
import { getErrorMessage } from "@/data/error";
import type { NorthStarCreate } from "@/api/models";

interface NorthStarFormProps {
	flow: "create" | "edit";
	close: () => void;
	setAlert: (alert: string) => void;
	initialValues?: NorthStarCreate;
}

export default function NorthStarForm({ close, setAlert, initialValues }: NorthStarFormProps) {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: initialValues,
		validate: schemaResolver(PostApiGoalCreateNorthStarBody, { sync: true }),
	});

	const handleSubmit = async (values: typeof form.values) => {
		const response = await postApiGoalCreateNorthStar(values);

		if (response.status === 200) {
			close();
		} else {
			setAlert(response.data ?? getErrorMessage(response.status));
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
						label="Justification"
						description="Why do you want to achieve this goal? How is it linked to your values and your identity?"
						placeholder="Be healthy"
						key={form.key("justification")}
						{...form.getInputProps("justification")}
					/>
					<Input.Wrapper label="Importance" description="How important is this goal to you?">
						<SegmentedControl data={["None", "High"]} fullWidth key={form.key("importance")} {...form.getInputProps("importance")} />
					</Input.Wrapper>

					<Group justify="flex-end" mt="md">
						<Button type="submit">Submit</Button>
					</Group>
				</Stack>
			</form>
		</>
	);
}
