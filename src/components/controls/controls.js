import React, { Component } from 'react';
import { notCamelCase } from '../utilities/utilities';

function Input(props) {
	
	return (
		<div>
			<label htmlFor={props.name}>{notCamelCase(props.name)}</label>
			<input id={props.name} name={props.name} type="text" value={props.value} onChange={props.onChange} />
		</div>
	);
}

export default class Controls extends Component {

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
			<div className='controls'>
			</div>
		);
	}

}