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
		const newHierarchy = {
			name: this.state.hierarchyName,
			star: '',
			planets: [],
		};
		this.setState((prevState) => ({
			hierarchy: [...prevState.hierarchy, newHierarchy]
		}));
	}
	
	handleDeleteHierarchy(id) {
		this.setState({
			hierarchy: this.state.hierarchy.filter((value) => value.name !== id)
		});
	}

	render() {
		
		const hierarchies = this.state.hierarchy.map((item) => {
			return (<li key={item.name}>{item.name} <input name="deleteHierarchy" value="Delete" type="button" onClick={() => this.handleDeleteHierarchy(item.name)} /></li>);
			});
		
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
				<div>
					<ul>{ hierarchies }</ul>
				</div>
			</form>
		);
		
	}

}