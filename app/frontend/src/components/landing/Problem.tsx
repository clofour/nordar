import Eyebrow from "./Eyebrow";
import classes from "./Problem.module.css";
import Module from "./Module";

export default function Problem() {
	return (
		<Module>
			<Eyebrow text="The hard truth" />
			<h2 className={classes.title}>
				<span className={classes.highlighted}>Everyone wants to be an Olympic athlete.</span>
				<span className={classes.muted}> Almost no one wants to wake up for the 6 AM practice.</span>
			</h2>
			<p className={classes.description}>
				The dream is the easy part. Nordar exists for the gap between the goal you admire and the actions you'll actually repeat — because <i>that</i>{" "}
				gap is where every ambition lives or dies.
			</p>
		</Module>
	);
}
