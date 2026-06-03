import { Box, Paper, Text, Flex } from "@mantine/core";
import GoalMenu from "@/components/goals/GoalMenu";
import type { ReactElement } from "react";
import { theme } from "@/data/theme.js";
import type { Mode } from "@/pages/Goals";
import type { GoalType } from "@/api/models";

interface GoalCardProps {
	id: string;
	name: string;
	type: GoalType;
	description?: string;
	left: ReactElement;
	right?: ReactElement;
	setActiveMode: (mode: Mode) => void;
	setActiveForm: (form: GoalType) => void;
	setActiveGoalId: (id: string) => void;
}

export default function GoalCard({ id, name, type, description, left, right, setActiveGoalId, setActiveMode, setActiveForm }: GoalCardProps) {
	return (
		<Paper p="sm" withBorder style={{ borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: theme.colors.goal[type] }}>
			<Flex align="center" gap="sm">
				{left}
				<Box flex={1}>
					<Text>{name}</Text>
					<Text size="xs" c="dimmed">
						{description}
					</Text>
				</Box>
				{right}
				<GoalMenu id={id} type={type} setActiveMode={setActiveMode} setActiveForm={setActiveForm} setActiveGoalId={setActiveGoalId} />
			</Flex>
		</Paper>
	);
}
