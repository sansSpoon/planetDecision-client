import React, { Component } from 'react';
import Satellite from '../satellite/satellite';

export default class Planet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			radius: '',
			rotation: '',
			aphelion: '',
			perihelion: '',
			orbit: '',
			satellites: [],
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleAddSatellite = this.handleAddSatellite.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}
	
	handleAddSatellite(sat) {
		const newSatellite = {
			name: sat.name,
			radius: sat.radius,
			rotation: sat.rotation,
			apoapsis: sat.apoapsis,
			periapsis: sat.periapsis,
			orbit: sat.orbit,
		};

		this.setState((prevState) => ({
			satellites: [...prevState.satellites, newSatellite]
		}));

	}
	
/*
	handleDeleteSatellite(id) {
		this.setState({
			hierarchy: this.state.hierarchy.filter((value) => value.name !== id)
		});
	}
*/

	render() {
		
		const satellites = this.state.satellites.map((item) => {
			return (<li key={item.name}>{item.name} <input name="deleteHierarchy" value="Delete" type="button" onClick={() => this.handleDeleteHierarchy(item.name)} /></li>);
		});
		
		return (
			<React.Fragment>
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
				<div>
					<Satellite onSave={this.handleAddSatellite} />
				</div>
				<div>
					<ul>{ satellites }</ul>
				</div>
			</React.Fragment>
		);
	}

}