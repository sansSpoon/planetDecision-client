import React, { Component } from 'react';
import { inspectResponse } from '../utilities/utilities';

export default class Star extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				name: '',
				radiusKM: '',
				rotationVelocityKMH: '',
			},
			messages: {
				status: '',
				message: '',
			},
			ui: {
				currentStar: '',
				stars: [],
			},
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({data: {...this.state.data, [name]: value }});
	}
	
	handleActive(id) {
		if(id) {
			this.setState(
				{ data: { ...this.state.data,
						name: id.name,
						radiusKM: id.radiusKM,
						rotationVelocityKMH: id.rotationVelocityKMH,
						_id: id._id,
					},
					ui: { ...this.state.ui,
						currentStar: id,
					},
				},
			);
		} else {
			this.setState(
				{ data: { ...this.state.data,
						name: '',
						radiusKM: '',
						rotationVelocityKMH: '',
						_id: '',
					},
					ui: { ...this.state.ui,
						currentStar: '',
					},
				},
			);
		}
	}
	
	handleSave(event) {
		event.preventDefault();
		
		const apiBaseUri = `${process.env.REACT_APP_APIHOST}:${process.env.REACT_APP_APIPORT}/stars/`,
			payload = this.state.data,
			init = {
				body: JSON.stringify(payload),
				method: this.state.ui.currentStar ? 'PUT' : 'POST',
				mode: 'cors',
				cache: 'default',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
				}
			};
		
		fetch(`${apiBaseUri}${this.state.ui.currentStar ? this.state.ui.currentStar._id : ''}`, init)
			.then(inspectResponse)
			.then(({status, data}) => {
				if (status >= 200 && status <= 299) {
					this.handleActive();
					this.handleGetStars();
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
	
	handleGetStars() {
		const apiBaseUri = `${process.env.REACT_APP_APIHOST}:${process.env.REACT_APP_APIPORT}/stars/`,
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
						{ ui: { ...this.state.ui, stars: data } }
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
	
	handleAddStar(id) {
		this.props.addStar(id);
	}
	
	handleDeleteStar(id) {
	
		const apiBaseUri = `${process.env.REACT_APP_APIHOST}:${process.env.REACT_APP_APIPORT}/stars/`,
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
				this.handleGetStars();
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			});
	}

	componentDidMount() {
		this.handleGetStars();
	}

	render() {
		
		const stars = this.state.ui.stars.map((item) => {
			return (
				<li key={item._id}>{item.name}
					<input name="edit" value="Edit" type="button" onClick={() => this.handleActive(item)} />
					<input name="delete" value="Delete" type="button" onClick={() => this.handleDeleteStar(item._id)} />
					<input name="add" value="Add to Hierarchy" type="button" onClick={() => this.handleAddStar(item._id)} />
				</li>
			);
		});		
		
		return (
			<React.Fragment>
			<h3>Star</h3>
				<form>
					<div>
						<label htmlFor="name">Name</label>
						<input id="name" name="name" type="text" value={this.state.data.name} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="radius">Radius (km)</label>
						<input id="radius" name="radiusKM" type="text" value={this.state.data.radiusKM} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="rotation">Rotation (km/h)</label>
						<input id="rotation" name="rotationVelocityKMH" type="text" value={this.state.data.rotationVelocityKMH} onChange={this.handleChange} />
					</div>
					<input name="save" value={(this.state.ui.currentStar)?"Update":"Save"} type="submit" onClick={this.handleSave} />
				</form>
				<div>
					<ul>{ stars }</ul>
				</div>
			</React.Fragment>

		);
	}

}