import classes from "./Card.module.css";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
	ref?: React.Ref<HTMLDivElement> | undefined;
	background?: string;
	border?: string;
	shadow?: string;
	children: ReactNode;
};

export default function Card({ ref, className, background, border, shadow, children, ...other }: CardProps) {
	return (
		<div
			ref={ref}
			className={clsx(classes.card, className)}
			style={
				{
					"--card-background": background,
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
