import { Box, Paper, Text, Flex } from "@mantine/core";
import GoalMenu from "@/components/goals/GoalMenu";
import type { ReactElement } from "react";
import { theme } from "@/data/theme";
import type { EditorState, Mode } from "@/pages/Goals";
import type { GoalType } from "@/api/models";

interface GoalCardProps {
	id: string;
	name: string;
	type: GoalType;
	description?: string;
	left: ReactElement;
	right?: ReactElement;
	setEditorState: (editorState: EditorState) => void;
}

export default function GoalCard({ id, name, type, description, left, right, setEditorState }: GoalCardProps) {
	return (
		<Paper p="sm" withBorder style={{ borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: theme.colors.goal[type] }}>
			<Flex align="center" gap="sm">
				{left}
				<Box flex="1 1 0" miw="0">
					<Text truncate="end">{name}</Text>
					<Text size="xs" c="dimmed" truncate="end">
						{description}
					</Text>
				</Box>
				{right}
				<GoalMenu id={id} type={type} setEditorState={setEditorState} />
			</Flex>
		</Paper>
	);
}
