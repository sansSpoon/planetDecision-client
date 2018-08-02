// Fetch response wrapper
export function inspectResponse(response) {
	return response.json().then((data) => ({
			status: response.status,
			data,
		})
	);
}

// stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
export function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

// Convert Camel case to Sentance(default)/Title(2)/Lower(3)/Upper(4) case
export function notCamelCase(str, titleCase) {
	if (!str) {
		return '';
	}
	const spaced = str.replace(/([A-Z]+)/g, " $1").replace('_',' ');
	switch (titleCase) {
		case 4: return spaced.toUpperCase();
		case 3: return spaced.toLowerCase();
		case 2: return spaced.charAt(0).toUpperCase() + spaced.slice(1);
		default: return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
	}
}
