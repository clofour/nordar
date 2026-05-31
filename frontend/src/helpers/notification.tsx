import { defaultVariantColorsResolver, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCircleCheck, IconExclamationCircle, IconInfoCircle } from "@tabler/icons-react";

export enum NotificationType {
	Error,
	Warning,
	Information,
	Success
}

const notificationConfigs = {
	[NotificationType.Error]: {
		color: "red",
		icon: IconAlertCircle,
	},
	[NotificationType.Warning]: {
		color: "yellow",
		icon: IconExclamationCircle
	},
	[NotificationType.Information]: {
		color: "blue",
		icon: IconInfoCircle
	},
	[NotificationType.Success]: {
		color: "green",
		icon: IconCircleCheck
	}
}

export function useNotification() {
	const theme = useMantineTheme();

	return (message: string, type: NotificationType) => {
		const notificationConfig = notificationConfigs[type];

		const colors = defaultVariantColorsResolver({
			color: notificationConfig["color"],
			variant: "light",
			theme: theme
		});
		const Icon = notificationConfig["icon"]

		console.log(colors);
		notifications.show({
			message: message,
			position: "top-center",
			icon: <Icon size={16} color={colors["color"]} />,
			color: colors["background"],
			style: {
				backgroundColor: colors["background"],
				border: `1px solid ${colors["color"]}`
			}
		});
	}
}
