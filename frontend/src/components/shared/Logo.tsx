import { Image } from "@mantine/core";
import type { ImageProps } from "@mantine/core";

export enum LogoLayout {
	Horizontal = "horizontal.svg",
	Vertical = "vertical.svg",
	Text = "text.svg",
}

type LogoProps = {
	layout: LogoLayout;
} & Omit<ImageProps, "src">;

export default function Logo({ layout, ...props }: LogoProps) {
	return <Image src={`/${layout}`} {...props} />;
}
