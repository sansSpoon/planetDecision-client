import React, { Component } from 'react';
import { inspectResponse } from '../utilities/utilities';

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
		};
		
		this.handleAddHierarchy = this.handleAddHierarchy.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({data: {...this.state.data, [name]: value }});
	}
	
	handleAddHierarchy(event) {
		const newHierarchy = {
			name: this.state.hierarchyName,
			//star: '',
			//planets: [],
		};
		this.setState((prevState) => ({
			data: { ...this.state.data, hierarchies: [...prevState.data.hierarchies, newHierarchy] }
		}));
	}
	
	handleDeleteHierarchy(id) {
		this.setState({
			data: { ...this.state.data, hierarchies: this.state.data.hierarchies.filter((value) => value.name !== id) }
		});
	}
	
	handleSave(event) {

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
	
	componentDidMount() {
		console.log("SYSTEM componentDidMount");
		const apiBaseUri = "http://localhost:3001/systems/",
			payload = {
				"name": this.state.data.systemName,
				"hierarchies": this.state.data.hierarchy
			},
			init = {
				//body: JSON.stringify(payload),
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
		
		const hierarchies = this.state.data.hierarchies.map((item) => {
			return (<li key={item.name}>{item.name} <input name="deleteHierarchy" value="Delete" type="button" onClick={() => this.handleDeleteHierarchy(item.name)} /></li>);
		});
		
		return (
			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input id="systemName" name="systemName" type="text" value={this.state.data.name} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="hierarchy">Hierarchy</label>
					<input id="hierarchyName" name="hierarchyName" type="text" value={this.state.data.hierarchyName} onChange={this.handleChange} />
				</div>
				<input name="addHierarchy" value="Add Hierarchy" type="button" onClick={this.handleAddHierarchy} />
				<div>
					<ul>{ hierarchies }</ul>
				</div>
				<input name="save" value="Save" type="submit" onClick={this.handleSave} />
			</form>
		);
		
	}

}