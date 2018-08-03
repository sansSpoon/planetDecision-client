import React, { Component } from 'react';
import { inspectResponse } from './components/utilities/utilities';
import Decision from './components/decision/decision';
import Controls from './components/controls/controls';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages: {
				status: '',
				message: '',
			},
			data: [],
			ui: {
				starScale: 2,
				planetOrbitScale: 1,
				planetScale: 1,
				satelliteOrbitScale: 1,
				satelliteScale: 1,
				heliosphere: 90,
				toggle_2d: false,
				toggle_3d: false,
				toggleAnimation: false,
				animationDuration: 5000,
				selectedPlanets: '',
			}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleAnimation = this.handleAnimation.bind(this);
		// this.handleGetSystems = this.handleGetSystems.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState((prevState) => ({ui: {...prevState.ui, [name]: value }}));
	}

	handleAnimation(event) {
		const name = event.target.name;
		this.setState((prevState) => ({ui: {...prevState.ui, [name]: !prevState.ui[name] }}));
	}

	handleGetSystems() {
		const apiBaseUri = "http://localhost:3001/systems/",
			init = {
				method: 'GET',
				mode: 'cors',
				cache: 'default',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
				}
			};

		fetch(apiBaseUri, init)
			.then(inspectResponse)
			.then(({status, data}) => {
				if (status >= 200 && status <= 299) {
					this.setState({ data: data });

				} else {
					this.setState(
						{ messages: { ...this.state.messages, status: 401, message: data.message } }
					);
				}
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			}); 
	}

	componentDidMount() {
		this.handleGetSystems();
	}
	
	componentDidUpdate() {

	}
	
	componentWillUnmount() {
	}
	
	render() {
		return (
			<React.Fragment>
				<Controls ui={this.state.ui} handleChange={this.handleChange} handleClick={this.handleAnimation}/>
				<Decision data={this.state.data} ui={this.state.ui}/>
			</React.Fragment>
		);
	}
}

export default App;
