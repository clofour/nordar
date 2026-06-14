import classes from "./Hero.module.css";
import LinkButton from "./LinkButton";
import Eyebrow from "./Eyebrow";
import Module from "./Module";

export default function Hero() {
	return (
		<Module>
			<Eyebrow text="A goal-setting app" />
			<h1 className={classes.title}>
				Aim for your
				<br />
				<span className={classes.highlight}>North Star</span>.
			</h1>
			<p className={classes.description}>Nordar turns your biggest ambitions into plans you can actually follow.</p>

			<div className={classes.heroCTA}>
				<LinkButton variant="gradient" size="md" label="Start free — no card needed" to="/auth/signup" />
				<LinkButton variant="default" size="md" label="See the method" to="#tbd" />
			</div>
		</Module>
	);
}
