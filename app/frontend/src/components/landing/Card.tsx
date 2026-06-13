import { Group } from "@mantine/core";
import classes from "./Card.module.css";
import type { CSSProperties, ReactNode } from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement> | undefined;
	border?: string;
	shadow?: string;
	children: ReactNode;
};

export default function Card({ ref, border, shadow, children, ...other }: CardProps) {
	return (
		<div
			ref={ref}
			className={classes.card}
			style={
				{
					"--card-border": border,
					"--card-shadow": shadow,
				} as CSSProperties
			}
			{...other}
		>
			{children}
		</div>
	);
}
