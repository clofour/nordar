import { Stack, Text, Badge, UnstyledButton, Group, Button, Grid, Title, Card, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconStar, IconPlus, IconCompass, IconActivity } from "@tabler/icons-react";
import PageTitle from "@/components/shared/PageTitle";
import { useMemo, useState } from "react";
import GoalCard from "@/components/goals/GoalCard";
import { theme } from "@/data/theme";
import NorthStarForm from "@/components/goals/NorthStarForm";
import BearingForm from "@/components/goals/BearingForm";
import MovementForm from "@/components/goals/MovementForm";
import { useListGoals } from "@/api/endpoints/goal/goal";
import { capitalize } from "@/helpers";
import { GoalType, type BearingGet, type MovementGet, type NorthStarGet } from "@/api/models";
import DataStateWrapper from "@/components/shared/DataStateWrapper";

export enum Mode {
	Create = "Create",
	Edit = "Edit",
}

export type EditorState =
	| { mode: Mode.Create; type: typeof GoalType.NorthStar; id?: never }
	| { mode: Mode.Create; type: typeof GoalType.Bearing; id?: never; parentId: string }
	| { mode: Mode.Create; type: typeof GoalType.Movement; id?: never; parentId: string }
	| { mode: Mode.Edit; type: typeof GoalType.NorthStar; id: string }
	| { mode: Mode.Edit; type: typeof GoalType.Bearing; id: string }
	| { mode: Mode.Edit; type: typeof GoalType.Movement; id: string };

type GoalIndexEntry =
	| { type: typeof GoalType.NorthStar; goal: NorthStarGet }
	| { type: typeof GoalType.Bearing; goal: BearingGet }
	| { type: typeof GoalType.Movement; goal: MovementGet };

interface GoalAddButtonProps {
	onGoalAdd: () => void;
	text: string;
}

const GoalAddButton = ({ onGoalAdd, text }: GoalAddButtonProps) => (
	<UnstyledButton w="100%" onClick={onGoalAdd}>
		<Group gap="md">
			<IconPlus size={12} />
			<Text size="xs" c="dimmed">
				{text}
			</Text>
		</Group>
	</UnstyledButton>
);

export default function Goals() {
	// TODO: Convert to TypeScript, break down into components and add keys
	const [editorState, setEditorState] = useState<EditorState>({
		mode: Mode.Create,
		type: GoalType.NorthStar,
	});

	const { data: response, error, isLoading, mutate } = useListGoals();
	const goals = response?.data ?? [];

	const goalIndex = useMemo(() => {
		const index: Record<string, GoalIndexEntry> = {};

		for (const northStar of goals) {
			index[northStar.id] = { type: GoalType.NorthStar, goal: northStar };

			for (const bearing of northStar.bearings) {
				index[bearing.id] = { type: GoalType.Bearing, goal: bearing };

				for (const movement of bearing.movements) {
					index[movement.id] = { type: GoalType.Movement, goal: movement };
				}
			}
		}

		return index;
	}, [response?.data]);

	const renderForm = (editorState: EditorState) => {
		if (editorState.mode == Mode.Create) {
			switch (editorState.type) {
				case GoalType.NorthStar:
					return <NorthStarForm key={editorState.id} mode={Mode.Create} />;
				case GoalType.Bearing:
					return <BearingForm key={editorState.id} mode={Mode.Create} parentId={editorState.parentId} />;
				case GoalType.Movement:
					return <MovementForm key={editorState.id} mode={Mode.Create} parentId={editorState.parentId} />;
			}
		}

		if (editorState.mode == Mode.Edit) {
			const entry = goalIndex[editorState.id];
			switch (editorState.type) {
				case GoalType.NorthStar:
					if (entry?.type != editorState.type) return null;
					return <NorthStarForm key={editorState.id} mode={Mode.Edit} id={editorState.id} initialValues={entry.goal} />;
				case GoalType.Bearing:
					if (entry?.type != editorState.type) return null;
					return <BearingForm key={editorState.id} mode={Mode.Edit} id={editorState.id} initialValues={entry.goal} />;
				case GoalType.Movement:
					if (entry?.type != editorState.type) return null;
					return <MovementForm key={editorState.id} mode={Mode.Edit} id={editorState.id} initialValues={entry.goal} />;
			}
		}
	};

	return (
		<Stack>
			<Group justify="space-between">
				<PageTitle name="Stars" description="Goals, represented as spots in the galaxy." />
				<Button leftSection={<IconPlus size={16} />} onClick={() => setEditorState({ mode: Mode.Create, type: GoalType.NorthStar })}>
					New North Star
				</Button>
			</Group>

			<DataStateWrapper isLoading={isLoading} isEmpty={false}>
				<Grid>
					<Grid.Col span={3}>
						<Stack gap="sm">
							{response &&
								response.data.map((star) => (
									<Stack>
										<Stack>
											<GoalCard
												key={star.id}
												id={star.id}
												name={star.name}
												type={GoalType.NorthStar}
												description={star.description}
												left={<IconStar size={16} />}
												right={
													<Badge variant="light" color={theme.colors.priority[star.importance]}>
														{star.importance}
													</Badge>
												}
												setEditorState={setEditorState}
											/>

											<Stack
												pl="lg"
												style={{ borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: theme.colors.goal[GoalType.NorthStar] }}
											>
												{star.bearings &&
													star.bearings.map((bearing) => (
														<Stack gap="sm">
															<GoalCard
																key={bearing.id}
																id={bearing.id}
																name={bearing.name}
																type={GoalType.Bearing}
																description={bearing.description}
																left={<IconCompass size={14} />}
																setEditorState={setEditorState}
															/>

															<Stack
																gap="xs"
																pl="lg"
																style={{ borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: theme.colors.goal[GoalType.Bearing] }}
															>
																{bearing.movements &&
																	bearing.movements.map((movement) => (
																		<GoalCard
																			key={movement.id}
																			id={movement.id}
																			name={movement.name}
																			type={GoalType.Movement}
																			left={<IconActivity size={14} />}
																			setEditorState={setEditorState}
																		/>
																	))}

																<GoalAddButton
																	onGoalAdd={() => setEditorState({ mode: Mode.Create, type: GoalType.Movement, parentId: bearing.id })}
																	text="Add Movement"
																/>
															</Stack>
														</Stack>
													))}

												<GoalAddButton
													onGoalAdd={() => setEditorState({ mode: Mode.Create, type: GoalType.Bearing, parentId: star.id })}
													text="Add Bearing"
												/>
											</Stack>
										</Stack>
										<GoalAddButton onGoalAdd={() => setEditorState({ mode: Mode.Create, type: GoalType.NorthStar })} text="Add North Star" />
									</Stack>
								))}
						</Stack>
					</Grid.Col>
					<Grid.Col span={9}>
						<Paper p="md" withBorder>
							<Title order={3}>{`${capitalize(editorState.mode)} ${capitalize(editorState.type)}`}</Title>
							{renderForm(editorState)}
						</Paper>
					</Grid.Col>
				</Grid>
			</DataStateWrapper>
		</Stack>
	);
}
