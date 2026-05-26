import { Alert, Box, Stack, Modal, Paper, Text, Flex, Badge, Menu, ActionIcon, UnstyledButton, Group, Button, Grid, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconStar, IconDots, IconPencil, IconTrash, IconPlus, IconCompass, IconActivity } from "@tabler/icons-react";
import PageTitle from "@/components/shared/PageTitle";
import { useEffect, useState } from "react";
import GoalCard from "@/components/goals/GoalCard";
import { theme } from "@/data/theme";
import CreateNorthStarForm from "@/components/goals/NorthStarForm";
import CreateBearingForm from "@/components/goals/BearingForm";
import { useGetApiGoalGet } from "@/api/endpoints/goal/goal";
import { IconExclamationCircle } from "@tabler/icons-react";
import CreateMovementForm from "@/components/goals/MovementForm";
import { capitalize } from "@/helpers";

export default function Goals() {
  const [opened, { open, close }] = useDisclosure(false);
  const [activeGoal, setActiveGoal] = useState("");
  const [activeForm, setActiveForm] = useState("star");
  const [activeMode, setActiveMode] = useState("create");
  const [activeParentId, setActiveParentId] = useState("");
  const [alert, setAlert] = useState("");

  const onGoalAdd = (type, parentId) => {
    setActiveForm(type);
    setActiveParentId(parentId);
    open();
  }

  const GoalAddButton = ({ text, type, parentId }) => (
    <UnstyledButton w="100%" onClick={() => onGoalAdd(type, parentId)}>
      <Group gap="md">
        <IconPlus size={12} />
        <Text size="xs" c="dimmed">{text}</Text>
      </Group>
    </UnstyledButton>
  )

  const { data: response, error, isLoading, mutate } = useGetApiGoalGet();

  const flattenGoals = (goals) => {
    return goals.flatMap((goal) => {
      
    })
  }

  return (
    <Stack>
      <Group justify="space-between">
        <PageTitle name="Stars" description="Goals, represented as spots in the galaxy." />
        <Button leftSection={<IconPlus size={16} />} onClick={() => onGoalAdd("star")}>New North Star</Button>
      </Group>

      <Grid>
        <Grid.Col span={3}>
          <Stack gap="sm">
            {response && response.data.map((star) => (
              <Stack>
                <Stack>
                  <GoalCard
                    key={star.id}
                    id={star.id}
                    name={star.name}
                    type="star"
                    description={star.description}
                    left={<IconStar size={16} />}
                    right={<Badge variant="light"
                      color={theme.colors.priority[star.importance]}>{star.importance}</Badge>}
                  />

                  <Stack pl="lg" style={{ borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: theme.colors.goal["star"] }}>
                    {star.bearings && star.bearings.map((bearing) =>
                    (
                      <Stack gap="sm">
                        <GoalCard
                          key={bearing.id}
                          id={bearing.id}
                          name={bearing.name}
                          type="bearing"
                          description={bearing.description}
                          left={<IconCompass size={14} />}
                        />

                        <Stack gap="xs" pl="lg" style={{ borderLeftWidth: "2px", borderLeftStyle: "solid", borderLeftColor: theme.colors.goal["bearing"] }}>
                          {bearing.movements && bearing.movements.map((movement) =>
                          (
                            <GoalCard
                              key={movement.id}
                              id={movement.id}
                              name={movement.name}
                              type="movement"
                              description={movement.description}
                              left={<IconActivity size={14} />}
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
          <Title order={3}>{`${capitalize(activeMode)} Goal`}</Title>
          <Alert variant="light" color="red" title="Error" icon={<IconExclamationCircle />} hidden={alert === ""}>{alert}</Alert>
          {activeForm === "star" && <CreateNorthStarForm close={close} setAlert={setAlert} initialValues={mode == "edit" ? } />}
          {activeForm === "bearing" && <CreateBearingForm close={close} setAlert={setAlert} parentId={activeParentId} />}
          {activeForm === "movement" && <CreateMovementForm close={close} setAlert={setAlert} parentId={activeParentId} />}
        </Grid.Col>
      </Grid>
    </Stack>
  );
}