import { Button, Group, Input, SegmentedControl, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm, schemaResolver } from "@mantine/form";
import { createNorthStar, updateNorthStar } from "@/api/endpoints/goal/goal";
import { CreateNorthStarBody, UpdateNorthStarBody } from "@/api/endpoints/goal/goal.zod";
import { getErrorMessage } from "@/data/error";
import type { NorthStarCreate } from "@/api/models";
import { NotificationType, useNotification } from "@/helpers";
import { Mode } from "@/pages/Goals";

type NorthStarFormProps =
	| {
			mode: Mode.Create;
			id?: never;
			initialValues?: never;
	  }
	| {
			mode: Mode.Edit;
			id: string;
			initialValues: NorthStarCreate;
	  };

export default function NorthStarForm({ mode, id, initialValues }: NorthStarFormProps) {
	const notify = useNotification();

	const schema = mode == Mode.Create ? CreateNorthStarBody : UpdateNorthStarBody;

	const form = useForm({
		mode: "uncontrolled",
		initialValues: initialValues,
		validate: schemaResolver(schema, { sync: true }),
	});

	const handleSubmit = async (values: typeof form.values) => {
		const response = mode == Mode.Create ? await createNorthStar(values) : await updateNorthStar(id, values);

		if (response.status === 200) {
			close();
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
						placeholder="Be healthy"
						required
						key={form.key("name")}
						{...form.getInputProps("name")}
					/>
					<Textarea
						label="Description"
						description="What does your goal consist of?"
						placeholder="My goal consists of being in good physical shape, getting enough sleep, avoiding stress and eating a healthy diet."
						required
						key={form.key("description")}
						{...form.getInputProps("description")}
					/>
					<Textarea
						label="Justification"
						description="Why do you want to achieve this goal?"
						placeholder="I want to achieve this goal for two reasons. Firstly, my dad passed away at 42 because of a heart attack, and I don't want the same to happen to me. Secondly, being healthy makes me feel better in general."
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
