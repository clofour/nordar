import classes from "./GoalCard.module.css";
import { GoalType } from "@/api/models";
import { IconActivity, IconCompass, IconStarFilled } from "@tabler/icons-react";
import Card from "./Card";
import { Group } from "@mantine/core";
import Pill from "./Pill";

type GoalCardProps = React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement> | undefined;
	type: GoalType;
	text: string;
	detail?: string;
};

export default function GoalCard({ ref, type, text, detail, ...other }: GoalCardProps) {
	const cardTypes = {
		[GoalType.NorthStar]: {
			Icon: IconStarFilled,
			color: "#ffe6b0",
			border: "rgba(255, 210, 122, 0.32)",
			shadow: "0 0 40px -10px rgba(255, 210, 122, 0.4)",
			background: "linear-gradient(180deg, rgba(40, 32, 18, 0.6), rgba(14, 15, 38, 0.72))",
		},
		[GoalType.Bearing]: {
			Icon: IconCompass,
			color: "#f4f6ff",
			border: "rgba(134, 164, 255, 0.55)",
			shadow: "none",
			background: "rgba(14, 15, 38, 0.72)",
		},
		[GoalType.Movement]: {
			Icon: IconActivity,
			color: "#b7bee0",
			border: "rgba(95, 230, 195, 0.22)",
			shadow: "none",
			background: "rgba(10, 25, 21, 0.55)",
		},
	};

	const cardType = cardTypes[type];

	return (
		<Card ref={ref} background={cardType.background} border={`1px solid ${cardType.border}`} shadow={cardType.shadow} {...other}>
			<Group w="100%" justify="space-between">
				<Group>
					<cardType.Icon color={cardType.color} />
					<span className={classes.title}>{text}</span>
				</Group>
				{detail && <Pill>{detail}</Pill>}
			</Group>
		</Card>
	);
}
