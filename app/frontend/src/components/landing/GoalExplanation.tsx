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
		[GoalType.NorthStar]: {
			text: "Highest ambitions.",
			color: "var(--landing-color-gold-dark)",
		},
		[GoalType.Bearing]: {
			text: "Directions to pull you towards your North Stars.",
			color: "var(--landing-color-blue)",
		},
		[GoalType.Movement]: {
			text: "Small actions to accomplish your Bearings.",
			color: "var(--landing-color-teal)",
		},
	};

	return (
		<Stack gap="0" ta="left">
			<div
				className={classes.type}
				style={
					{
						"--explanation-color": descriptions[type].color,
					} as CSSProperties
				}
			>
				{text[type]}
			</div>
			<div className={classes.description}>{descriptions[type].text}</div>
		</Stack>
	);
}
