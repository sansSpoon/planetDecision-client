import React, { Component } from 'react';
import './App.css';
import Welcome from './components/welcome/welcome';
import System from './components/system/system';
import Hierarchy from './components/hierarchy/hierarchy';
import Star from './components/star/star';
import Planet from './components/planet/planet';
import Satellite from './components/satellite/satellite';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			data: {
				authenticated: false,
				authUser: '',
				token: '',
			},
			ui: {
				nav: 'system',
			},
			messages: {
				status: '',
				message: '',
			}
		};
		
		this.handleNav = this.handleNav.bind(this);
		this.handleAuth = this.handleAuth.bind(this);
	}
	
	handleAuth(auth) {
		this.setState({data: {...this.state.data, auth }});
	}
	
	handleSetLocalStorage() {
		for (let key in this.state.data) {
			localStorage.setItem(key, JSON.stringify(this.state.data[key]));
		}
	}
	
	handleGetLocalStorage() {
		for (let key in this.state.data) {
			if (localStorage.hasOwnProperty(key)) {
				this.setState({data: { ...this.state.data, [key]: JSON.parse(localStorage.getItem(key)) }});
			}
		}
	}
	
	handleNav(event) {
		const target = event.target;
		const name = target.name;
		this.setState({ ui: {...this.state.ui, 'nav': name}});
	}
	
	componentDidMount() {
		this.handleGetLocalStorage();
		
		// add event listener to save state to localStorage
		// when user leaves/refreshes the page
		window.addEventListener(
			"beforeunload",
			this.handleSetLocalStorage.bind(this)
		);
	}
	
	componentWillUnmount() {
		window.removeEventListener(
			"beforeunload",
			this.handleSetLocalStorage.bind(this)
		);
		
		this.handleGetLocalStorage();
	}
	
	render() {
		if (!this.state.data.authenticated) {
			return (
				<Welcome onLogin={this.handleAuth} />
			);
		} else {
			return (
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Planet Decision</h1>
					</header>
					<nav>
						<button name="system" onClick={this.handleNav}>System</button>
						<button name="hierarchy" onClick={this.handleNav}>Hierarchy</button>
						<button name="star" onClick={this.handleNav}>Star</button>
						<button name="planet" onClick={this.handleNav}>Planet</button>
						<button name="satellite" onClick={this.handleNav}>Satellite</button>
					</nav>
					<section>
						{{
							system: <System />,
							hierarchy: <Hierarchy />,
							star: <Star />,
							planet: <Planet />,
							satellite: <Satellite />,
						}[this.state.ui.nav]}
					</section>
				</div>
			);
		}
	}
}

export default App;
