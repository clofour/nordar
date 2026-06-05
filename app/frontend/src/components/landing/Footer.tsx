import { Grid, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link } from "react-router";
import Logo, { LogoLayout } from "../shared/Logo/Logo";

export default function Footer() {
    const sections = [
        {
            name: "Product",
            links: [
                { label: "Features", to: "#tbd" },
                { label: "Pricing", to: "#tbd" },
                { label: "TBD", to: "#tbd" }
            ]
        },
        {
            name: "Legal",
            links: [
                { label: "Privacy Policy", to: "#tbd" },
                { label: "Terms of Service", to: "#tbd" }
            ]
        },
        {
            name: "Other",
            links: [
                { label: "Blog", to: "#tbd" },
                { label: "Status", to: "#tbd" }
            ]
        }
    ]

    return (
        <Grid>
            <Grid.Col span={3}>
                <Logo layout={LogoLayout.Horizontal} />
                <Text>Placeholder</Text>
            </Grid.Col>
            <Grid.Col span={9}>
                <SimpleGrid cols={sections.length}>
                    {sections.map((section) => {
                        return (
                            <Stack>
                                <Text>{section.name}</Text>

                                {section.links.map((link) => (
                                    <Link to={link.to}>{link.label}</Link>
                                ))}
                            </Stack>
                        );
                    })}
                </SimpleGrid>
            </Grid.Col>
        </Grid>
    );
}
