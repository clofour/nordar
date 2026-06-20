import { useReveal } from "@/hooks/useReveal";
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import clsx from "clsx";

interface RevealProps {
	order?: 1 | 2 | 3 | 4;
	children: ReactElement<{ className?: string }>;
}

export default function Reveal({ order=1, children }: RevealProps) {
	const { ref, className } = useReveal();

	if (!isValidElement(children)) return children;

	return cloneElement(children, {
		ref,
		className: clsx(children.props.className, className)
	} as any);
}
