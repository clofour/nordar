import { useReveal } from "@/hooks/useReveal";
import type { ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
}

export default function Reveal({ children }: RevealProps) {
	const { ref, className } = useReveal();

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
