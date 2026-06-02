import { Group, Stack } from "@mantine/core";
import Icon from "./Icon";
import LogoText from "./LogoText";

export enum LogoLayout {
	Horizontal,
	Vertical,
	Text,
}

type LogoProps = {
	layout: LogoLayout;
	size?: string;
};

export default function Logo({ layout, size = "md" }: LogoProps) {
	switch (layout) {
		case LogoLayout.Vertical:
			return (
				<Stack align="center">
					<Icon size={size} />
					<LogoText size={size} />
				</Stack>
			);

		case LogoLayout.Horizontal:
			return (
				<Group justify="center">
					<Icon size={size} />
					<LogoText size={size} />
				</Group>
			);

		case LogoLayout.Text:
			return <LogoText size={size} />;
	}
}
