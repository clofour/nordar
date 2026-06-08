import classes from "./Overview.module.css";
import Eyebrow from "./Eyebrow";
import Module from "./Module";
import { SimpleGrid, Stack } from "@mantine/core";
import { GoalExplanation } from "./GoalExplanation";
import { GoalType } from "@/api/models";
import GoalCard from "./GoalCard";

export default function Overview() {
	const goals = [
		{
			name: "Be healthy",
			bearings: [
				{
					name: "Sleep early",
					movements: [
						{ name: "Wind-down alarm", time: "9:00 PM" },
						{ name: "No screens", time: "after 10:30" },
						{ name: "Lights out", time: "11:00 PM" }
					]
				},
				{
					name: "Do some exercise",
					movements: [
						{ name: "Walk 8.000 steps", time: "daily" },
						{ name: "Strength training", time: "2x / wk" },
						{ name: "Morning stretch", time: "8:00 AM" }
					]
				},
				{
					name: "Eat a healthy diet",
					movements: [
						{ name: "Cook dinner", time: "5 nights" },
						{ name: "Prioritize protein", time: "each meal" },
						{ name: "No late snacks", time: "after 08:00 PM" }
					]
				}
			]
		}
	]

	return (
		<Module>
			<Eyebrow text="The method" />
			<h1 className={classes.title}>Three altitudes.<br />One unbroken line of sight.</h1>
			<p className={classes.description}>Big goals fail when they stay big. Nordar breaks every ambition into three connected altitudes — so a sleepy Thursday alarm is visibly pulling you toward who you want to become.</p>

			<SimpleGrid w="100%" cols={3} spacing="lg">
				<div>
					<GoalExplanation type={GoalType.NorthStar} />
					<Stack h="200px" align="center" justify="center">
						{goals.map((northStar) =>
							<GoalCard type={GoalType.NorthStar} text={northStar.name} />
						)}
					</Stack>
				</div>
				<div>
					<GoalExplanation type={GoalType.Bearing} />
					<Stack h="200px" align="center" justify="center">
						{goals.map((northStar) =>
							<GoalCard type={GoalType.NorthStar} text={northStar.name} />
						)}
					</Stack>
				</div>
				<div>
					<GoalExplanation type={GoalType.Movement} />
					<Stack h="200px" align="center" justify="center">
						{goals.map((northStar) =>
							<GoalCard type={GoalType.NorthStar} text={northStar.name} />
						)}
					</Stack>
				</div>
			</SimpleGrid>
		</Module>
	);
}
