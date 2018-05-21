import React, { Component } from 'react';

export default class Hierarchy extends Component {

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
					<label htmlFor="star">Star</label>
					<input id="star" name="star" type="text" value={this.state.star} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="planets">Planets</label>
					<input id="planets" name="planets" type="text" value={this.state.planets} onChange={this.handleChange} />
				</div>
			</form>
		);
	}

}