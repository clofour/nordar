import { Group, Stack } from "@mantine/core";
import Icon from "./Icon";
import LogoText from "./LogoText";

export enum LogoLayout {
	Horizontal,
	Vertical,
	Icon,
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
				<Group>
					<Icon size={size} />
					<LogoText size={size} />
				</Group>
			);

		case LogoLayout.Icon:
			return <Icon size={size} />;

		case LogoLayout.Text:
			return <LogoText size={size} />;
	}
}
