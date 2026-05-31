import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCircleCheck, IconExclamationCircle, IconInfoCircle } from "@tabler/icons-react";

export enum NotificationType {
	Error,
	Warning,
	Information,
	Success
}

const notificationColors = {
	[NotificationType.Error]: "red",
	[NotificationType.Warning]: "yellow",
	[NotificationType.Information]: "blue",
	[NotificationType.Success]: "green",
}

const notificationIcons = {
	[NotificationType.Error]: <IconAlertCircle />,
	[NotificationType.Warning]: <IconExclamationCircle />,
	[NotificationType.Information]: <IconInfoCircle />,
	[NotificationType.Success]: <IconCircleCheck />,
}

export function notify(message: string, type: NotificationType) {
	notifications.show({
		message: message,
		position: "top-center",
        icon: notificationIcons[type],
		style: {
			backgroundColor: notificationColors[type]
		}
	});
}

