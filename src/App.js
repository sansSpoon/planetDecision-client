import React, { Component } from 'react';
import './App.css';
import System from './components/system/system';
import Hierarchy from './components/hierarchy/hierarchy';
import Star from './components/star/star';
import Planet from './components/planet/planet';
import Satellite from './components/satellite/satellite';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			nav: 'system',
		};
		
		this.handleNav = this.handleNav.bind(this);
	}
	
	handleNav(event) {
		const target = event.target;
		const name = target.name;
		this.setState({'nav': name});
	}
	
	render() {
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
					}[this.state.nav]}
				</section>
			</div>
		);
	}
}

export default App;
