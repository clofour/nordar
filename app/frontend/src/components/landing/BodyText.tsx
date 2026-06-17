import type { ReactNode } from "react";
import classes from "./BodyText.module.css";

interface BodyTextProps {
	children: ReactNode;
}

export default function BodyText({ children }: BodyTextProps) {
	return <p className={classes.bodyText}>{children}</p>;
}
