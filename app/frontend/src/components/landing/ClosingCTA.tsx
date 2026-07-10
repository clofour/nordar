import classes from "./ClosingCTA.module.css";
import { Stack } from "@mantine/core";
import Logo, { LogoLayout } from "../shared/Logo/Logo";
import LinkButton from "./LinkButton";
import Module from "./Module";
import SectionIntroduction from "./SectionIntroduction";
import SectionTitle from "./SectionTitle";

export default function ClosingCTA() {
	return (
		<Module>
			<SectionIntroduction>
				<Logo layout={LogoLayout.Icon} size="90px" />
				<SectionTitle Order="h2">
					Your North Star
					<br />
					is already up there.
				</SectionTitle>
				<p className={classes.description}>
					Stop wishing, and start doing. Spot your first star, set your bearings, and plan your week. It takes about twenty minutes.
				</p>
			</SectionIntroduction>

			<Stack gap="0">
				<LinkButton variant="gradient" size="lg" label="Sign Up" to="/auth/signup" />
				<p>No credit card required</p>
			</Stack>
		</Module>
	);
}
