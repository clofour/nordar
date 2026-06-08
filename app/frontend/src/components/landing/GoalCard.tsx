import classes from "./GoalCard.module.css";
import { GoalType } from "@/api/models";
import { IconStarFilled } from "@tabler/icons-react";
import Card from "./Card";
import { Group } from "@mantine/core";

type GoalCardProps = {
    type: GoalType;
    text: string;
};

export default function GoalCard({ type, text }: GoalCardProps) {
    const cardTypes = {
        [GoalType.NorthStar]: {
            icon: <IconStarFilled />,
            color: "#ffe6b0",
            border: "rgba(255, 210, 122, 0.32)",
            shadow: "0 0 40px -10px rgba(255, 210, 122, 0.4)"
        },
        [GoalType.Bearing]: {
            icon: <IconStarFilled />,
            color: "#ffffff",
            border: "rgba(134, 164, 255, 0.55)",
            shadow: "0 0 40px -10px rgba(255, 210, 122, 0.4)"
        },
        [GoalType.Movement]: {
            icon: <IconStarFilled />,
            color: "#ffffff",
            border: "rgba(95, 230, 195, 0.22)",
            shadow: "0 0 40px -10px rgba(255, 210, 122, 0.4)"
        }
    }

    const cardType = cardTypes[type];

    return (
        <Card color={cardType.color} border={`1px solid ${cardType.border}`} shadow={cardType.shadow}>
            <Group>
                {cardType.icon}
                <span className={classes.title}>{text}</span>
            </Group>
        </Card>
    );
}
