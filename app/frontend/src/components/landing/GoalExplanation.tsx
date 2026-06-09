import { Stack } from "@mantine/core";
import classes from "./GoalExplanation.module.css";
import { GoalType } from "@/api/models";

type GoalExplanationProps = {
	type: GoalType;
};

export function GoalExplanation({ type }: GoalExplanationProps) {
	const descriptions = {
		[GoalType.NorthStar]: "North north",
		[GoalType.Bearing]: "Norh th",
		[GoalType.Movement]: "eow",
	};

	return (
		<Stack gap="0" ta="left">
			<div className={classes.type}>{type}</div>
			<div>{descriptions[type]}</div>
		</Stack>
	);
}
