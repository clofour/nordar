import classes from "./Pill.module.css";

interface PillProps {
	children: string;
}

export default function Pill({ children }: PillProps) {
	return <div className={classes.pill}>{children}</div>;
}
