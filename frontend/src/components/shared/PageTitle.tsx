import { Title, Text } from "@mantine/core";

interface PageTitleProps {
	name: string;
	description: string;
}

export default function PageTitle({ name, description }: PageTitleProps) {
	return (
		<div>
			<Title order={2}>{name}</Title>
			<Text c="dimmed">{description}</Text>
		</div>
	);
}
