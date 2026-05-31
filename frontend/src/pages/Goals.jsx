import { Alert, Stack, Text, Badge, UnstyledButton, Group, Button, Grid, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconStar, IconPlus, IconCompass, IconActivity, IconExclamationCircle } from "@tabler/icons-react";
import PageTitle from "@/components/shared/PageTitle";
import { useMemo, useState } from "react";
import GoalCard from "@/components/goals/GoalCard";
import { theme } from "@/data/theme";
import NorthStarForm from "@/components/goals/NorthStarForm";
import BearingForm from "@/components/goals/BearingForm";
import MovementForm from "@/components/goals/MovementForm";
import { useGetApiGoalGet } from "@/api/endpoints/goal/goal";
import { capitalize } from "@/helpers";

const GoalAddButton = ({ text, type, parentId }) => (
	<UnstyledButton w="100%" onClick={() => onGoalAdd(type, parentId)}>
		<Group gap="md">
			<IconPlus size={12} />
			<Text size="xs" c="dimmed">
				{text}
			</Text>
		</Group>
	</UnstyledButton>
);

export default function Goals() { // TODO: Convert to TypeScript, break down into components and add keys
	const [opened, { open, close }] = useDisclosure(false);
	const [activeGoalId, setActiveGoalId] = useState("");
	const [activeMode, setActiveMode] = useState("create");
	const [activeForm, setActiveForm] = useState("northStar");
	const [activeParentId, setActiveParentId] = useState("");
	const [alert, setAlert] = useState("");

	const onGoalAdd = (type, parentId) => {
		setActiveMode("create");
		setActiveForm(type);
		setActiveParentId(parentId);
		open();
	};

	const { data: response, error, isLoading, mutate } = useGetApiGoalGet();

	const goalIndex = {};
	useMemo(() => {
		const goalHierarchy = ["northStar", "bearing", "movement"];
		const indexGoals = (goals, depth) => {
			const currentDepth = goalHierarchy[depth];
			const nextDepth = goalHierarchy[depth + 1] + "s";

			for (const goal of goals) {
				goalIndex[goal.id] = {
					type: currentDepth,
					goal: goal,
				};

				indexGoals(goal[nextDepth] ?? [], depth + 1);
			}
		};
		indexGoals(response?.data ?? [], 0);
	}, [data.response])


	return (
		<Stack>
			<Group justify="space-between">
				<PageTitle name="Stars" description="Goals, represented as spots in the galaxy." />
				<Button leftSection={<IconPlus size={16} />} onClick={() => onGoalAdd("northStar")}>
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
											type="northStar"
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

										<Stack pl="lg" style={{ borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: theme.colors.goal["northStar"] }}>
											{star.bearings &&
												star.bearings.map((bearing) => (
													<Stack gap="sm">
														<GoalCard
															key={bearing.id}
															id={bearing.id}
															name={bearing.name}
															type="bearing"
															description={bearing.description}
															left={<IconCompass size={14} />}
															setActiveMode={setActiveMode}
															setActiveForm={setActiveForm}
															setActiveGoalId={setActiveGoalId}
														/>

														<Stack
															gap="xs"
															pl="lg"
															style={{ borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: theme.colors.goal["bearing"] }}
														>
															{bearing.movements &&
																bearing.movements.map((movement) => (
																	<GoalCard
																		key={movement.id}
																		id={movement.id}
																		name={movement.name}
																		type="movement"
																		description={movement.description}
																		left={<IconActivity size={14} />}
																		setActiveMode={setActiveMode}
																		setActiveForm={setActiveForm}
																		setActiveGoalId={setActiveGoalId}
																	/>
																))}

															<GoalAddButton text="Add Movement" type="movement" parentId={bearing.id} />
														</Stack>
													</Stack>
												))}

											<GoalAddButton text="Add Bearing" type="bearing" parentId={star.id} />
										</Stack>
									</Stack>
								</Stack>
							))}
					</Stack>
				</Grid.Col>
				<Grid.Col span={9}>
					<Title order={3}>{`${capitalize(activeMode)} ${capitalize(activeForm)}`}</Title>
					<Alert variant="light" color="red" title="Error" icon={<IconExclamationCircle />} hidden={alert === ""}>
						{alert}
					</Alert>
					{activeForm === "northStar" && (
						<NorthStarForm close={close} setAlert={setAlert} initialValues={activeMode == "edit" ? goalIndex[activeGoalId].goal : null} />
					)}
					{activeForm === "bearing" && (
						<BearingForm
							close={close}
							setAlert={setAlert}
							parentId={activeParentId}
							initialValues={activeMode == "edit" ? goalIndex[activeGoalId].goal : null}
						/>
					)}
					{activeForm === "movement" && (
						<MovementForm
							close={close}
							setAlert={setAlert}
							parentId={activeParentId}
							initialValues={activeMode == "edit" ? goalIndex[activeGoalId].goal : null}
							setActiveGoalId={setActiveGoalId}
						/>
					)}
				</Grid.Col>
			</Grid>
		</Stack>
	);
}
