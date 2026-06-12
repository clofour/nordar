import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppShellNavbar, MantineProvider, createTheme, virtualColor, type CSSVariablesResolver } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/schedule/styles.css";
import "@mantine/notifications/styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
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
import Background from "./components/misc/Background";

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
		Notification: {
			styles: {
				root: {
					padding: "4px 8px",
				},
			},
		},
	},
	other: {
		testing: "y",
	},
});

const resolver: CSSVariablesResolver = (theme) => ({
	variables: {},
	light: {},
	dark: {},
});

createRoot(rootElement).render(
	<StrictMode>
		<SWRConfig value={SWRConfiguration}>
			<AuthProvider>
				<MantineProvider theme={theme} cssVariablesResolver={resolver}>
					<Notifications containerWidth="25%" />
					<BrowserRouter>
						<Routes>
							<Route path="" element={<LandingPage />} />

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
						</Routes>
					</BrowserRouter>
				</MantineProvider>
			</AuthProvider>
		</SWRConfig>
	</StrictMode>,
);
