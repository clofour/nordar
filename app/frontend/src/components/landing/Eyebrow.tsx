import classes from "./Eyebrow.module.css";

interface EyebrowProps {
    text: string;
}

export default function Eyebrow({ text }: EyebrowProps) {
	return (
		<small className={classes.eyebrow}>{text}</small>
	);
}
