import * as d3 from 'd3';
import 'd3-selection-multi';

import {
	massStar, orbitPlanet, massPlanet, orbitSatellite, massSatellite,
} from '../utilities/d3Utilities';


// // Main Render ////
// ///////////////////

export default function render(root, renderdata, stateUI) {

	// ! Render Systems
	// ----------------

	// data join
	let system = d3.select(root).selectAll('.system')
		.data(renderdata);

	// remove old systems
	system.exit().remove();

	// add and update new systems
	system = system.enter() // enter add div
		.append('div')
		.attr('class', 'system')
		.attr('id', (d) => d.name.replace(' ', '-').toLowerCase())
		.merge(system); // enter and update


	// ! Render Hierarchies
	// --------------------

	// data join
	let hierarchy = system.selectAll('.hierarchy')
		.data((d) => d.hierarchies);

	// remove old hierarchies
	hierarchy.exit().remove();

	// add and update new hierarchies
	hierarchy = hierarchy.enter()
		.append('div')
		.attr('class', 'hierarchy')
		.merge(hierarchy);


	// ! Render Stars
	// --------------

	// data join
	let star = hierarchy.selectAll('.star')
		.data((d) => [d.star]);

	star
		.transition()
		.duration(1000)
		.styles(massStar(stateUI));

	// remove old stars
	star.exit().remove();

	// add and update new stars
	star = star.enter()
		.append('div')
		.attrs({
			class: 'star',
			id(d) { return d.name.replace(' ', '-').toLowerCase(); },
		})
		.styles(massStar(stateUI))
		.merge(star);


	// ! Render Planets
	// ----------------

	// data join
	let pOrbit = hierarchy.selectAll('.orbit').data((d) => d.planets);

	// update orbits
	pOrbit
		.transition()
		.duration(1000)
		.styles(orbitPlanet(stateUI));

	// remove old orbits
	pOrbit.exit().remove();

	// add new orbits
	pOrbit = pOrbit.enter()
		.append('div')
		.attrs({
			class: 'orbit',
			id(d) { return d.name.replace(' ', '-').toLowerCase(); },
		})
		.styles(orbitPlanet(stateUI))
		.merge(pOrbit);


	// data join
	let planet = pOrbit.selectAll('.planet').data((d) => [d]);

	// update planets
	planet
		.transition()
		.duration(1000)
		.styles(massPlanet(stateUI));

	// remove old planets
	planet.exit().remove();

	// add new planets
	planet = planet.enter()
		.append('div')
		.attrs({ class: 'planet' })
		.styles(massPlanet(stateUI))
		.merge(planet);



	// ! Render Satellites
	// -------------------


	// data join
	let sOrbit = planet.selectAll('.orbit-sat').data((d) => d.satellites);

	// update orbits
	sOrbit
		.transition()
		.duration(1000)
		.styles(orbitSatellite(stateUI));

	// remove old orbits
	sOrbit.exit().remove();

	// add new orbits
	sOrbit = sOrbit.enter()
		.append('div')
		.attrs({
			class: 'orbit-sat',
			id(d) { return d.name.replace(' ', '-').toLowerCase(); },
		})
		.styles(orbitSatellite(stateUI))
		.merge(sOrbit);

	// data join
	let satellite = sOrbit.selectAll('.satellite').data((d) => [d]);

	// update satellite
	satellite
		.transition()
		.duration(1000)
		.styles(massSatellite(stateUI));

	// remove old satellite
	satellite.exit().remove();

	// add new planets
	satellite = satellite.enter()
		.append('div')
		.attrs({ class: 'satellite' })
		.styles(massSatellite(stateUI))
		.merge(satellite);
}
