import { Button, Grid, Group, Stack, type ButtonVariant } from "@mantine/core";
import { IconCalendar, IconChartBar, IconNotebook, IconTarget } from "@tabler/icons-react";
import { Link } from "react-router";
import Card from "./Card";

export default function FeatureGrid() {
	const features = [
		{
			name: "Goals",
			description: "I don't know",
			Icon: IconTarget,
			span: 9,
		},
		{
			name: "Calendar",
			description: "I don't know",
			Icon: IconCalendar,
			span: 3,
		},
		{
			name: "Reflections",
			description: "I don't know",
			Icon: IconNotebook,
			color: "teal",
			span: 6,
		},
		{
			name: "Analytics",
			description: "I don't know",
			Icon: IconChartBar,
			span: 6,
		}
	];

	return (
		<Grid>
			{features.map((feature) =>
				<Grid.Col span={{ base: 12, sm: feature.span }}>
					<Card>
						<Stack>
							<Group>
								<feature.Icon size={22} />
								<div>{feature.name}</div>
							</Group>

							<div>{feature.description}</div>
						</Stack>
					</Card>
				</Grid.Col>
			)}
		</Grid>
	);
}
