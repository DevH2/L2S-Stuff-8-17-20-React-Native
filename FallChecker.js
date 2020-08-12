import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';

let deviceHeight = Dimensions.get('screen').height;
let deviceWidth = Dimensions.get('screen').width;

export default class FallChecker extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		let x = this.props.position[0];
		let y = this.props.position[1];
		return(
			<View
				style = {{
					position: 'absolute',
					left: x,
					top: y,
					width: this.props.fcWidth,
					height: this.props.fcHeight,
				}}
			>
			</View>
		); 
	}
}

export { FallChecker };