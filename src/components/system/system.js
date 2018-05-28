import React, { Component } from 'react';
import { inspectResponse } from '../utilities/utilities';
import Hierarchy from '../hierarchy/hierarchy';

export default class System extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				systemName: '',
				hierarchyName: '',
				hierarchies: [],
			},
			messages: {
				status: '',
				message: '',
			},
			ui: {
				currentSystem: '',
				currentHierarchy: '',
				systems: [],
			}
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleAddHierarchy = this.handleAddHierarchy.bind(this);
		this.handleSaveSystem = this.handleSaveSystem.bind(this);
		this.handleGetSystems = this.handleGetSystems.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({data: {...this.state.data, [name]: value }});
	}
	
	handleAddHierarchy(hierarchy) {
		
/*
		const newHierarchy = {
			name: this.state.data.hierarchyName,
			//star: '',
			//planets: [],
		};
		this.setState((prevState) => (
			{ data: { ...this.state.data, hierarchies: [...prevState.data.hierarchies, newHierarchy] } }
		));
*/

		if(hierarchy._id) {
			const tempHierarchy = this.state.data.hierarchies
			const index = tempHierarchy.findIndex((item) => item._id === hierarchy._id);
			tempHierarchy.splice(index, 1, hierarchy);
			
			this.setState(
				{	data: { ...this.state.data, hierarchies: tempHierarchy }}
			);
		} else {
			this.setState((prevState) => ({
				data: { ...this.state.data, hierarchies: [...prevState.data.hierarchies, hierarchy] }
			}));
		}
		
		
		
		
	}
	
	handleDeleteHierarchy(id) {
		this.setState(
			{ data: { ...this.state.data, hierarchies: this.state.data.hierarchies.filter((value) => value.name !== id) } }
		);
	}
	
	handleActiveSystem(id) {
		if(id) {
			this.setState(
				{ ui: { ...this.state.ui,
						currentSystem: id._id,
					},
					data: { ...this.state.data,
						systemName: id.name,
						hierarchies: id.hierarchies
					},
				}
			);
		} else {
			this.setState(
				{ ui: { ...this.state.ui,
						currentSystem: '',
					},
					data: { ...this.state.data,
						systemName: '',
						hierarchies: '',
					},
				}
			);
		}
	}
	
	handleActiveHierarchy(id) {
		console.log(id);
		if(id) {
			this.setState(
				{ ui: { ...this.state.ui, currentHierarchy: id, } }
			);
		} else {
			this.setState(
				{ ui: { ...this.state.ui, currentHierarchy: '', } }
			);
		}
	}
	
	handleDeleteSystem(id) {
	
		const apiBaseUri = "http://localhost:3001/systems/",
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
				this.handleGetSystems();
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			});
	}
	
	handleGetSystems() {
		console.log("SYSTEM handleGetSystems");
		const apiBaseUri = "http://localhost:3001/systems/",
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
						{ ui: { ...this.state.ui, systems: data } }
					);
				} else {
					this.setState(
						{ messages: { ...this.state.messages, status: 401, message: data.message } }
					);
				}
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			}); 
	}
	
	handleSaveSystem(event) {

		event.preventDefault();
		
		const apiBaseUri = "http://localhost:3001/systems/",
			payload = {
				"name": this.state.data.systemName,
				"hierarchies": this.state.data.hierarchies
			},
			init = {
				body: JSON.stringify(payload),
				method: this.state.ui.currentSystem ? 'PUT' : 'POST',
				mode: 'cors',
				cache: 'default',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
				}
			};
		
		fetch(`${apiBaseUri}${this.state.ui.currentSystem}`, init)
			.then(inspectResponse)
			.then(({status, data}) => {
				if (status >= 200 && status <= 299) {
					console.log(data, status);
					this.setState(
						{ data: { ...this.state.data, systemName: '', hierarchyName: '', hierarchies: [] },
						  ui: { ...this.state.ui, currentSystem: '' }
						}
					);
					
					this.handleGetSystems();
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
		console.log("SYSTEM componentDidMount");
		this.handleGetSystems();
	}
	
	componentDidUpdate() {
		console.log("SYSTEM componentDidUpdate");
	}

	render() {
		
		const systems = this.state.ui.systems.map((item) => {
			return (
				<li key={item._id}>{item.name}
					<input name="editSystem" value="Edit" type="button" onClick={() => this.handleActiveSystem(item)} />
					<input name="deleteSystem" value="Delete" type="button" onClick={() => this.handleDeleteSystem(item._id)} />
				</li>
			);
		});
		
		const hierarchies = this.state.data.hierarchies.map((item) => {
			return (
				<li key={item.name}>{item.name}
					<input name="editHierarchy" value="Edit" type="button" onClick={() => this.handleActiveHierarchy(item)} />
					<input name="deleteHierarchy" value="Delete" type="button" onClick={() => this.handleDeleteHierarchy(item._id)} />
				</li>
			);
		});
		
		return (
			<React.Fragment>
			<h3>System</h3>
			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input id="systemName" name="systemName" type="text" value={this.state.data.systemName} onChange={this.handleChange} />
				</div>
				<input name="save" value={(this.state.ui.currentSystem)?"Update":"Save"} type="submit" onClick={this.handleSaveSystem} />
			</form>
			<div>
				<ul>{ systems }</ul>
			</div>
{/*
				<div>
					<label htmlFor="hierarchy">Hierarchy</label>
					<input id="hierarchyName" name="hierarchyName" type="text" value={this.state.data.hierarchyName} onChange={this.handleChange} />
				</div>
*/}

				<Hierarchy addHierarchy={this.handleAddHierarchy} currentHierarchy={this.state.ui.currentHierarchy} />
				
				<div>
					<ul>{ hierarchies }</ul>
				</div>
				
			</React.Fragment>
		);
		
	}

}