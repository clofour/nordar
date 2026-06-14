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
		<footer className={classes.footer}>
			<Grid gap="xl">
				<Grid.Col span={{ base: 6, sm: 4 }}>
					<Stack gap="sm">
						<Logo layout={LogoLayout.Horizontal} size="30px" />
						<Text className={classes.description!}>Set the right goals. Steer by them daily. Become who you want to be.</Text>
					</Stack>
				</Grid.Col>

				{sections.map((section) => {
					return (
						<Grid.Col key={section.name} span={{ base: 6, sm: "auto" }}>
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
						</Grid.Col>
					);
				})}
			</Grid>
		</footer>
	);
}
