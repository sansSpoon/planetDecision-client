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

// get array of planet names
function _planetNames(planets) {
	const planetNames = planets.map((planet) => {
		return planet.name.toLowerCase();
	});
	return planetNames;
}

// returns n random elements from an array
// inspired by: https://stackoverflow.com/a/2450976/1682405
function _getNFromArr(array, n) {
	let length = array.length, temp, index;
	if (n > length) {
		throw new RangeError("getNFromArr: requesting more elements than available");
	}
	while(length) {
		index = Math.floor(Math.random() * (length-=1));
		temp = array[length];
		array[length] = array[index];
		array[index] = temp;
	}
	return array.slice(0,n);
}

export function _getPlanetBounds(planet, planetsData) {

	// find the named planet from the data set
	const foundPlanet = planetsData.find((element) => (
		element.name.toLowerCase() === planet.toLowerCase()
	));

	// build a list of additional properties
	const element = document.getElementById(planet);
	const body = element.children[0];
	const {
		x, y, width, height,
	} = body.getBoundingClientRect();

	const newProperties = {
		element, body, x: Math.round(x), y: Math.round(y), width, height,
	};

	// merge the new properties into the found planet
	const updatedPlanet = Object.assign(newProperties, foundPlanet);

	return updatedPlanet;
}

function _setView(planet) {

	const centerW = window.innerWidth / 2;
	const centerH = window.innerHeight / 2;

	const system = document.getElementById('solar-system');
	const { left, top } = system.getBoundingClientRect();

	system.style.left = `${Math.round((centerW + left) - (planet.x + planet.width / 2))}px`;
	system.style.top = `${Math.round((centerH + top) - (planet.y + planet.height / 2))}px`;

}

// Cycles through list of given planets, centring one each one for a duration
let centringAnimation;

export function centreBody(planetsData, planetsSelect, duration) {

	if (!planetsSelect) {
		planetsSelect = _getNFromArr(_planetNames(planetsData),3);
	} else {
		planetsSelect = planetsSelect.split(' ');
	}
	
	let start = null;
	let last; // used for every n
	let current; // current element of array
	let previous; // previous element of array
	let interval = duration || 3000;
	// let intro = 1000;
	// let outro = 1000;
	// const totalPlanets = planetsSelect.length;

	function update(timestamp) {

		if (!start) start = timestamp;
		// let progress = timestamp - start;
		let track;

		// do something every n seconds (if it can)
		if(!last || timestamp - last >= interval) {
			last = timestamp;

			// pull off the first element in the array to work on
			// allows for previous compare
			if(!current) {
				current = planetsSelect.shift();
			} else {
				previous = current;
				current = planetsSelect.shift();

				// if there are no more elements in the array
				if (current === undefined) {
					current = previous;
				}
			}
		}

		track = _getPlanetBounds(current, planetsData);
		_setView(track);

		if (track) {
			track.element.firstChild.classList.add('answer');
		}
		if(previous && previous !== current) {
			let prevPlanet = document.getElementById(previous);
			prevPlanet.firstChild.classList.remove('answer');
		}

// 		if (progress < interval * totalPlanets) {
			centringAnimation = requestAnimationFrame((timestamp) => update(timestamp));
// 		}

	};

	centringAnimation = requestAnimationFrame((timestamp) => update(timestamp));
}

export function cancelAnimation() {
	cancelAnimationFrame(centringAnimation);
	const system = document.getElementById('solar-system');
	system.style.left = 'auto';
	system.style.top = 'auto';
	const answers = document.querySelectorAll('.answer');
	answers.forEach((el) => el.classList.remove('answer'));
}