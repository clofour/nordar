import { Group } from "@mantine/core";
import classes from "./Card.module.css";
import type { CSSProperties, ReactNode } from "react";

type CardProps = {
	border?: string;
	shadow?: string;
	children: ReactNode;
};

export default function Card({ border, shadow, children }: CardProps) {
	return (
		<div
			className={classes.card}
			style={
				{
					"--card-border": border,
					"--card-shadow": shadow,
				} as CSSProperties
			}
		>
			{children}
		</div>
	);
}
