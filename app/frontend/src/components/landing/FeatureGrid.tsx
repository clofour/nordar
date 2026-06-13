import { Grid, Group, Stack, type CSSProperties } from "@mantine/core";
import { IconCalendar, IconChartBar, IconNotebook, IconTarget } from "@tabler/icons-react";
import Card from "./Card";
import classes from "./FeatureGrid.module.css";
import Module from "./Module";
import Eyebrow from "./Eyebrow";
import SectionTitle from "./SectionTitle";

export default function FeatureGrid() {
	const features = [
		{
			name: "Goals",
			description: "I don't know",
			Icon: IconTarget,
			color: "#ffe6b0",
			span: 9,
		},
		{
			name: "Calendar",
			description: "I don't know",
			Icon: IconCalendar,
			color: "#b0c4ff",
			span: 3,
		},
		{
			name: "Reflections",
			description: "I don't know",
			Icon: IconNotebook,
			color: "#7eecd4",
			span: 6,
		},
		{
			name: "Analytics",
			description: "I don't know",
			Icon: IconChartBar,
			color: "#c4b0ff",
			span: 6,
		},
	];

	return (
		<Module>
			<Eyebrow text="What's inside" />
			<SectionTitle Order="h2">Everything you need</SectionTitle>
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
