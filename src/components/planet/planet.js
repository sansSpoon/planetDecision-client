import React, { Component } from 'react';
import Satellite from '../satellite/satellite';
import { inspectResponse } from '../utilities/utilities';

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
			radiusKM: sat.radius,
			rotationVelocityKMH: sat.rotation,
			apoapsisAU: sat.apoapsis,
			periapsisAU: sat.periapsis,
			orbitVelocityKMS: sat.orbit,
		};

		this.setState((prevState) => ({
			satellites: [...prevState.satellites, newSatellite]
		}));

	}

	handleDeleteSatellite(id) {
		this.setState({
			satellites: this.state.satellites.filter((value) => value.name !== id)
		});
	}
	
	handleSave(event) {
		event.preventDefault();
		
		const apiBaseUri = "http://localhost:3001/planets/",
			payload = {
				"name": this.state.systemName,
				"hierarchies": this.state.hierarchy
			},
			initGet = {
				body: JSON.stringify(payload),
				method: 'POST',
				mode: 'cors',
				cache: 'default',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
				}
			};
		
		fetch(apiBaseUri, initGet)
			.then(inspectResponse)
			.then(({status, data}) => {
				if (status >= 200 || status <= 299) {
					console.log(data);
				} else {
					this.setState({
						status: 401,
						message: data
					});
				}
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			});
	}


	render() {
		
		const satellites = this.state.satellites.map((item) => {
			return (<li key={item.name}>{item.name} <input name="deleteSatellite" value="Delete" type="button" onClick={() => this.handleDeleteSatellite(item.name)} /></li>);
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