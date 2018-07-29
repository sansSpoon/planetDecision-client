import React, { Component } from 'react';
import { inspectResponse } from './components/utilities/utilities';
import Decision from './components/decision/decision';
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
				
			},
		};

		this.handleChange = this.handleChange.bind(this);
		// this.handleGetSystems = this.handleGetSystems.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
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
			<Decision data={this.state.data} />
		);
	}
}

export default App;
