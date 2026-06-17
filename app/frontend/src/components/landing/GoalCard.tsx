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
			color: "var(--landing-color-gold-light)",
			border: "var(--landing-northstar-border)",
			shadow: "var(--landing-northstar-shadow)",
			background: "var(--landing-northstar-bg)",
		},
		[GoalType.Bearing]: {
			Icon: IconCompass,
			color: "var(--landing-color-primary)",
			border: "var(--landing-bearing-border)",
			shadow: "none",
			background: "var(--landing-bearing-bg)",
		},
		[GoalType.Movement]: {
			Icon: IconActivity,
			color: "var(--landing-color-secondary)",
			border: "var(--landing-movement-border)",
			shadow: "none",
			background: "var(--landing-movement-bg)",
		},
	};

	const cardType = cardTypes[type];

	return (
		<Card ref={ref} background={cardType.background} border={cardType.border} shadow={cardType.shadow} {...other}>
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
