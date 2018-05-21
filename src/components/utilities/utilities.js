export function inspectResponse(response) {
	return response.json().then((json) => ({
			status: response.status,
			data: json,
		})
	);
}