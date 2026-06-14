import classes from "./Overview.module.css";
import Eyebrow from "./Eyebrow";
import Module from "./Module";
import { SimpleGrid, Stack } from "@mantine/core";
import { GoalExplanation } from "./GoalExplanation";
import { GoalType } from "@/api/models";
import GoalCard from "./GoalCard";
import { goals } from "./OverviewData";
import { useCallback, useEffect, useRef, useState } from "react";

interface Point {
	x: number;
	y: number;
};

interface Path {
	d: string;
	strokeColor: string;
	strokeWidth: number;
	strokeOpacity: number;
}

export default function Overview() {
	const [active, setActive] = useState(0);
	const [paths, setPaths] = useState<Path[]>([]);

	const referenceRef = useRef<HTMLDivElement | null>(null);
	const northStarRef = useRef<HTMLDivElement | null>(null);
	const bearingRefs = useRef<(HTMLDivElement | null)[]>([]);
	const movementRefs = useRef<(HTMLDivElement | null)[]>([]);

	const referenceBounds = referenceRef.current?.getBoundingClientRect();
	let width = referenceBounds?.width ?? 100;
	let height = referenceBounds?.height ?? 100;

	const getEdgePosition = (element: HTMLElement, reference: HTMLElement, side: "left" | "right"): Point => {
		const elementBounds = element.getBoundingClientRect();
		const referenceBounds = reference.getBoundingClientRect();

		return {
			x: elementBounds[side] - referenceBounds.left,
			y: elementBounds.top + elementBounds.height / 2 - referenceBounds.top,
		}
	}

	const generateCurve = (x1: number, y1: number, x2: number, y2: number) => {
		const offset = (x2 - x1) * 0.5;
		return `M ${x1} ${y1} C ${x1 + offset} ${y1}, ${x2 - offset} ${y2}, ${x2} ${y2}`
	}

	const drawLinks = useCallback(() => {
		const reference = referenceRef.current;
		const northStar = northStarRef.current;
		if (!reference || !northStar) return;

		const updatedPaths: Path[] = [];

		const northStarRight = getEdgePosition(northStar, reference, "right");

		bearingRefs.current.forEach((bearing, index) => {
			if (!bearing) return;

			const isActive = index == active;

			const bearingLeft = getEdgePosition(bearing, reference, "left");

			updatedPaths.push({
				d: generateCurve(northStarRight.x, northStarRight.y, bearingLeft.x, bearingLeft.y),
				strokeColor: isActive ? "#86a4ff" : "rgba(150, 162, 220, 0.18)",
				strokeWidth: isActive ? 2 : 1.2,
				strokeOpacity: isActive ? 0.9 : 1,
			});

			if (isActive) {
				const bearingRight = getEdgePosition(bearing, reference, "right");

				movementRefs.current.forEach((movement) => {
					if (!movement) return;

					const movementLeft = getEdgePosition(movement, reference, "left");

					updatedPaths.push({
						d: generateCurve(bearingRight.x, bearingRight.y, movementLeft.x, movementLeft.y),
						strokeColor: "#5fe6c4",
						strokeWidth: 1.6,
						strokeOpacity: 0.85
					});
				});
			}
		})

		setPaths(updatedPaths);
	}, [active]);

	useEffect(() => {
		requestAnimationFrame(drawLinks);
	})

	useEffect(() => {
		requestAnimationFrame(drawLinks);
	}, [active]);

	useEffect(() => {
		const resize = () => {
			requestAnimationFrame(drawLinks);
		}
		window.addEventListener("resize", resize);

		return () => {
			window.removeEventListener("resize", resize);
		}
	}, [drawLinks, active])

	return (
		<Module>
			<Eyebrow text="The method" />
			<h1 className={classes.title}>
				Three altitudes.
				<br />
				One unbroken line of sight.
			</h1>
			<p className={classes.description}>
				Big goals fail when they stay big. Nordar breaks every ambition into three connected altitudes — so a sleepy Thursday alarm is visibly pulling
				you toward who you want to become.
			</p>

			<div ref={referenceRef} className={classes.reference}>
				<svg className={classes.svgOverlay} viewBox={`0 0 ${width} ${height}`}>
					{paths.map((path, index) => (
						<path
							key={index}
							d={path.d}
							fill="none"
							stroke={path.strokeColor}
							strokeWidth={path.strokeWidth}
							opacity={path.strokeOpacity}
							strokeLinecap="round"
						>
						</path>
					))}
				</svg>

				<SimpleGrid w="100%" cols={3} spacing="lg">
					<Stack>
						<GoalExplanation type={GoalType.NorthStar} />
						<Stack flex="1 1 0" align="center" justify="center">
							<GoalCard ref={northStarRef} type={GoalType.NorthStar} text={goals.name} />
						</Stack>
					</Stack>
					<Stack>
						<GoalExplanation type={GoalType.Bearing} />
						<Stack flex="1 1 0" align="center" justify="center">
							{goals.bearings.map((bearing, index) => (
								<GoalCard ref={(element) => { bearingRefs.current[index] = element; }} className={`${classes.bearing} ${active == index ? classes.bearingActive : classes.bearingInactive}`} type={GoalType.Bearing} text={bearing.name} onMouseEnter={() => (setActive(index))} />
							))}
						</Stack>
					</Stack>
					<Stack>
						<GoalExplanation type={GoalType.Movement} />
						<Stack key={active} flex="1 1 0" align="center" justify="center">
							{goals.bearings[active]?.movements?.map((movement, index) => (
								<GoalCard ref={(element) => { movementRefs.current[index] = element; }} className={classes.movement} type={GoalType.Movement} text={movement.name} detail={movement.time} />
							))}
						</Stack>
					</Stack>
				</SimpleGrid>
			</div>
		</Module>
	);
}
