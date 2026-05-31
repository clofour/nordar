export function assert(condition: boolean, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

export function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function durationToMinutes(duration: string) {
	const [hours, minutes] = duration.split(":").map(Number);

	if (hours != null && minutes != null) {
		return hours * 60 + minutes;
	} else {
		throw RangeError("The duration format is incorrect.");
	}
}
