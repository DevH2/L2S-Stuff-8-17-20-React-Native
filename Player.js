import React, { Component } from 'react';
import { View } from 'react-native';

export default class Player extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		const x = this.props.position[0] + 10;
		const y = this.props.position[1] + 10;
		return(
			<View
				style = {{
					position: 'absolute',
					left: x,
					top: y,
					width: this.props.size,
					height: this.props.size,
					backgroundColor: 'black'
				}}
			>
			</View>
		); 
	}
}

export { Player };