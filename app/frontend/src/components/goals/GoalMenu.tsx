import { Menu, ActionIcon } from "@mantine/core";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
import { deleteGoal } from "@/api/endpoints/goal/goal";
import type { GoalType } from "@/api/models";
import { Mode } from "@/pages/Goals";

interface GoalMenuProps {
	id: string;
	type: GoalType;
	setActiveMode: (mode: Mode) => void;
	setActiveForm: (form: GoalType) => void;
	setActiveGoalId: (id: string) => void;
}

export default function GoalMenu({ id, type, setActiveMode, setActiveForm, setActiveGoalId }: GoalMenuProps) {
	const onEditGoalClick = async () => {
		setActiveMode(Mode.Edit);
		setActiveForm(type);
		setActiveGoalId(id);
	};
	const onDeleteGoalClick = async () => {
		const response = await deleteGoal({ 
			id: id,
			goalType: type,
		});
	};

	return (
		<Menu>
			<Menu.Target>
				<ActionIcon variant="subtle" size="sm" aria-label="Open goal actions">
					<IconDots size={16} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item leftSection={<IconPencil size={14} />} onClick={onEditGoalClick}>
					Edit
				</Menu.Item>
				<Menu.Item leftSection={<IconTrash size={14} />} color="red" onClick={onDeleteGoalClick}>
					Delete
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
