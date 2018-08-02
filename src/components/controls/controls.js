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

function Button(props) {
	return (
		<button type="button" id={props.name} name={props.name} value={props.value} onClick={props.onClick}>{notCamelCase(props.name, 2)}</button>
	)
}

export default class Controls extends Component {

	constructor(props) {
		super(props);

		this.state = {
			
		};

		
	//	this.handleChange = this.handleChange.bind(this);
	}
	
/*
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}
*/

	render() {
		return (
			<div className='controls'>
				<Button name='toggle_2d' value={this.props.ui.animate2d} onClick={this.props.handleClick}/>
				<Button name='toggle_3d' value={this.props.ui.animate3d} onClick={this.props.handleClick}/>
				<Button name='stopAnimation' />
				<Input name='starScale' value={this.props.ui.starScale} onChange={this.props.handleChange}/>
				<Input name='planetOrbitScale' value={this.props.ui.planetOrbitScale} onChange={this.props.handleChange}/>
				<Input name='planetScale' value={this.props.ui.planetScale} onChange={this.props.handleChange}/>
				<Input name='satelliteOrbitScale' value={this.props.ui.satelliteOrbitScale} onChange={this.props.handleChange}/>
				<Input name='satelliteScale' value={this.props.ui.satelliteScale} onChange={this.props.handleChange}/>
				<Input name='heliosphere' value={this.props.ui.heliosphere} onChange={this.props.handleChange}/>
			</div>
		);
	}

}
