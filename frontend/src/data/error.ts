const errorMessages: Record<number, string> = {
	400: "The request could not be processed due to invalid data. Please review input.",
	401: "Credentials are required for this request. Please authenticate.",
	403: "Access to this resource is restricted.",
	404: "This resource could not be found. Please review input.",
	500: "An error has occurred. Please try again later.",

};

export function getErrorMessage(code: number) {
	return errorMessages[code] ?? errorMessages[500];
}
