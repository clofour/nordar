import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm, schemaResolver } from "@mantine/form";
import type { ReflectionCreate } from "@/api/models";
import { PostApiReflectionCreateBody } from "@/api/endpoints/reflection/reflection.zod";
import { postApiReflectionCreate } from "@/api/endpoints/reflection/reflection";

interface ReflectionFormProps {
    flow: "create" | "edit";
    close: () => void;
    initialValues?: ReflectionCreate;
}

export default function ReflectionForm({ close, initialValues }: ReflectionFormProps) {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: initialValues,
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
                    <Textarea
                        label="Wins"
                        description="What went well?"
                        placeholder="Be healthy"
                        required
                        key={form.key("positive")}
                        {...form.getInputProps("positive")}
                    />
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
