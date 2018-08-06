import React, { Component } from 'react';

import './draw.scss';

export default class Draw extends Component {

	constructor(props) {
		super(props);
		this.state = {
			toggleDraw: false,
		};

		this.handleDraw = this.handleDraw.bind(this);
	}
	
	// toggles the toggleDraw state
	handleDraw(event) {
		const name = event.target.name;
		this.setState((prevState) => {
			return {[name]: !prevState[name] };
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className={this.state.toggleDraw ? 'draw' : 'draw draw-closed'}>
					{this.props.children}
					<button className='draw-button' name='toggleDraw' onClick={this.handleDraw}>42</button>
				</div>
			</React.Fragment>
		);
	}

}