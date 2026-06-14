import { GoalType } from "@/api/models";

export const theme = {
	colors: {
		goal: {
			[GoalType.NorthStar]: "var(--mantine-color-orange-4)",
			[GoalType.Bearing]: "var(--mantine-color-teal-6)",
			[GoalType.Movement]: "var(--mantine-color-blue-7)",
		},
		priority: {
			High: "var(--mantine-color-red-6)",
			None: "var(--mantine-color-gray-6)",
		},
		event: "blue",
	},
};
