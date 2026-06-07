import { Grid, SimpleGrid, Stack, Text } from "@mantine/core";
import { Link } from "react-router";
import Logo, { LogoLayout } from "../shared/Logo/Logo";
import classes from "./Footer.module.css";

export default function Footer() {
	const sections = [
		{
			name: "Product",
			links: [
				{ label: "Features", to: "#tbd" },
				{ label: "Pricing", to: "#tbd" },
				{ label: "TBD", to: "#tbd" },
			],
		},
		{
			name: "Legal",
			links: [
				{ label: "Privacy Policy", to: "#tbd" },
				{ label: "Terms of Service", to: "#tbd" },
			],
		},
		{
			name: "Other",
			links: [
				{ label: "Blog", to: "#tbd" },
				{ label: "Status", to: "#tbd" },
			],
		},
	];

	return (
		<Grid gap="xl">
			<Grid.Col span={3}>
				<Stack gap="sm">
					<Logo layout={LogoLayout.Horizontal} />
					<Text className={classes.description!}>
						Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem.
					</Text>
				</Stack>
			</Grid.Col>
			<Grid.Col span={9}>
				<SimpleGrid cols={sections.length}>
					{sections.map((section) => {
						return (
							<Stack gap="sm">
								<Text className={classes.section!}>{section.name}</Text>

								<Stack gap="xs">
									{section.links.map((link) => (
										<Link to={link.to} className={classes.link}>
											{link.label}
										</Link>
									))}
								</Stack>
							</Stack>
						);
					})}
				</SimpleGrid>
			</Grid.Col>
		</Grid>
	);
}
