import React from 'react';
import { notCamelCase } from './utilities';

export function Input(props) {
	return (
		<div>
			<label htmlFor={props.name}>{notCamelCase(props.name)}</label>
			<input id={props.name} name={props.name} type="text" value={props.value} onChange={props.onChange} />
		</div>
	);
}

export function Button(props) {
	return (
		<button type="button" id={props.name} name={props.name} value={props.value} onClick={props.onClick}>{notCamelCase(props.name, 2)}</button>
	)
}