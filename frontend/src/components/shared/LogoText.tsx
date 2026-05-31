import { Text } from "@mantine/core";

type LogoTextProps = {
    size: string;
};

export default function LogoText({ size }: LogoTextProps) {
    return (
        <Text
            size={size}
            fw={500}
        >Nordar</Text>
    )
}
