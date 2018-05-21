import React, { Component } from 'react';
import { inspectResponse } from '../utilities/utilities';

class Welcome extends Component {

	constructor(props) {
		
		super(props);
		this.state = {
			email: '',
			password: '',
			status: '',
			message: '',
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}

	handleSubmit(event) {
		event.preventDefault();
		
		const target = event.target;
		const name = target.name;
		
		
		const apiBaseUri = "http://localhost:3001/auth/",
			payload = {
				"email": this.state.email,
				"password": this.state.password
			},
			initGet = {
				body: JSON.stringify(payload),
				method: 'POST',
				mode: 'cors',
				cache: 'default',
				headers: {
					'Content-Type': 'application/json'
				}
			};
		
		let authFetch;
		
		if (name === 'signIn') {
			authFetch = fetch(`${apiBaseUri}signin`, initGet);
		} else {
			authFetch = fetch(`${apiBaseUri}signup`, initGet);
		}
		
		authFetch
			.then(inspectResponse)
			.then(({status, data}) => {
				if (status >= 200 || status <= 299) {
					this.props.onLogin({
						authenticated: true,
						authUser: payload.email,
						token: data.token,
					});
				} else {
					this.setState({
						status: 401,
						message: data
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
				{(this.state.status >= 300) &&
					<p>{this.state.message.message}</p>
				}
				
				<form>
					<label htmlFor="email">Email</label>
					<input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
					<label htmlFor="password">Password</label>
					<input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
					<input type="submit" name="signIn" value="Sign In" onClick={this.handleSubmit} />
					<input type="button" name="signUp" value="Sign Up" onClick={this.handleSubmit} />
				</form>
			</React.Fragment>
		);
	}
	
}

export default Welcome;