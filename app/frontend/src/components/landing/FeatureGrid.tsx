import { Grid, Group, Stack, type CSSProperties } from "@mantine/core";
import { IconCalendar, IconChartBar, IconNotebook, IconTarget } from "@tabler/icons-react";
import Card from "./Card";
import classes from "./FeatureGrid.module.css";
import Module from "./Module";
import Eyebrow from "./Eyebrow";
import SectionTitle from "./SectionTitle";
import SectionIntroduction from "./SectionIntroduction";

export default function FeatureGrid() {
	const features = [
		{
			name: "Goals",
			description:
				"Set your North Stars, define the bearings that pull you toward them, and break each one into movements small enough to actually take on.",
			Icon: IconTarget,
			color: "var(--landing-color-gold-light)",
			span: 9,
		},
		{
			name: "Calendar",
			description: "Schedule movements and events visually.",
			Icon: IconCalendar,
			color: "var(--landing-color-periwinkle)",
			span: 3,
		},
		{
			name: "Reflections",
			description:
				"Random check-ins to figure out what went well, what went wrong and what could have been even better.",
			Icon: IconNotebook,
			color: "var(--landing-color-mint)",
			span: 6,
		},
		{
			name: "Analytics",
			description: "Track your progress and learn about yourself. Understand your strengths and weaknesses.",
			Icon: IconChartBar,
			color: "var(--landing-color-lavender)",
			span: 6,
		},
	];

	return (
		<Module>
			<SectionIntroduction>
				<Eyebrow text="What's inside" />
				<SectionTitle Order="h2">Everything you need</SectionTitle>
			</SectionIntroduction>

			<Grid w="100%">
				{features.map((feature) => (
					<Grid.Col key={feature.name} span={{ base: 12, sm: feature.span }}>
						<Card>
							<Stack ta="left">
								<Group>
									<feature.Icon color={feature.color} size={22} />
									<div
										className={classes.name}
										style={
											{
												"--feature-color": feature.color,
											} as CSSProperties
										}
									>
										{feature.name}
									</div>
								</Group>
								<div>{feature.description}</div>
							</Stack>
						</Card>
					</Grid.Col>
				))}
			</Grid>
		</Module>
	);
}
