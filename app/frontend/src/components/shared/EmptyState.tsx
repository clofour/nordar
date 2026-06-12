import { Button, Paper, Stack, Text } from "@mantine/core";
import type { Icon } from "@tabler/icons-react";

export interface EmptyStateProps {
    Icon: Icon;
    text: string;
    description: string;
    cta: string;
    onCtaClick?: () => void;
}

export default function EmptyState({ Icon, text, description, cta, onCtaClick }: EmptyStateProps) {
    return (
        <Paper withBorder>
            <Stack justify="center" align="center" p="lg" gap="lg">
                <Icon size={64} color="var(--mantine-primary-color-filled)" stroke={1} strokeOpacity={0.7} />

                <Stack justify="center" align="center" gap={0}>
                    <Text>{text}</Text>
                    <Text c="dimmed">{description}</Text>
                </Stack>

                <Button onClick={onCtaClick}>{cta}</Button>
            </Stack>
        </Paper>
    );
}
