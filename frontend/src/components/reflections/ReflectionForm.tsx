import type { ReactNode } from "react";
import { Box, Button, Group, Input, Stack, Text, Textarea, TextInput, UnstyledButton } from "@mantine/core";
import { useForm, schemaResolver, type UseFormReturnType } from "@mantine/form";
import type { ReflectionCreate } from "@/api/models";
import { PostApiReflectionCreateBody } from "@/api/endpoints/reflection/reflection.zod";
import { postApiReflectionCreate } from "@/api/endpoints/reflection/reflection";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface ReflectionFormProps {
    flow: "create" | "edit";
    close: () => void;
    initialValues?: ReflectionCreate;
}

interface AddButtonProps {
    form: UseFormReturnType<any>;
    type: string;
    text: string;
}

interface RemoveButtonProps {
    form: UseFormReturnType<any>;
    type: string;
    index: number;
    field: ReactNode;
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
    )
}

function RemoveButton({ form, type, index, field }: RemoveButtonProps) {
    return (
        <Group w="100%" gap="xs">
            <Box w="12">
                <UnstyledButton onClick={() => form.removeListItem(type, index)}>
                    <IconMinus size={12} />
                </UnstyledButton>
            </Box>
            <Box style={{ flex: 1 }}>
                {field}
            </Box>
        </Group>

    )
}

export default function ReflectionForm({ close, initialValues }: ReflectionFormProps) {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: initialValues ?? {
            positive: [],
            negative: [],
            improvement: []
        },
        validate: schemaResolver(PostApiReflectionCreateBody, { sync: true }),
    });

    const handleSubmit = async (values: typeof form.values) => {
        const response = await postApiReflectionCreate(values);

        if (response.status === 200) {
            close();
        } else {
            console.log("Error");
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

                    <Input.Wrapper
                        label="Wins"
                        description="What went well?"
                        required
                    >
                        <Stack gap="xs" mt="4">
                            {form.getValues().positive.map((item, index) => (
                                <RemoveButton
                                    key={index}
                                    form={form}
                                    type="positive"
                                    index={index}
                                    field={
                                        <TextInput
                                            placeholder="Be healthy"
                                            key={form.key(`positive.${index}`)}
                                            {...form.getInputProps(`positive.${index}`)}
                                            w="100%"
                                        />
                                    }
                                />

                            ))}
                            <AddButton
                                form={form}
                                type="positive"
                                text="Add positive"
                            />
                        </Stack>
                    </Input.Wrapper>

                    <Textarea
                        label="Challenges"
                        description="What went wrong?"
                        placeholder="Be healthy"
                        required
                        key={form.key("negative")}
                        {...form.getInputProps("negative")}
                    />
                    <Textarea
                        label="Next Steps"
                        description="What could have been even better?"
                        placeholder="Be healthy"
                        required
                        key={form.key("improvement")}
                        {...form.getInputProps("improvement")}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </Stack>
            </form>
        </>
    );
}
