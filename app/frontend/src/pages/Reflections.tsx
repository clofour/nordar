import { useListReflections } from "@/api/endpoints/reflection/reflection";
import Bar from "@/components/reflections/Bar";
import ReflectionForm from "@/components/reflections/ReflectionForm";
import Stats from "@/components/reflections/Stats";
import DataStateWrapper from "@/components/shared/DataStateWrapper";
import PageTitle from "@/components/shared/PageTitle";
import { Button, Group, Modal, SimpleGrid, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowNarrowRight, IconMinus, IconNotes, IconPlus } from "@tabler/icons-react";

export default function Reflections() {
	const [opened, { open, close }] = useDisclosure(false);

	const { data: response, error, isLoading, mutate } = useListReflections();
	const reflections = response?.data ?? [];

	const aspects = [
		{ label: "Wins", value: "positive", Icon: IconPlus },
		{ label: "Challenges", value: "negative", Icon: IconMinus },
		{ label: "Next Steps", value: "improvement", Icon: IconArrowNarrowRight },
	] as const;

	return (
		<Stack>
			<Group justify="space-between">
				<PageTitle name="Reflections" description="Identify what's working, what isn't, and what to do differently." />
				<Button leftSection={<IconPlus size={16} />} onClick={() => open()}>
					New Reflection
				</Button>
			</Group>

			<Modal opened={opened} onClose={close} title={`Create Reflection`}>
				<ReflectionForm flow="create" close={close} />
			</Modal>

			<DataStateWrapper
				isLoading={isLoading}
				isEmpty={reflections.length == 0}
				emptyProps={{
					Icon: IconNotes,
					text: "No reflections yet",
					description: "All your reflections will be shown here. Create your first reflection.",
					cta: "Add reflection",
					onCtaClick: open,
				}}
			>
				<Stats />
				<SimpleGrid cols={3} h="100%">
					{aspects.map((aspect) => (
						<Bar key={aspect.value} reflections={reflections} {...aspect} />
					))}
				</SimpleGrid>
			</DataStateWrapper>
		</Stack>
	);
}
