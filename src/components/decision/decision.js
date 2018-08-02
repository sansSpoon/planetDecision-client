import React, { Component } from 'react';
import render from './decisionD3';
import { toggleAnimation } from '../utilities/utilities';
import './main.scss';

export default class Decision extends Component {

	constructor(props) {
		super(props);
/*
		this.state = {
		};
*/

		// create a ref to attach the d3 render to
		this._rootD3Node = React.createRef();

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}

	componentDidMount() {
	
	}

	componentDidUpdate() {
		render(this._rootD3Node.current, this.props.data, this.props.ui);
		toggleAnimation(this._rootD3Node.current, this.props.ui.toggle_2d, this.props.ui.toggle_3d);
	}

	componentWillUnmount() {

	}

	render() {
		return (

			// associate the ref to the DOM element
			<div id="universe">
				<div id="galaxy" ref={this._rootD3Node} />
			</div>
		);
	}

}