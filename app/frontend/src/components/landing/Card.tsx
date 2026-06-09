import { Group } from "@mantine/core";
import classes from "./Card.module.css";
import type { CSSProperties, ReactNode } from "react";

type CardProps = {
	color: string;
	border: string;
	shadow: string;
	children: ReactNode;
};

export default function Card({ color, border, shadow, children }: CardProps) {
	return (
		<div
			className={classes.card}
			style={
				{
					"--card-text-color": color,
					"--card-border": border,
					"--card-shadow": shadow,
				} as CSSProperties
			}
		>
			{children}
		</div>
	);
}
