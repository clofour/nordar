import type { ReactNode } from "react";
import classes from "./SectionTitle.module.css";

interface SectionTitleProps {
	Order: "h1" | "h2" | "h3";
	children: ReactNode;
}

export default function SectionTitle({ Order, children }: SectionTitleProps) {
	return <Order className={classes.sectionTitle}>{children}</Order>;
}
