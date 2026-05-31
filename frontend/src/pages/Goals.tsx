import { Stack, Text, Badge, UnstyledButton, Group, Button, Grid, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconStar, IconPlus, IconCompass, IconActivity, IconExclamationCircle } from "@tabler/icons-react";
import PageTitle from "@/components/shared/PageTitle";
import { useMemo, useState } from "react";
import GoalCard from "@/components/goals/GoalCard";
import { theme } from "@/data/theme";
import NorthStarForm from "@/components/goals/NorthStarForm";
import BearingForm from "@/components/goals/BearingForm";
import MovementForm from "@/components/goals/MovementForm";
import { useGetApiGoalGet, type getApiGoalGetResponse200 } from "@/api/endpoints/goal/goal";
import { capitalize } from "@/helpers";
import { GoalType, type BearingGet, type MovementGet, type NorthStarGet } from "@/api/models";

export enum Mode {
	Create = "Create",
	Edit = "Edit"
}

type GoalIndexEntry =
	| { type: typeof GoalType.NorthStar; goal: NorthStarGet }
	| { type: typeof GoalType.Bearing; goal: BearingGet }
	| { type: typeof GoalType.Movement; goal: MovementGet };

interface GoalAddButtonProps {
	onGoalAdd: (type: GoalType, parentId: string) => void;
	text: string;
	type: GoalType;
	parentId: string;
}

const GoalAddButton = ({ onGoalAdd, text, type, parentId }: GoalAddButtonProps) => (
	<UnstyledButton w="100%" onClick={() => onGoalAdd(type, parentId)}>
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
	const [opened, { open, close }] = useDisclosure(false);
	const [activeGoalId, setActiveGoalId] = useState("");
	const [activeMode, setActiveMode] = useState<Mode>(Mode.Create);
	const [activeForm, setActiveForm] = useState<GoalType>(GoalType.NorthStar);
	const [activeParentId, setActiveParentId] = useState<string | undefined>("");

	const onGoalAdd = (type: GoalType, parentId?: string) => {
		setActiveMode(Mode.Create);
		setActiveForm(type);
		setActiveParentId(parentId);
		open();
	};

	const { data: response, error, isLoading, mutate } = useGetApiGoalGet();

	const goalIndex: Record<string, GoalIndexEntry> = {};
	useMemo(() => {
		for (const northStar of response?.data ?? []) {
			goalIndex[northStar.id] = { type: GoalType.NorthStar, goal: northStar }

			for (const bearing of northStar.bearings) {
				goalIndex[bearing.id] = { type: GoalType.NorthStar, goal: northStar }

				for (const movement of bearing.movements) {
					goalIndex[movement.id] = { type: GoalType.NorthStar, goal: northStar }
				}

			}
		}
	}, [response?.data]);

	return (
		<Stack>
			<Group justify="space-between">
				<PageTitle name="Stars" description="Goals, represented as spots in the galaxy." />
				<Button leftSection={<IconPlus size={16} />} onClick={() => onGoalAdd(GoalType.NorthStar)}>
					New North Star
				</Button>
			</Group>

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
											setActiveMode={setActiveMode}
											setActiveForm={setActiveForm}
											setActiveGoalId={setActiveGoalId}
										/>

										<Stack pl="lg" style={{ borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: theme.colors.goal[GoalType.NorthStar] }}>
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
															setActiveMode={setActiveMode}
															setActiveForm={setActiveForm}
															setActiveGoalId={setActiveGoalId}
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
																		setActiveMode={setActiveMode}
																		setActiveForm={setActiveForm}
																		setActiveGoalId={setActiveGoalId}
																	/>
																))}

															<GoalAddButton onGoalAdd={onGoalAdd} text="Add Movement" type={GoalType.Movement} parentId={bearing.id} />
														</Stack>
													</Stack>
												))}

											<GoalAddButton onGoalAdd={onGoalAdd} text="Add Bearing" type={GoalType.Bearing} parentId={star.id} />
										</Stack>
									</Stack>
								</Stack>
							))}
					</Stack>
				</Grid.Col>
				<Grid.Col span={9}>
					<Title order={3}>{`${capitalize(activeMode)} ${capitalize(activeForm)}`}</Title>
					{activeForm === GoalType.NorthStar && (
						<NorthStarForm mode={activeMode} close={close} initialValues={activeMode == Mode.Edit ? goalIndex[activeGoalId]?.goal as NorthStarGet : undefined} />
					)}
					{activeForm === GoalType.Bearing && (
						<BearingForm
							close={close}
							parentId={activeParentId!}
							initialValues={activeMode == Mode.Edit ? goalIndex[activeGoalId]?.goal as BearingGet : undefined}
						/>
					)}
					{activeForm === GoalType.Movement && (
						<MovementForm
							close={close}
							parentId={activeParentId!}
							initialValues={activeMode == Mode.Edit ? goalIndex[activeGoalId]?.goal as MovementGet : undefined}
						/>
					)}
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
