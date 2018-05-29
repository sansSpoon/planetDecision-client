import React, { Component } from 'react';
import { inspectResponse } from '../utilities/utilities';
import Star from '../star/star';
import Planet from '../planet/planet';

export default class Hierarchy extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				_id: '',
				name: '',
				star: '',
				planets: [],
			},
			ui: {
				hierarchies: [],
			},
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleAddStar = this.handleAddStar.bind(this);
		this.handleAddPlanet = this.handleAddPlanet.bind(this);
		this.handleAddHierarchy = this.handleAddHierarchy.bind(this);
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
						star: id.star,
						planets: id.planets,
						_id: id._id,
					},
				}
			);
		} else {
			this.setState(
				{ data: { ...this.state.data,
						name: '',
						star: '',
						planets: '',
						_id: '',
					},
				}
			);
		}
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
	
	handleAddHierarchy() {
		let data = this.state.data;

		if (!this.props.currentHierarchy) {
			delete data._id;
		}
		this.props.addHierarchy(data);
		this.handleActive();
	}
	
	static getDerivedStateFromProps(props, state) {
		
		let update = {}
		
		if(props.currentHierarchy) {
			update = Object.assign(update, {data: props.currentHierarchy});
		}
		if(props.currentHierarchy) {
			update = Object.assign(update, {ui: props.hierarchies});
		}
		
		if(Object.entries(update).length > 0) {

			return update;
		} else {
			return null;
		}
  }
  
  componentDidUpdate() {

  }

	render() {
		
		let hierarchies = (this.props.hierarchies || []).map((item) => {
			return (
				<li key={item.name}>{item.name}
					<input name="editHierarchy" value="Edit" type="button" onClick={() => this.handleActiveHierarchy(item)} />
					<input name="deleteHierarchy" value="Delete" type="button" onClick={() => this.handleDeleteHierarchy(item._id)} />
				</li>
			);
		});
		
		return (
			<React.Fragment>
			<h3>Hierarchy</h3>
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
				<input name="addHierarchy" type="button" value={(this.props.currentHierarchy)?"Update":"Add"} onClick={this.handleAddHierarchy} />
			</form>
			<div>
				<ul> { hierarchies } </ul>
			</div>
			<Star addStar={this.handleAddStar}/>
			<Planet  addPlanet={this.handleAddPlanet}/>
			</React.Fragment>
		);
	}

}
/*
Hierarchy.defaultProps = {
	hierarchies: [],
}
*/