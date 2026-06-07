import { Group, Stack } from "@mantine/core";
import classes from "./Hero.module.css";
import LinkButton from "./LinkButton";

export default function Hero() {
	return (
		<Stack justify="center" align="center" ta="center">
			<small className={classes.eyebrow}>A goalsetting app</small>
			<h1 className={classes.title}>Aim for your<br/><span className={classes.highlight}>North Star</span>.</h1>
			<p className={classes.description}>Nordar turns your biggest ambitions into plans you can actually follow.</p>

			<div className={classes.heroCTA}>
				<LinkButton variant="filled" label="Start free — no card needed" to="/auth/signup" />
				<LinkButton variant="default" label="See the method" to="#tbd" />
			</div>
		</Stack>
	);
}
