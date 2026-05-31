import { NotificationType, useNotification } from "@/helpers";
import { Button } from "@mantine/core";

export default function LandingPage() {
    const notify = useNotification();

    return (
        <Button
            onClick={() => (notify("YOUR BANK IS BEING ROBBEDYOUR BANK IS BEING R", NotificationType.Error))}
        />
    );
}
