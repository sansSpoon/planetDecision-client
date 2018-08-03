import React, { Component } from 'react';
import { Button, Input } from '../utilities/components.js';
import './controls.scss';



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
				<Button name='toggleAnimation' value={this.props.ui.toggleAnimation} onClick={this.props.handleClick}/>
				<Input name='starScale' value={this.props.ui.starScale} onChange={this.props.handleChange}/>
				<Input name='planetOrbitScale' value={this.props.ui.planetOrbitScale} onChange={this.props.handleChange}/>
				<Input name='planetScale' value={this.props.ui.planetScale} onChange={this.props.handleChange}/>
				<Input name='satelliteOrbitScale' value={this.props.ui.satelliteOrbitScale} onChange={this.props.handleChange}/>
				<Input name='satelliteScale' value={this.props.ui.satelliteScale} onChange={this.props.handleChange}/>
				<Input name='heliosphere' value={this.props.ui.heliosphere} onChange={this.props.handleChange}/>
				<Input name='animationDuration' value={this.props.ui.animationDuration} onChange={this.props.handleChange}/>
				<Input name='selectedPlanets' value={this.props.ui.selectedPlanets} onChange={this.props.handleChange}/>
			</div>
		);
	}

}
