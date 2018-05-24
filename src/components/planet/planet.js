import React, { Component } from 'react';
import Satellite from '../satellite/satellite';
import { inspectResponse } from '../utilities/utilities';

export default class Planet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				name: '',
				radiusKM: '',
				rotationVelocityKMH: '',
				aphelionAU: '',
				perihelionAU: '',
				orbitVelocityKMS: '',
				satellites: [],
			},
			messages: {
				status: '',
				message: '',
			},
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleAddSatellite = this.handleAddSatellite.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({data: {...this.state.data, [name]: value }});
	}
	
	handleAddSatellite(newSatellite) {
		this.setState((prevState) => ({
			data: { ...this.state.data, satellites: [...prevState.data.satellites, newSatellite] }
		}));
	}

	handleDeleteSatellite(id) {
		this.setState({
			data: { ...this.state.data, satellites: this.state.data.satellites.filter((value) => value.name !== id) }
		});
	}
	
	handleSave(event) {
		event.preventDefault();
		
		const apiBaseUri = "http://localhost:3001/planets/",
			init = {
				body: JSON.stringify(this.state.data),
				method: 'POST',
				mode: 'cors',
				cache: 'default',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
				}
			};
		
		fetch(apiBaseUri, init)
			.then(inspectResponse)
			.then(({status, data}) => {
				if (status >= 200 && status <= 299) {
					console.log(data, status);
				} else {
					this.setState({
						messages: { ...this.state.messages, status: 401, message: data.message }
					});
				}
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			});
	}


	render() {
		
		const satellites = this.state.data.satellites.map((item) => {
			return (<li key={item.name}>{item.name} <input name="deleteSatellite" value="Delete" type="button" onClick={() => this.handleDeleteSatellite(item.name)} /></li>);
		});
		
		return (
			<React.Fragment>
				<form>
					<div>
						<label htmlFor="name">Name</label>
						<input id="name" name="name" type="text" value={this.state.data.name} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="radius">Radius (km)</label>
						<input id="radius" name="radiusKM" type="number" value={this.state.data.radiusKM} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="rotation">Rotation (km/h)</label>
						<input id="rotation" name="rotationVelocityKMH" type="number" value={this.state.data.rotationVelocityKMH} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="aphelion">Aphelion (AU)</label>
						<input id="aphelion" name="aphelionAU" type="number" value={this.state.data.aphelionAU} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="perihelion">Perihelion (AU)</label>
						<input id="perihelion" name="perihelionAU" type="number" value={this.state.data.perihelionAU} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="orbit">Orbit (km/s)</label>
						<input id="orbit" name="orbitVelocityKMS" type="number" value={this.state.data.orbitVelocityKMS} onChange={this.handleChange} />
					</div>
					<input name="add" type="submit" value="submit" onClick={this.handleSave} />
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