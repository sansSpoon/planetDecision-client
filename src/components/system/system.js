import React, { Component } from 'react';

export default class System extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hierarchyName: '',
			hierarchy: [],
		};
		
		this.handleAddHierarchy = this.handleAddHierarchy.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({[name]: value});
	}
	
	handleAddHierarchy(event) {
		console.log(event);
		const newHierarchy = {
			name: this.state.hierarchyName,
			star: '',
			planets: [],
		}
		console.log(newHierarchy);
		this.setState((prevState) => ({
			hierarchy: [...prevState.hierarchy, newHierarchy]
		}));
	}

	render() {
		return (
			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="hierarchy">Hierarchy</label>
					<input id="hierarchy" name="hierarchyName" type="text" value={this.state.hierarchyName} onChange={this.handleChange} />
				</div>
				<input name="addHierarchy" value="Add Hierarchy" type="button" onClick={this.handleAddHierarchy} />
			</form>
		);
		
		
	}

}