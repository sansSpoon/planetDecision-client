export function inspectResponse(response) {
	return response.json().then((data) => ({
			status: response.status,
			data,
		})
	);
}