import React, { Component } from 'react';

export default class Satellite extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			radiusKM: '',
			rotationVelocityKMH: '',
			apoapsisAU: '',
			periapsisAU: '',
			orbitVelocityKMS: '',
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}
	
	handleSave(event) {
		this.props.onSave(this.state)
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
					<input id="radius" name="radiusKM" type="number" value={this.state.radiusKM} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="rotation">Rotation (km/h)</label>
					<input id="rotation" name="rotationVelocityKMH" type="number" value={this.state.rotationVelocityKMH} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="apoapsis">Apoapsis (AU)</label>
					<input id="apoapsis" name="apoapsisAU" type="number" value={this.state.apoapsisAU} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="periapsis">Periapsis (AU)</label>
					<input id="periapsis" name="periapsisAU" type="number" value={this.state.periapsisAU} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="orbit">Orbit (km/s)</label>
					<input id="orbit" name="orbitVelocityKMS" type="number" value={this.state.orbitVelocityKMS} onChange={this.handleChange} />
				</div>
				<input name="add" type="button" value="add" onClick={this.handleSave} />
			</form>
		);
	}

}