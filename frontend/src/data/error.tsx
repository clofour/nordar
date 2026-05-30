const errorMessages: Record<number, string> = {
	500: "An error has occurred. Please try again later.",
};

export function getErrorMessage(code: number) {
	return errorMessages[code] ?? "An error has occurred. Please try again later.";
}
