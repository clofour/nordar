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
import { resolver, theme } from "./data/theme";

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
