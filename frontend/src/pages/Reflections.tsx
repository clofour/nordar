import { useGetApiReflectionList } from "@/api/endpoints/reflection/reflection";
import { getGetApiReflectionListResponseMock } from "@/api/endpoints/reflection/reflection.msw";
import Bar from "@/components/reflections/Bar";
import ReflectionForm from "@/components/reflections/ReflectionForm";
import Stats from "@/components/reflections/Stats";
import PageTitle from "@/components/shared/PageTitle";
import { Button, Group, Modal, SimpleGrid, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

export default function Reflections() {
	const [opened, { open, close }] = useDisclosure(false);

	// const { data: response, error, isLoading, mutate } = useGetApiReflectionList();
	const response = getGetApiReflectionListResponseMock();

	const aspects = [
		{ label: "Wins", value: "positive" },
		{ label: "Challenges", value: "negative" },
		{ label: "Next Steps", value: "improvement" },
	] as const;

	// const reflections = response?.data ?? [];
	const reflections = response ?? [];
	const bars = aspects.map((aspect) => <Bar key={aspect.value} label={aspect.label} value={aspect.value} reflections={reflections} />);

	return (
		<Stack>
			<Group justify="space-between">
				<PageTitle name="Reflections" description="TBD" />
				<Button leftSection={<IconPlus size={16} />} onClick={() => open()}>
					New Reflection
				</Button>
			</Group>

			<Modal opened={opened} onClose={close} title={`Create Reflection`}>
				<ReflectionForm flow="create" close={close} />
			</Modal>

			<Stats />
			<SimpleGrid cols={3} h="100%">
				{bars}
			</SimpleGrid>
		</Stack>
	);
}
