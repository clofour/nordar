import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme, type CSSVariablesResolver } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/schedule/styles.css";
import "@mantine/notifications/styles.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import "@/index.css";
import NotFound from "@/pages/NotFound";
import Authentication from "@/pages/Authentication";
import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import Calendar from "@/pages/Calendar";
import Goals from "@/pages/Goals";
import Reflections from "@/pages/Reflections";
import { SWRConfig } from "swr";
import { assert } from "@/helpers";
import AuthenticationRequirement from "@/components/shared/AuthenticationRequirement";
import { AuthProvider } from "@/contexts/AuthContext";
import LandingPage from "./pages/Landing";

const rootElement = document.getElementById("root");
assert(rootElement != null, "Root element cannot be null.");

const SWRConfiguration = {
	refreshInterval: 0,
	revalidateOnFocus: false,
	revalidateOnReconnect: true,
	revalidateIfStale: true,
	dedupingInterval: 5000,
	shouldRetryOnError: true,
	errorRetryCount: 2,
	errorRetryInterval: 3000,
};

const frostedGlass = {
	background: "color-mix(in srgb, 25% var(--mantine-color-body), 75% transparent)",
	backdropFilter: "blur(16px)",
};

const theme = createTheme({
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
		}
	},
});

const resolver: CSSVariablesResolver = (theme) => {
	const { colors, fonts } = theme.other.landing;

	return {
		variables: {
			"--landing-color-primary": colors.primary,
			"--landing-color-secondary": colors.secondary,
			"--landing-color-tertiary": colors.tertiary,
			"--landing-color-gold-light": colors.goldLight,
			"--landing-color-gold-dark": colors.goldDark,
			"--landing-color-teal": colors.teal,
			"--landing-color-blue": colors.blue,
			"--landing-color-slate": colors.slate,
			"--landing-color-periwinkle": colors.periwinkle,
			"--landing-color-mint": colors.mint,
			"--landing-color-lavender": colors.lavender,
			"--landing-color-background-light": colors.backgroundLight,
			"--landing-color-background-dark": colors.backgroundDark,

			"--landing-font-primary": fonts.primary,
			"--landing-font-secondary": fonts.secondary,

			"--landing-surface-navy": "rgba(14, 15, 38, 0.72)",
			"--landing-color-card": "linear-gradient(180deg, rgba(20, 22, 52, 0.92), rgba(9, 10, 28, 0.96))",
			"--landing-color-border": "color-mix(in srgb, var(--landing-color-slate), 12% transparent)",

			"--landing-northstar-bg": "linear-gradient(180deg, rgba(40, 32, 18, 0.6), var(--landing-surface-navy))",
			"--landing-northstar-border": "1px solid color-mix(in srgb, var(--landing-color-gold-dark), 68% transparent)",
			"--landing-northstar-shadow": "0 0 40px -10px color-mix(in srgb, var(--landing-color-gold-dark), 60% transparent)",
			"--landing-bearing-bg": "var(--landing-surface-navy)",
			"--landing-bearing-border": "1px solid color-mix(in srgb, var(--landing-color-blue), 45% transparent)",
			"--landing-movement-bg": "rgba(10, 25, 21, 0.55)",
			"--landing-movement-border": "1px solid color-mix(in srgb, var(--landing-color-teal), 78% transparent)"
		},
		light: {},
		dark: {},
	}
};

function AnyTheme() {
	return (
		<MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="dark">
			<Notifications containerWidth="25%" />
			<Outlet />
		</MantineProvider>
	)
}

function DarkTheme() {
	return (
		<MantineProvider theme={theme} cssVariablesResolver={resolver} forceColorScheme="dark">
			<Notifications containerWidth="25%" />
			<Outlet />
		</MantineProvider>
	)
}

createRoot(rootElement).render(
	<StrictMode>
		<SWRConfig value={SWRConfiguration}>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<DarkTheme />}>
							<Route path="" element={<LandingPage />} />
						</Route>

						<Route element={<AnyTheme />}>
							<Route element={<AuthenticationRequirement type={true} />}>
								<Route path="app" element={<App />}>
									<Route index element={<Navigate to="dashboard" replace />} />
									<Route path="dashboard" element={<Dashboard />} />
									<Route path="calendar" element={<Calendar />} />
									<Route path="goals" element={<Goals />} />
									<Route path="reflections" element={<Reflections />} />
								</Route>
							</Route>

							<Route path="auth" element={<AuthenticationRequirement type={false} />}>
								<Route index element={<Navigate to="signin" replace />} />
								<Route path=":tabValue" element={<Authentication />} />
							</Route>

							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</SWRConfig>
	</StrictMode>,
);
