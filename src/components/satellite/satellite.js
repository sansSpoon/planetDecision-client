import React, { Component } from 'react';

class Planet extends Component {

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
					<label htmlFor="apoapsis">Apoapsis (AU)</label>
					<input id="apoapsis" name="apoapsis" type="number" value={this.state.apoapsis} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="periapsis">Periapsis (AU)</label>
					<input id="periapsis" name="periapsis" type="number" value={this.state.periapsis} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="orbit">Orbit (km/s)</label>
					<input id="orbit" name="orbit" type="number" value={this.state.orbit} onChange={this.handleChange} />
				</div>
			</form>
		);
	}

}