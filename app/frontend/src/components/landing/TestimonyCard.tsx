import { Group, Image, Stack, Text } from "@mantine/core";
import classes from "./TestimonyCard.module.css";
import type { CSSProperties, ReactNode } from "react";
import Card from "./Card";

type TestimonyCardProps = {
    testimony: string;
    image: string;
    name: string;
    description: string;
};

export default function TestimonyCard({ testimony, image, name, description }: TestimonyCardProps) {
    return (
        <Card>
            <Stack w="100%" ta="left">
                <div className={classes.testimony}>{testimony}</div>
                <Group w="100%">
                    <Image src={image} h="40px" w="40px" radius="50%"></Image>
                    <Stack gap="0">
                        <div className={classes.name}>{name}</div>
                        <div className={classes.description}>{description}</div>
                    </Stack>
                </Group>
            </Stack>
        </Card>
    );
}
