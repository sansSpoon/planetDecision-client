import React, { Component } from 'react';

export default class Planet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="radius">Radius (km)</label>
					<input id="radius" name="radius" type="number" value={this.state.radius} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="rotation">Rotation (km/h)</label>
					<input id="rotation" name="rotation" type="number" value={this.state.rotation} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="aphelion">Aphelion (AU)</label>
					<input id="aphelion" name="aphelion" type="number" value={this.state.aphelion} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="perihelion">Perihelion (AU)</label>
					<input id="perihelion" name="perihelion" type="number" value={this.state.perihelion} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="orbit">Orbit (km/s)</label>
					<input id="orbit" name="orbit" type="number" value={this.state.orbit} onChange={this.handleChange} />
				</div>
			</form>
		);
	}

}