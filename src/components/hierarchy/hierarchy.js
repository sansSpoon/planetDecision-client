import React, { Component } from 'react';
import { inspectResponse } from '../utilities/utilities';
import Star from '../star/star';
import Planet from '../planet/planet';

export default class Hierarchy extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				name: '',
				star: '',
				planets: [],
			},
		};
		
		this.handleAddStar = this.handleAddStar.bind(this);
		this.handleAddPlanet = this.handleAddPlanet.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({data: {...this.state.data, [name]: value }});
	}
	
	handleAddStar(id) {
		this.setState(
			{ data: { ...this.state.data, star: id } }
		);
	}
	
	handleAddPlanet(id) {
/*
		if(satellite._id) {
			const tempSatellites = this.state.data.satellites
			const index = this.state.data.satellites.findIndex((sat) => sat._id === satellite._id);
			tempSatellites.splice(index, 1, satellite);
			
			this.setState(
				{	data: { ...this.state.data, satellites: tempSatellites }}
			);
		} else {
*/
			this.setState((prevState) => ({
				data: { ...this.state.data, planets: [...prevState.data.planets, id] }
			}));
		//}
	}



	render() {
		
		return (
			<React.Fragment>
			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input id="name" name="name" type="text" value={this.state.data.name} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="star">Star</label>
					<input id="star" name="star" type="text" value={this.state.data.star} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="planets">Planets</label>
					<input id="planets" name="planets" type="text" value={this.state.data.planets} onChange={this.handleChange} />
				</div>
			</form>
			<Star addStar={this.handleAddStar}/>
			<Planet  addPlanet={this.handleAddPlanet}/>
			</React.Fragment>
		);
	}

}