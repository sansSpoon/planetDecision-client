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
			ui: {
				currentPlanet: '',
				currentSatellite: '',
				planets: [],
			}
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
	
	handleActivePlanet(id) {
		if(id) {
			console.log(id);
			this.setState(
				{ data: { ...this.state.data,
						name: id.name,
						radiusKM: id.radiusKM,
						rotationVelocityKMH: id.rotationVelocityKMH,
						aphelionAU: id.aphelionAU,
						perihelionAU: id.perihelionAU,
						orbitVelocityKMS: id.orbitVelocityKMS,
						satellites: id.satellites,
					},
					ui: { ...this.state.ui,
						currentPlanet: id,
					},
				}
			);
		} else {
			this.setState(
				{ data: { ...this.state.data,
						name: '',
						radiusKM: '',
						rotationVelocityKMH: '',
						aphelionAU: '',
						perihelionAU: '',
						orbitVelocityKMS: '',
						satellites: [],
					},
					ui: { ...this.state.ui,
						currentPlanet: '',
						currentSatellite: '',
						//planets: [],
					},
				}
			);
		}
	}
	
	handleActiveSatellite(id) {
		console.log(id);
		if(id) {
			this.setState(
				{ ui: { ...this.state.ui, currentSatellite: id, } }
			);
		} else {
			this.setState(
				{ ui: { ...this.state.ui, currentSatellite: '', } }
			);
		}
	}
	
	handleGetPlanets() {
		console.log("PLANETS handleGetPlanets");
		const apiBaseUri = "http://localhost:3001/planets/",
			init = {
				method: 'GET',
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
					this.setState(
						{ ui: { ...this.state.ui, planets: data } }
					);
				} else {
					this.setState(
						{ messages: { ...this.state.messages, status: status, message: data.message } }
					);
				}
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			}); 
	}
	
	handleDeletePlanet(id) {
	
		const apiBaseUri = "http://localhost:3001/planets/",
			init = {
				method: 'DELETE',
				mode: 'cors',
				cache: 'default',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
				}
			};
		
		fetch(`${apiBaseUri}${id}`, init)
			.then((response) => {
				if(!response.ok) {
					this.setState(
						{	messages: { ...this.state.messages, status: response.status, message: "Delete failed." } }
					);
				}
				this.handleGetPlanets();
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			});
	}
	
	handleAddSatellite(satellite) {
		if(satellite._id) {
			const tempSatellites = this.state.data.satellites
			const index = this.state.data.satellites.findIndex((sat) => sat._id === satellite._id);
			tempSatellites.splice(index, 1, satellite);
			
			this.setState(
				{	data: { ...this.state.data, satellites: tempSatellites }}
			);
		} else {
			this.setState((prevState) => ({
				data: { ...this.state.data, satellites: [...prevState.data.satellites, satellite] }
			}));
		}
	}

	handleDeleteSatellite(id) {
		this.setState({
			data: { ...this.state.data, satellites: this.state.data.satellites.filter((value) => value.name !== id) }
		});
	}
	
	handleSave(event) {
		event.preventDefault();
		
		console.log(this.state.ui.currentPlanet);
		
		const apiBaseUri = "http://localhost:3001/planets/",
			init = {
				body: JSON.stringify(this.state.data),
				method: this.state.ui.currentPlanet ? 'PUT' : 'POST',
				mode: 'cors',
				cache: 'default',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
				}
			};
		
		fetch(`${apiBaseUri}${this.state.ui.currentPlanet ? this.state.ui.currentPlanet._id : ''}`, init)
			.then(inspectResponse)
			.then(({status, data}) => {
				if (status >= 200 && status <= 299) {
					console.log(data, status);
					this.handleActivePlanet();
					this.handleGetPlanets();
				} else {
					this.setState({
						messages: { ...this.state.messages, status: status, message: data.message }
					});
				}
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			});
	}
	
	componentDidMount() {
		console.log("PLANETS componentDidMount");
		this.handleGetPlanets();
	}
	
	componentWillUpdate() {
		
	}

	render() {
		
		const planets = this.state.ui.planets.map((item) => {
			return (
				<li key={item._id}>{item.name}
					<input name="editPlanet" value="Edit" type="button" onClick={() => this.handleActivePlanet(item)} />
					<input name="deletePlanet" value="Delete" type="button" onClick={() => this.handleDeletePlanet(item._id)} />
				</li>
			);
		});
		
		const satellites = this.state.data.satellites.map((item) => {
			return (
				<li key={item.name}>{item.name}
					<input name="editPlanet" value="Edit" type="button" onClick={() => this.handleActiveSatellite(item)} />
					<input name="deleteSatellite" value="Delete" type="button" onClick={() => this.handleDeleteSatellite(item.name)} />
				</li>
			);
		});
		
		return (
			<React.Fragment>
				<h3>Planet</h3>
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
					<input name="save" value={(this.state.ui.currentPlanet)?"Update":"Save"} type="submit" onClick={this.handleSave} />
					<input name="cancel" type="button" value="Cancel" onClick={() => this.handleActivePlanet()} />
				</form>
				
				<div>
					<Satellite onSave={this.handleAddSatellite} currentSatellite={this.state.ui.currentSatellite} />
				</div>
				<div>
					<ul>{ satellites }</ul>
				</div>
				<div>
					<ul>{ planets }</ul>
				</div>
			</React.Fragment>
		);
	}

}