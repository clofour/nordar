import { GoalType } from "@/api/models";
import { createTheme, type CSSVariablesResolver } from "@mantine/core";

const frostedGlass = {
	background: "color-mix(in srgb, 25% var(--mantine-color-body), 75% transparent)",
	backdropFilter: "blur(16px)",
};

export const theme = createTheme({
	colors: {
		nordar: ["#eff2ff", "#dde1f1", "#b9c1e0", "#929fcf", "#7281c0", "#5d6fb8", "#5266b5", "#4355a0", "#374889", "#2e4180"],
	},
	primaryColor: "nordar",
	defaultGradient: {
		deg: 135,
		from: "#5266b5",
		to: "#7281c0",
	},
	autoContrast: true,
	fontFamily: "Inter",
	components: {
		AppShell: {
			styles: {
				header: {
					...frostedGlass,
				},
				navbar: {
					...frostedGlass,
				},
			},
		},
		Card: {
			styles: {
				root: {
					"backgroundColor": "var(--mantine-color-body)",
				},
			},
		},
		Notification: {
			styles: {
				root: {
					padding: "4px 8px",
				},
			},
		},
	},
	other: {
		landing: {
			colors: {
				primary: "#f4f6ff",
				secondary: "#b7bee0",
				tertiary: "#7b82a8",
				goldLight: "#ffe6b0",
				goldDark: "#ffd27a",
				teal: "#5fe6c4",
				blue: "#86a4ff",
				slate: "#96a2dc",
				periwinkle: "#b0c4ff",
				mint: "#7eecd4",
				lavender: "#c4b0ff",
				backgroundLight: "#05050f",
				backgroundDark: "#04040c"
			},
			fonts: {
				primary: "Space Grotesk",
				secondary: "Inter"
			}
		},
		app: {
			colors: {
				goals: {
					[GoalType.NorthStar]: "var(--mantine-color-orange-4)",
					[GoalType.Bearing]: "var(--mantine-color-teal-6)",
					[GoalType.Movement]: "var(--mantine-color-blue-7)",
				},
				priority: {
					high: "var(--mantine-color-red-6)",
					none: "var(--mantine-color-gray-6)",
				},
				event: "blue"
			}
		}
	},
} as const);

export const otherTheme = theme.other!;

export const resolver: CSSVariablesResolver = (theme) => {
	const { landing, app } = theme.other;

	return {
		variables: {
			"--landing-color-primary": landing.colors.primary,
			"--landing-color-secondary": landing.colors.secondary,
			"--landing-color-tertiary": landing.colors.tertiary,
			"--landing-color-gold-light": landing.colors.goldLight,
			"--landing-color-gold-dark": landing.colors.goldDark,
			"--landing-color-teal": landing.colors.teal,
			"--landing-color-blue": landing.colors.blue,
			"--landing-color-slate": landing.colors.slate,
			"--landing-color-periwinkle": landing.colors.periwinkle,
			"--landing-color-mint": landing.colors.mint,
			"--landing-color-lavender": landing.colors.lavender,
			"--landing-color-background-light": landing.colors.backgroundLight,
			"--landing-color-background-dark": landing.colors.backgroundDark,

			"--landing-font-primary": landing.fonts.primary,
			"--landing-font-secondary": landing.fonts.secondary,

			"--landing-surface-navy": "rgba(14, 15, 38, 0.72)",
			"--landing-color-card": "linear-gradient(180deg, rgba(20, 22, 52, 0.92), rgba(9, 10, 28, 0.96))",
			"--landing-color-border": "color-mix(in srgb, var(--landing-color-slate), 12% transparent)",

			"--landing-northstar-bg": "linear-gradient(180deg, rgba(40, 32, 18, 0.6), var(--landing-surface-navy))",
			"--landing-northstar-border": "1px solid color-mix(in srgb, var(--landing-color-gold-dark), 68% transparent)",
			"--landing-northstar-shadow": "0 0 40px -10px color-mix(in srgb, var(--landing-color-gold-dark), 60% transparent)",
			"--landing-bearing-bg": "var(--landing-surface-navy)",
			"--landing-bearing-border": "1px solid color-mix(in srgb, var(--landing-color-blue), 45% transparent)",
			"--landing-movement-bg": "rgba(10, 25, 21, 0.55)",
			"--landing-movement-border": "1px solid color-mix(in srgb, var(--landing-color-teal), 78% transparent)",

			"--app-color-goal-northstar": app.colors[GoalType.NorthStar],
			"--app-color-goal-bearing": app.colors[GoalType.Bearing],
			"--app-color-goal-movement": app.colors[GoalType.Movement],

			"--app-color-priority-high": app.colors.priority.high,
			"--app-color-priority-none": app.colors.priority.none,

			"--app-color-event": app.colors.event

		},
		light: {},
		dark: {},
	}
};
