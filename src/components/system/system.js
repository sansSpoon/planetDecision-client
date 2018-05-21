import React, { Component } from 'react';

export default class System extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="hierarchy">Hierarchy</label>
					<input id="hierarchy" name="hierarchy" type="text" value={this.state.hierarchy} onChange={this.handleChange} />
				</div>
			</form>
		);
	}

}