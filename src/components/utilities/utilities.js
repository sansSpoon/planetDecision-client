import * as d3 from 'd3';
import 'd3-selection-multi';
import data from './data';

export const config = {
	ids: {
		// universe: document.getElementById('universe'),
		toggle2d: document.getElementById('toggle-2d'),
		toggle3d: document.getElementById('toggle-3d'),
		toggleFind: document.getElementById('toggle-find'),
		toggleAnimation: document.getElementById('toggle-animation'),
		starScale: document.getElementById('starScale'),
		planetScale: document.getElementById('planetScale'),
		orbitScale: document.getElementById('orbitScale'),
		heliosphere: document.getElementById('heliosphere'),
		galaxy: document.getElementById('galaxy'),
		sScale: document.getElementById('sScale'),
		sOrbit: document.getElementById('sOrbit'),
		centreText: document.getElementById('centreText'),
		centre: document.getElementById('centre'),
	},
	d3s: {
		galaxy: d3.select('#galaxy'),
	},
};

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
const planetMaxOrbit = Math.max(...data[0].hierarchies[0].planets.map(_apsisAvg));

// Count of planets
const planetCount = data[0].hierarchies[0].planets.length;

// Scale Planet Orbits
const orbitsScaled = d3.scaleLinear()
	.domain([0, planetMaxOrbit])
	.range([data[0].hierarchies[0].star.radiusKM / 100000 * config.ids.starScale.value, config.ids.heliosphere.value]);

export function _rescale() {
	orbitsScaled.range([data[0].hierarchies[0].star.radiusKM / 100000 * config.ids.starScale.value, config.ids.heliosphere.value]);
}

// // STAR /////
// /////////////

// Scale Star
export function _massStar(d) {
	const unit = '%';
	const calc = Math.round(d.radiusKM / 100000 * config.ids.starScale.value);

	return {
		width: `${calc}${unit}`,
		height: `${calc}${unit}`,
	};
}

// // PLANET /////
// ///////////////

// Apply lerp to planet orbits
export function _orbitPlanet(d, i) {
	const unit = '%';
	const orbit = _apsisAvg(d);
	const evenOrbit = Math.round((planetMaxOrbit / planetCount) * (i + 1));
	const orbitDuration = _kepler3(orbit);
	const scaledOrbit = Math.round(orbitsScaled(_lerp(config.ids.orbitScale.value, orbit, evenOrbit)));

	// console.log(`${orbit} - ${evenOrbit} - ${scaledOrbit} - ${d.name}`);

	return {
		width: `${scaledOrbit}${unit}`,
		height: `${scaledOrbit}${unit}`,
		'animation-duration': `${parseFloat(orbitDuration / 4).toFixed(2)}s`,
	};
}

// Scale Planet
export function _massPlanet(d) {

	const unit = 'px';
	const scale = 1000;
	const calc = Math.round((d.radiusKM) / scale * config.ids.planetScale.value);

	const orbit = _apsisAvg(d);
	const orbitDuration = _kepler3(orbit);

	return {
		width: `${calc}${unit}`,
		height: `${calc}${unit}`,
		'margin-right': `${-Math.round(calc / 2)}${unit}`,
		'animation-duration': `${parseFloat(orbitDuration / 4).toFixed(2)}s`,
	};
}

// // SATELLITE /////
// //////////////////

// Apply lerp to satellite orbits
export function _orbitSatellite(d, i) {
	const unit = 'px';
	const planetMass = Math.round(d3.select(this.parentNode).datum().radiusKM / 1000 * config.ids.planetScale.value);
	const orbit = _apsisAvg(d);
	const orbitCount = d3.select(this.parentNode).datum().satellites.length;
	const orbitMax = Math.max(...d3.select(this.parentNode).datum().satellites.map(_apsisAvg));
	const evenOrbit = Math.round((orbitMax / orbitCount) * (i + 1));
	const scaledOrbit = Math.round(_lerp(config.ids.sOrbit.value, orbit, evenOrbit));

	// console.log(`${orbit} - ${evenOrbit} - ${scaledOrbit} - ${d.name}`);
	// console.log(`${orbit} - ${orbitCount} - ${orbitMax} - ${d.name}`);

	return {
		width: `${scaledOrbit + planetMass}${unit}`,
		height: `${scaledOrbit + planetMass}${unit}`,
		left: `${-(scaledOrbit) / 2}${unit}`,
		top: `${-(scaledOrbit) / 2}${unit}`,
	};
}

// Scale Satellite
export function _massSatellite(d) {

	const unit = 'px';
	const scale = 1000;
	const calc = Math.round((d.radiusKM) / scale * config.ids.sScale.value);

	return {
		width: `${calc}${unit}`,
		height: `${calc}${unit}`,
		'margin-right': `${-Math.round(calc / 2)}${unit}`,
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