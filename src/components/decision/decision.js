import React, { Component } from 'react';
import render from './decisionD3';
import { toggleAnimation } from '../utilities/d3Utilities';
import { centreBody, cancelAnimation } from '../utilities/utilities';
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
		this.handleQuestion = this.handleQuestion.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}
	
	handleQuestion() {
		centreBody(this.props.data[0].hierarchies[0].planets, this.props.ui.selectedPlanets, this.props.ui.animationDuration);
	}

	componentDidMount() {
		
	}

	componentDidUpdate() {
		render(this._rootD3Node.current, this.props.data, this.props.ui);
		toggleAnimation(this._rootD3Node.current, this.props.ui.toggle_2d, this.props.ui.toggle_3d);

		if (this.props.ui.toggleAnimation) {
			centreBody(this.props.data[0].hierarchies[0].planets, this.props.ui.selectedPlanets, this.props.ui.animationDuration);
		} else {
			cancelAnimation();
		}
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<React.Fragment>
				{/* associate the ref to the DOM element */}
				<div id="universe">
					<div id="galaxy" ref={this._rootD3Node} />
				</div>
				<section className="question">
					<label htmlFor="inputQuestion">What is your question?</label>
					<div className="input-group">
						<input id="inputQuestion" name="inputQuestion" type="text" placeholder="What is your question?" value={this.props.inputQuestion} onChange={this.props.onChange} />
						<button className="btn-outline-secondary" id="askQuestion" name="askQuestion" onClick={this.handleQuestion}>Ask</button>
					</div>
				</section>
			</React.Fragment>
		);
	}

}