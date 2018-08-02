import * as d3 from 'd3';
import 'd3-selection-multi';


// Average out a body's orbit and apply a scale
function _apsisAvg(body) {
	const s = body.hasOwnProperty('aphelionAU') ? 10 : 1495.97871; // *10 is just to have easier numbers to work with
	const a = body.hasOwnProperty('aphelionAU') ? body.aphelionAU : body.apoapsisAU;
	const p = body.hasOwnProperty('perihelionAU') ? body.perihelionAU : body.periapsisAU;

	return Math.round((a + p) / 2 * s);
}

// returns a position: x that is n percent between y0 and y1
// As orbits are x only, y values are fixed to 0(start) - 1(end)
function _lerp(n, x0, x1) {
	const y0 = 1;
	const y1 = 2;
	const x = ((y1 - n) * x0 + (n - y0) * x1) / (y1 - y0);

	return x;
}

// Kepler's 3rd Law
function _kepler3(Rp) {
	const Tp = 1.0 * Math.pow((Rp / 1.0), 3 / 2); // eslint-disable-line
	return Tp;
}

// Max planetary orbit
function _planetMaxOrbit(planets) {
	return Math.max(...planets.map(_apsisAvg));
}

// Scale Planet Orbits
function _orbitsScaled(star, starScale, planets, heliosphere) {
	const orbitsScaled = d3.scaleLinear()
		.domain([0, _planetMaxOrbit(planets)])
		.range([star / 100000 * starScale, heliosphere]);
	return orbitsScaled;
}

export function rescale(star, starScale, heliosphere, orbitsScaled) {
	orbitsScaled.range([star.radiusKM / 100000 * starScale, heliosphere]);
}

// // STAR /////
// /////////////

// Scale Star
export function massStar(stateUI) {
	return function _massStar(d) {
		const unit = '%';
		const calc = Math.round(d.radiusKM / 100000 * stateUI.starScale);
	
		return {
			width: `${calc}${unit}`,
			height: `${calc}${unit}`,
		};
	};
}

// // PLANET /////
// ///////////////

// Apply lerp to planet orbits
export function orbitPlanet(stateUI) {
	return function _orbitPlanet(d, i, nodes) {
		const unit = '%';
		const orbit = _apsisAvg(d);
		const planets = d3.select(this.parentNode).datum().planets;
		const star = d3.select(this.parentNode).datum().star;
		const evenOrbit = Math.round((_planetMaxOrbit(planets) / nodes.length) * (i + 1));
		const orbitDuration = _kepler3(orbit);
		const scaledOrbit = _orbitsScaled(star.radiusKM, stateUI.starScale, planets, stateUI.heliosphere);
		const finalOrbit = Math.round(scaledOrbit(_lerp(stateUI.planetOrbitScale, orbit, evenOrbit)));

		return {
			width: `${finalOrbit}${unit}`,
			height: `${finalOrbit}${unit}`,
			'animation-duration': `${parseFloat(orbitDuration / 4).toFixed(2)}s`,
		};
	};
}

// Scale Planet
export function massPlanet(stateUI) {
	return function _massPlanet(d) {
	
		const unit = 'px';
		const scale = 1000;
		const calc = Math.round((d.radiusKM) / scale * stateUI.planetScale);
	
		const orbit = _apsisAvg(d);
		const orbitDuration = _kepler3(orbit);
	
		return {
			width: `${calc}${unit}`,
			height: `${calc}${unit}`,
			'margin-right': `${-Math.round(calc / 2)}${unit}`,
			'animation-duration': `${parseFloat(orbitDuration / 4).toFixed(2)}s`,
		};
	};
}

// // SATELLITE /////
// //////////////////

// Apply lerp to satellite orbits
export function orbitSatellite(stateUI) {
	return function _orbitSatellite(d, i) {
		const unit = 'px';
		const planetMass = Math.round(d3.select(this.parentNode).datum().radiusKM / 1000 * stateUI.planetScale);
		const orbit = _apsisAvg(d);
		const orbitCount = d3.select(this.parentNode).datum().satellites.length;
		const orbitMax = Math.max(...d3.select(this.parentNode).datum().satellites.map(_apsisAvg));
		const evenOrbit = Math.round((orbitMax / orbitCount) * (i + 1));
		const scaledOrbit = Math.round(_lerp(stateUI.satelliteOrbit, orbit, evenOrbit));
	
		// console.log(`${orbit} - ${evenOrbit} - ${scaledOrbit} - ${d.name}`);
		// console.log(`${orbit} - ${orbitCount} - ${orbitMax} - ${d.name}`);
	
		return {
			width: `${scaledOrbit + planetMass}${unit}`,
			height: `${scaledOrbit + planetMass}${unit}`,
			left: `${-(scaledOrbit) / 2}${unit}`,
			top: `${-(scaledOrbit) / 2}${unit}`,
		};
	};
}

// Scale Satellite
export function massSatellite(stateUI) {
	return function _massSatellite(d) {
	
		const unit = 'px';
		const scale = 1000;
		const calc = Math.round((d.radiusKM) / scale * stateUI.satelliteScale);
	
		return {
			width: `${calc}${unit}`,
			height: `${calc}${unit}`,
			'margin-right': `${-Math.round(calc / 2)}${unit}`,
		};
	};
}


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

// Toggle 2d and 3d animation
export function toggleAnimation(root, ui2d, ui3d) {
	if(ui2d) {
		d3.select(root).selectAll('.system').classed('animate-2d', true);
		d3.select(root).selectAll('.system').classed('animate-3d', false);
	} else if(ui3d) {
		d3.select(root).selectAll('.system').classed('animate-2d', false);
		d3.select(root).selectAll('.system').classed('animate-3d', true);
	} else {
		d3.select(root).selectAll('.system').classed('animate-2d', false);
		d3.select(root).selectAll('.system').classed('animate-3d', false);
	}
	
}