import React, { Component } from 'react';

export default class Star extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
			<form>
				<div>
					<label htmlFor="name">System Name</label>
					<input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="radius">Radius (km)</label>
					<input id="radius" name="radius" type="text" value={this.state.radius} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="rotation">Rotation (km/h)</label>
					<input id="rotation" name="rotation" type="text" value={this.state.rotation} onChange={this.handleChange} />
				</div>
			</form>
		);
	}

}