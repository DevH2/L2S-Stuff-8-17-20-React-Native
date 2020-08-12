import React, { Component } from 'react';
import { Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('screen').width;
let deviceHeight = Dimensions.get('screen').height;

const GameLoop = (entities, { touches, dispatch, events }) => {
	let player = entities.player;
	let platform = entities.platform;

	if(events.length) {
		for(var i = 0; i < events.length; i++) { 
			if(events[i].type === 'move-left'){
				player.xSpeed = -1;
			}else if(events[i].type === 'move-right'){
				player.xSpeed = 1;
			}else {
				player.xSpeed = 0;
			}
		}
	}
	for(var i = 0; i < Constants.NUM_PLATFORMS_GENERATED; i++){
		Constants.PLATFORM_Y_POSITION -= 100;
	}
	player.bounce -= 2;
	if(player.bounce === 0){
		player.bounce = player.updateFrequency;
		player.position[0] += player.xSpeed;
		platform.position[1] -= player.ySpeed;
		player.ySpeed += (Constants.GRAVITY * Constants.GRAVITY_REDUCTION_CONST);
		
		if(platform.position[1] > (deviceHeight + player.size)){
			platform.isVisible = false;
		}
		if(player.position[1] < platform.position[1] - player.size){
			platform.isUnder = true;
		}
		//collision detection
		if( player.position[0] < platform.position[0] + platform.width &&
			player.position[0] + player.size > platform.position[0] && 
			player.position[1] < platform.position[1] + platform.height && 
			player.position[1] + player.size > platform.position[1] &&
			player.isVisible &&
			player.isUnder )
		{
			player.ySpeed = -3;
		}
		if( player.position[0] < fallChecker.position[0] + fallChecker.fcWidth &&
			player.position[0] + player.size > fallChecker.position[0] && 
			player.position[1] < platform.position[1] + fallChecker.fcHeight && 
			player.position[1] + player.size > fallChecker.position[1] )
		{
			dispatch({ type: "game-over" })
		}  

	}

	return entities;
}
export { GameLoop };

