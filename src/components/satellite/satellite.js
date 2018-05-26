import React, { Component } from 'react';

export default class Satellite extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				name: '',
				radiusKM: '',
				rotationVelocityKMH: '',
				apoapsisAU: '',
				periapsisAU: '',
				orbitVelocityKMS: '',
				_id: '',
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
			console.log(id);
			this.setState(
				{ data: { ...this.state.data,
						name: id.name,
						radiusKM: id.radiusKM,
						rotationVelocityKMH: id.rotationVelocityKMH,
						apoapsisAU: id.apoapsisAU,
						periapsisAU: id.periapsisAU,
						orbitVelocityKMS: id.orbitVelocityKMS,
						_id: id._id,
					},
				}
			);
		} else {
			this.setState(
				{ data: { ...this.state.data,
						name: '',
						radiusKM: '',
						rotationVelocityKMH: '',
						apoapsisAU: '',
						periapsisAU: '',
						orbitVelocityKMS: '',
						_id: '',
					},
				}
			);
		}
	}
	
	handleSave(event) {
		let data = this.state.data;
		console.log("data from sat");
		console.log(data);
		if (!this.props.currentSatellite) {
			delete data._id;
		}
		this.props.onSave(data);
		this.handleActive();
	}
	
	static getDerivedStateFromProps(props, state) {
		if(props.currentSatellite) {
			return {data: props.currentSatellite};
		}
		return null;
  }

	render() {
		return (
			<React.Fragment>
			<h3>Satellite</h3>
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
					<label htmlFor="apoapsis">Apoapsis (AU)</label>
					<input id="apoapsis" name="apoapsisAU" type="number" value={this.state.data.apoapsisAU} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="periapsis">Periapsis (AU)</label>
					<input id="periapsis" name="periapsisAU" type="number" value={this.state.data.periapsisAU} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="orbit">Orbit (km/s)</label>
					<input id="orbit" name="orbitVelocityKMS" type="number" value={this.state.data.orbitVelocityKMS} onChange={this.handleChange} />
				</div>
				<input name="add" type="button" value={(this.props.currentSatellite)?"Update":"Add"} onClick={this.handleSave} />
				<input name="cancel" type="button" value="Cancel" onClick={() => this.handleActive()} />
			</form>
			</React.Fragment>
		);
	}

}