import type { ReactNode } from "react";
import { Box, Button, Group, Input, Stack, Text, Textarea, TextInput, UnstyledButton } from "@mantine/core";
import { useForm, schemaResolver, type UseFormReturnType } from "@mantine/form";
import type { ReflectionCreate } from "@/api/models";
import { CreateReflectionBody } from "@/api/endpoints/reflection/reflection.zod";
import { createReflection } from "@/api/endpoints/reflection/reflection";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { NotificationType, useNotification } from "@/helpers";
import { getErrorMessage } from "@/data/error";

interface ReflectionFormProps {
	flow: "create" | "edit";
	close: () => void;
	initialValues?: ReflectionCreate;
}

interface AddButtonProps {
	form: UseFormReturnType<ReflectionCreate>;
	type: string;
	text: string;
}

interface RemoveButtonProps {
	form: UseFormReturnType<ReflectionCreate>;
	type: string;
	index: number;
	field: ReactNode;
}

interface InputGroupProps {
	form: UseFormReturnType<ReflectionCreate>;
	type: "positive" | "negative" | "improvement";
	label: string;
	description: string;
}

function AddButton({ form, type, text }: AddButtonProps) {
	return (
		<UnstyledButton w="100%" onClick={() => form.insertListItem(type, "")}>
			<Group gap="xs">
				<Box w="12">
					<IconPlus size={12} />
				</Box>
				<Text size="xs" c="dimmed">
					{text}
				</Text>
			</Group>
		</UnstyledButton>
	);
}

function RemoveButton({ form, type, index, field }: RemoveButtonProps) {
	return (
		<Group w="100%" gap="xs">
			<Box w="12">
				<UnstyledButton onClick={() => form.removeListItem(type, index)}>
					<IconMinus size={12} />
				</UnstyledButton>
			</Box>
			<Box style={{ flex: 1 }}>{field}</Box>
		</Group>
	);
}

function InputGroup({ form, type, label, description }: InputGroupProps) {
	return (
		<Input.Wrapper label={label} description={description} required>
			<Stack gap="xs" mt="4">
				{form.getValues()[type].map((_, index) => (
					<RemoveButton
						key={index}
						form={form}
						type={type}
						index={index}
						field={<TextInput placeholder="Be healthy" key={form.key(`${type}.${index}`)} {...form.getInputProps(`${type}.${index}`)} w="100%" />}
					/>
				))}
				<AddButton form={form} type={type} text={`Add ${type}`} />
			</Stack>
		</Input.Wrapper>
	);
}

export default function ReflectionForm({ close, initialValues }: ReflectionFormProps) {
	const notify = useNotification();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: initialValues ?? {
			positive: [""],
			negative: [""],
			improvement: [""],
		},
		validate: schemaResolver(CreateReflectionBody, { sync: true }),
	});

	const handleSubmit = async (values: typeof form.values) => {
		const processableKeys = ["positive", "negative", "improvement"] as const;
		const processedValues: Partial<typeof form.values> = {};

		for (const processableKey of processableKeys) {
			const processedValue = [];

			for (const value of values[processableKey]) {
				const trimmedValue = value.trim();

				console.log(trimmedValue);
				if (trimmedValue != "") {
					processedValue.push(trimmedValue);
				}
			}

			processedValues[processableKey] = processedValue;
		}

		const response = await createReflection({
			...values,
			...processedValues,
		});

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
					<InputGroup form={form} type="positive" label="Wins" description="What went well?" />

					<InputGroup form={form} type="negative" label="Challenges" description="What could have been even better?" />

					<InputGroup form={form} type="improvement" label="Next Steps" description="What will you do next time?" />

					<Group justify="flex-end" mt="md">
						<Button type="submit">Submit</Button>
					</Group>
				</Stack>
			</form>
		</>
	);
}
