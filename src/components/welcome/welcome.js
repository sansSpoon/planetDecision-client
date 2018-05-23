import React, { Component } from 'react';
import { inspectResponse } from '../utilities/utilities';

class Welcome extends Component {

	constructor(props) {
		
		super(props);
		this.state = {
			data: {
				email: '',
				password: '',
			},
			messages: {
				status: '',
				message: '',
			},
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({data: {...this.state.data, [name]: value }});
	}

	handleSubmit(event) {
		event.preventDefault();

		const apiBaseUri = "http://localhost:3001/auth/",
			payload = this.state.data,
			init = {
				body: JSON.stringify(payload),
				method: 'POST',
				mode: 'cors',
				cache: 'default',
				headers: {
					'Content-Type': 'application/json'
				}
			};
		
		let authFetch;
		
		if (event.target.name === 'signIn') {
			authFetch = fetch(`${apiBaseUri}signin`, init);
		} else {
			authFetch = fetch(`${apiBaseUri}signup`, init);
		}
		
		authFetch
			.then(inspectResponse)
			.then(({status, data}) => {
				if (status >= 200 && status <= 299) {
					this.props.onLogin({
						authenticated: true,
						authUser: payload.email,
						token: data.token,
					});
				} else {
					this.setState({
						messages: { ...this.state.messages, status: status, message: data.message }
					});
				}
			})
			.catch(error => {
				console.log('There has been a problem with the fetch operation: ', error.message);
			});
	}

	render() {
		return(
			<React.Fragment>
				{(this.state.messages.status >= 300) &&
					<p>{this.state.messages.message}</p>
				}
				
				<form>
					<label htmlFor="email">Email</label>
					<input id="email" name="email" type="email" value={this.state.data.email} onChange={this.handleChange} />
					<label htmlFor="password">Password</label>
					<input id="password" name="password" type="password" value={this.state.data.password} onChange={this.handleChange} />
					<input type="submit" name="signIn" value="Sign In" onClick={this.handleSubmit} />
					<input type="button" name="signUp" value="Sign Up" onClick={this.handleSubmit} />
				</form>
			</React.Fragment>
		);
	}
	
}

export default Welcome;