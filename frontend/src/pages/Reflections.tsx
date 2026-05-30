import { useGetApiReflectionList } from "@/api/endpoints/reflection/reflection";
import { getGetApiReflectionListResponseMock } from "@/api/endpoints/reflection/reflection.msw";
import Bar from "@/components/reflections/Bar";
import Stats from "@/components/reflections/Stats";
import PageTitle from "@/components/shared/PageTitle";
import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Reflections() {
    // const { data: response, error, isLoading, mutate } = useGetApiReflectionList();
    const response = getGetApiReflectionListResponseMock();

    const aspects = [
        { label: "Wins", value: "positive" },
        { label: "Challenges", value: "negative" },
        { label: "Next Steps", value: "improvement" }
    ] as const;

    // const reflections = response?.data ?? [];
    const reflections = response ?? [];
    const bars = aspects.map((aspect) => (
        <Bar
            label={aspect.label}
            value={aspect.value}
            reflections={reflections}
        />
    ));

    function onClick() {

    }

    return (
        <Stack>
            <Group justify="space-between">
                <PageTitle name="Reflections" description="TBD" />
                <Button leftSection={<IconPlus size={16} />} onClick={onClick}>New Reflection</Button>
            </Group>
            <Stats />
            <SimpleGrid cols={3} h="100%">
                {bars}
            </SimpleGrid>
        </Stack>
    );
}