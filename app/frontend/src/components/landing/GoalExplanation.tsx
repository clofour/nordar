import { Stack } from "@mantine/core";
import classes from "./GoalExplanation.module.css";
import { GoalType } from "@/api/models";
import { text } from "@/data/text";
import { otherTheme } from "@/data/theme";
import type { CSSProperties } from "react";

type GoalExplanationProps = {
	type: GoalType;
};

export function GoalExplanation({ type }: GoalExplanationProps) {
	const descriptions = {
		[GoalType.NorthStar]: "Your highest ambitions. Set it once, and work on it for years.",
		[GoalType.Bearing]: "A few directions to pull you towards your North Stars.",
		[GoalType.Movement]: "Small actions to accomplish your Bearings.",
	};

	return (
		<Stack gap="0" ta="left">
			<div
				className={classes.type}
				style={
					{
						"--explanation-color": otherTheme.app.colors.goals[type],
					} as CSSProperties
				}
			>
				{text[type]}
			</div>
			<div className={classes.description}>{descriptions[type]}</div>
		</Stack>
	);
}
