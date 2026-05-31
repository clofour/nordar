import { GoalType } from "@/api/models";

export const theme = {
	colors: {
		goal: {
			[GoalType.NorthStar]: "red",
			[GoalType.Bearing]: "green",
			[GoalType.Movement]: "blue",
		},
		priority: {
			High: "red",
			None: "gray",
		},
		event: "blue",
	},
};
