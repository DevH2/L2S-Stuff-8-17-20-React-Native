import React, { Component } from 'react';
import { View } from 'react-native';

class Platform extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const x = this.props.position[0];
		const y = this.props.position[1];
		const platformWidth = this.props.width;
		const platformHeight = this.props.height;
		return(
			<View
				style = {{
					position: 'absolute',
					left: x,
					top: y,
					width: platformWidth,
					height: platformHeight,
					flexDirection: 'column'
				}}
			>
		
			</View>
		);
	}
}

export { StartingPlatform };
