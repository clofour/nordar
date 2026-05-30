export const cFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
	const response = await fetch(url, {
		...options,
		credentials: "include",
	});

	const contentType = response.headers.get("content-type");
	const body = [204, 205, 304].includes(response.status) ? "" : await response.text();
	let data = body;

	if (contentType?.includes("application/json") && data.length > 0) {
		data = JSON.parse(body);
	}

	return {
		data,
		status: response.status,
		headers: response.headers,
	} as T;
};
