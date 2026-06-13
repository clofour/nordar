import classes from "./GoalCard.module.css";
import { GoalType } from "@/api/models";
import { IconActivity, IconCompass, IconStarFilled } from "@tabler/icons-react";
import Card from "./Card";
import { Group } from "@mantine/core";

type GoalCardProps = React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement> | undefined;
	type: GoalType;
	text: string;
};

export default function GoalCard({ ref, type, text, ...other }: GoalCardProps) {
	const cardTypes = {
		[GoalType.NorthStar]: {
			Icon: IconStarFilled,
			color: "#ffe6b0",
			border: "rgba(255, 210, 122, 0.32)",
			shadow: "0 0 40px -10px rgba(255, 210, 122, 0.4)",
		},
		[GoalType.Bearing]: {
			Icon: IconCompass,
			color: "#ffffff",
			border: "rgba(134, 164, 255, 0.55)",
			shadow: "0 0 34px -10px rgba(134, 164, 255, 0.55)",
		},
		[GoalType.Movement]: {
			Icon: IconActivity,
			color: "#ffffff",
			border: "rgba(95, 230, 195, 0.22)",
			shadow: "none",
		},
	};

	const cardType = cardTypes[type];

	return (
		<Card ref={ref} border={`1px solid ${cardType.border}`} shadow={cardType.shadow} {...other}>
			<Group>
				<cardType.Icon />
				<span className={classes.title}>{text}</span>
			</Group>
		</Card>
	);
}
