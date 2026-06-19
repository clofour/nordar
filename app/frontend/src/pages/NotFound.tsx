import Background from "@/components/misc/Background";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";

export default function NotFound() {
	return (
		<Stack w="100%" h="100%" ta="center" justify="center" align="center" gap="xl">
			<Background />
			<Title order={2} c="dimmed">
				404
			</Title>
			<Stack gap="xs">
				<Title order={1}>Wrong coordinates.</Title>
				<Text c="dimmed" size="lg">
					It happens. The universe is large.
				</Text>
			</Stack>
			<Button variant="outline" size="md" component={Link} to="/">
				Take me back
			</Button>
		</Stack>
	);
}
