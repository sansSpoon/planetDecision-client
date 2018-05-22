import React, { Component } from 'react';
import { inspectResponse } from '../utilities/utilities';

export default class Star extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			radiusKM: '',
			rotationVelocityKMH: '',
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
		event.preventDefault();
		
		const apiBaseUri = "http://localhost:3001/stars/",
			initGet = {
				body: JSON.stringify(this.state),
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
		return (
			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="radius">Radius (km)</label>
					<input id="radius" name="radiusKM" type="text" value={this.state.radiusKM} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="rotation">Rotation (km/h)</label>
					<input id="rotation" name="rotationVelocityKMH" type="text" value={this.state.rotationVelocityKMH} onChange={this.handleChange} />
				</div>
				<input name="save" value="save" type="submit" onClick={this.handleSave} />
			</form>
		);
	}

}