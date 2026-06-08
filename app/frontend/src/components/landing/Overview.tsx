import classes from "./Overview.module.css";
import Eyebrow from "./Eyebrow";
import Module from "./Module";
import { SimpleGrid, Stack } from "@mantine/core";
import { GoalExplanation } from "./GoalExplanation";
import { GoalType } from "@/api/models";
import GoalCard from "./GoalCard";

export default function Overview() {
	const goals = {
		"Be healthy": [
			""
		],
	}

	return (
		<Module>
			<Eyebrow text="The method" />
			<h1 className={classes.title}>Three altitudes.<br />One unbroken line of sight.</h1>
			<p className={classes.description}>Big goals fail when they stay big. Nordar breaks every ambition into three connected altitudes — so a sleepy Thursday alarm is visibly pulling you toward who you want to become.</p>
		
			<SimpleGrid w="100%" cols={3} spacing="lg">
				<div>
					<GoalExplanation type={GoalType.NorthStar} />
					<Stack h="200px" align="center" justify="center">
						<GoalCard type={GoalType.NorthStar} />
					</Stack>
				</div>
				<div>
					<GoalExplanation type={GoalType.Bearing} />
				</div>
				<div>
					<GoalExplanation type={GoalType.Movement} />
				</div>
			</SimpleGrid>
		</Module>
	);
}
