import { Button, Grid, type ButtonVariant } from "@mantine/core";
import { IconCalendar, IconChartBar, IconNotebook, IconTarget } from "@tabler/icons-react";
import { Link } from "react-router";
import Card from "./Card";

export default function FeatureGrid() {
	const features = [
		{
			name: "Goals",
			description: "I don't know",
			icon: IconTarget,
			span: 9,
		},
		{
			name: "Calendar",
			description: "I don't know",
			icon: IconCalendar,
			span: 3,
		},
		{
			name: "Reflections",
			description: "I don't know",
			icon: IconNotebook,
			color: "teal",
			span: 6,
		},
		{
			name: "Analytics",
			description: "I don't know",
			icon: IconChartBar,
			span: 6,
		}
	];

	return (
		<Grid>
			{features.map((feature) =>
				<Grid.Col span={{ base: 12, sm: feature.span }}>
					<Card>
						<div>{feature.name}</div>
						<div>{feature.description}</div>
					</Card>
				</Grid.Col>
			)}
		</Grid>
	);
}
