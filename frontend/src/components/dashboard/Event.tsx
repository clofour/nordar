import { Paper, Group, Text, Checkbox } from "@mantine/core";
import type { ScheduleEventData } from "@mantine/schedule";
import { useState } from "react";

interface EventProps {
    event: ScheduleEventData;
}

export default function Event({ event }: EventProps) {
    const [checked, setChecked] = useState(false);

    const onChange = (hi) => {
        console.log(hi)
    }

    return (
        <Paper key={ event.title } p="sm" withBorder >
            <Group>
                <Checkbox onChange={onChange} radius = "xl" />
                <Text size="sm">{event.title}</Text>
            </Group>
        </Paper>
    );
}
