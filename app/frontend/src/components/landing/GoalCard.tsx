import { Group } from "@mantine/core";
import classes from "./GoalCard.module.css";
import type { GoalType } from "@/api/models";
import { IconStarFilled } from "@tabler/icons-react";

type GoalCardProps = {
    type: GoalType;
};

export default function GoalCard({ type }: GoalCardProps) {
    return (
        <div className={classes.card}>
            <Group>
                <IconStarFilled />
                <span>HELO</span>
            </Group>
        </div>
    );
}
