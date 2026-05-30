import { Menu, ActionIcon } from "@mantine/core";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
import { postApiGoalDelete } from "@/api/endpoints/goal/goal.js";

interface GoalMenuProps {
	id: string;
	type: string;
	setActiveMode: (mode: string) => void;
	setActiveForm: (form: string) => void;
	setActiveGoalId: (id: string) => void;
}

export default function GoalMenu({ id, type, setActiveMode, setActiveForm, setActiveGoalId }: GoalMenuProps) {
	const editGoal = async () => {
		setActiveMode("edit");
		setActiveForm(type);
		setActiveGoalId(id);
	};
	const deleteGoal = async () => {
		const response = await postApiGoalDelete({ id: id });
	};

	return (
		<Menu>
			<Menu.Target>
				<ActionIcon variant="subtle" size="sm" aria-label="Open goal actions">
					<IconDots size={16} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item leftSection={<IconPencil size={14} />} onClick={editGoal}>
					Edit
				</Menu.Item>
				<Menu.Item leftSection={<IconTrash size={14} />} color="red" onClick={deleteGoal}>
					Delete
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
