import classes from "./ClosingCTA.module.css";
import { Stack } from "@mantine/core";
import Logo, { LogoLayout } from "../shared/Logo/Logo";
import LinkButton from "./LinkButton";

export default function ClosingCTA() {
	return (
		<Stack justify="center" align="center" ta="center">
			<Logo layout={LogoLayout.Icon} size="90px" />
			<h2 className={classes.title}>Your North Star<br/>is already up there.</h2>
			<p className={classes.description}>Stop wishing on it. Start steering by it. Spot your first star, set your bearings, and have your week planned — it takes about three minutes.</p>
			<LinkButton variant="filled" label="Sign Up" to="/auth/signup" />
			<p>Placeholder</p>
		</Stack>
	);
}
