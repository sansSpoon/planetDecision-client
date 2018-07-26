import React, { Component } from 'react';

export default class Decision extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}

	render() {
		return (
			<p>Decision</p>
		);
	}

}