import React, { Component } from 'react';
import { inspectResponse } from '../utilities/utilities';

export default class System extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				systemName: '',
				hierarchyName: '',
				systems: [],
				hierarchies: [],
			},
			messages: {
				status: '',
				message: '',
			},
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
	
	handleAddHierarchy(event) {
		const newHierarchy = {
			name: this.state.data.hierarchyName,
			//star: '',
			//planets: [],
		};
		this.setState((prevState) => (
			{ data: { ...this.state.data, hierarchies: [...prevState.data.hierarchies, newHierarchy] } }
		));
	}
	
	handleDeleteHierarchy(id) {
		this.setState(
			{ data: { ...this.state.data, hierarchies: this.state.data.hierarchies.filter((value) => value.name !== id) } }
		);
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
			/*
.then(({status, data}) => {
				if (status >= 200 && status <= 299) {
					console.log(data, status);
				} else {
					
				}
			})
*/
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			});
			
	
	
	
		/*
this.setState(
			{ data: { ...this.state.data, systems: this.state.data.systems.filter((value) => value._id !== id) } }
		);
*/
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
						{ data: { ...this.state.data, systems: data } }
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
					this.setState({ data: { ...this.state.data, systemName: '', hierarchyName: '', hierarchies: [] } });
					
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
		
		const systems = this.state.data.systems.map((item) => {
			return (<li key={item._id}>{item.name} <input name="deleteSystem" value="Delete" type="button" onClick={() => this.handleDeleteSystem(item._id)} /></li>);
		});
		
		const hierarchies = this.state.data.hierarchies.map((item) => {
			return (<li key={item.name}>{item.name} <input name="deleteHierarchy" value="Delete" type="button" onClick={() => this.handleDeleteHierarchy(item.name)} /></li>);
		});
		
		return (
			<React.Fragment>
				<form>
					<div>
						<label htmlFor="name">Name</label>
						<input id="systemName" name="systemName" type="text" value={this.state.data.systemName} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="hierarchy">Hierarchy</label>
						<input id="hierarchyName" name="hierarchyName" type="text" value={this.state.data.hierarchyName} onChange={this.handleChange} />
					</div>
					<input name="addHierarchy" value="Add Hierarchy" type="button" onClick={this.handleAddHierarchy} />
					<div>
						<ul>{ hierarchies }</ul>
					</div>
					<input name="save" value="Save" type="submit" onClick={this.handleSaveSystem} />
				</form>
				<div>
					<ul>{ systems }</ul>
				</div>
			</React.Fragment>
		);
		
	}

}