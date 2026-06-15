import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm, schemaResolver } from "@mantine/form";
import { createBearing, updateBearing } from "@/api/endpoints/goal/goal";
import { CreateBearingBody, UpdateBearingBody } from "@/api/endpoints/goal/goal.zod";
import { getErrorMessage } from "@/data/error";
import type { BearingCreate } from "@/api/models";
import { NotificationType, useNotification } from "@/helpers";
import { Mode } from "@/pages/Goals";

type BearingFormProps =
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
			initialValues: BearingCreate;
	  };

export default function BearingForm({ mode, id, parentId, initialValues }: BearingFormProps) {
	const notify = useNotification();

	const schema = mode == Mode.Create ? CreateBearingBody : UpdateBearingBody;
	const formSchema = schema.omit({
		northStarId: true,
	});
	const form = useForm({
		mode: "uncontrolled",
		initialValues: initialValues,
		validate: schemaResolver(formSchema, { sync: true }),
	});

	const handleSubmit = async (values: typeof form.values) => {
		const requestData = {
			...values,
			northStarId: parentId,
		};

		let response;
		if (mode == Mode.Create) {
			response = await createBearing(requestData);
		} else {
			response = await updateBearing(id, requestData);
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
						placeholder="Be in good physical shape"
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
						description="How does this goal help you achieve your ideal self? Include research."
						placeholder="Regular physical activity improves cardiovascular health, metabolic function, mental health and musculoskeletal strength."
						key={form.key("justification")}
						{...form.getInputProps("justification")}
					/>
					<Textarea
						label="Strengths"
						description="What are your strengths in this area?"
						placeholder="I already do a lot of walking, so I'm used to physical activity."
						required
						key={form.key("strengths")}
						{...form.getInputProps("strengths")}
					/>
					<Textarea
						label="Weaknesses"
						description="What are your weaknesses in this area?"
						placeholder="I struggle a lot with consistency. If I miss a single session or I can't do one of the exercises, I give up entirely."
						required
						key={form.key("weaknesses")}
						{...form.getInputProps("weaknesses")}
					/>

					<Group justify="flex-end" mt="md">
						<Button type="submit">Submit</Button>
					</Group>
				</Stack>
			</form>
		</>
	);
}
