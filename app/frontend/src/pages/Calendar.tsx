import EventForm from "@/components/calendar/EventForm";
import Schedule from "@/components/calendar/Schedule";
import PageTitle from "@/components/shared/PageTitle";
import { capitalize } from "@/helpers";
import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export default function Calendar() {
	const [opened, { open, close }] = useDisclosure(false);
	const [activeMode, setActiveMode] = useState("create");

	return (
		<>
			<Group justify="space-between">
				<PageTitle name="Calendar" description="Track your movements." />
				<Button leftSection={<IconPlus size={16} />} onClick={() => open()}>
					New Event
				</Button>
			</Group>

			<Modal opened={opened} onClose={close} title={`${capitalize(activeMode)} Event`}>
				<EventForm close={close} />
			</Modal>

			<Schedule />
		</>
	);
}
