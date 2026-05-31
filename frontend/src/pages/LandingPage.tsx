import { NotificationType, notify } from "@/helpers";
import { Button } from "@mantine/core";

export default function LandingPage() {
    return (
        <Button
            onClick={() => (notify("YOUR BANK IS BEING ROBBED", NotificationType.Error))}
        />
    );
}
