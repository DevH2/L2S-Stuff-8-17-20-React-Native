import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, TextInput, ImageBackground, TouchableHighlight, Alert, Dimensions, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Constants from 'expo-constants';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
let deviceHeight = Dimensions.get('screen').height;
let deviceWidth = Dimensions.get('screen').width;
import Player from './Player';
import Constants2 from './Constants2';
import { GameLoop } from './systems';
import { Platform } from './Platform';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.engine = null;
        this.state = {
            menuScreen: 'block',
            gameScreen: 'none',
            infoScreen: 'none',
            running: true, 
        }
    }
  
    
    handleMenuPress = () => this.setState(state => ({
        menuScreen: 'block',
        gameScreen: 'none',
        infoScreen: 'none',
    }));
    handleGamePress = () => this.setState(state => ({
        menuScreen: 'none',
        gameScreen: 'block',
        infoScreen: 'none',
    }));
    handleInfoPress = () => this.setState(state => ({
        menuScreen: 'none',
        gameScreen: 'none',
        infoScreen: 'block',
    }));
    onEvent = (e) => {
        if(e.type === "game-over"){
            this.setState({
                running: false,
            });
            Alert.alert("Game Over");
        }
    }
    reset = () => {
        this.engine.swap({
            player: { position: [0,0], xSpeed: 0, ySpeed: 3, bounce: 5, updateFrequency: 5, size: deviceWidth/8, renderer: <Player />  },
            platform: { position: [Math.floor(Math.random()*deviceWidth), Constants.PLATFORM_Y_POSITION], width: 80, height: 10, 
                        isVisible: true, isUnder: false, renderer: <Platform /> },
        });
        this.setState({
            running: true,
            menuScreen: 'none',
            gameScreen: 'block',
            infoScreen: 'none',
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <GameEngine
                    ref = {(ref) => { this.engine = ref }}
                    style = {{width: deviceWidth, height: deviceHeight, flex: null, backgroundColor: 'blue'}}
                    entities = {{
                        player: { position: [0,0], xSpeed: 0, ySpeed: 3, bounce: 5, updateFrequency: 5, size: deviceWidth/8, renderer: <Player />  },
                        platform: { position: [Math.floor(Math.random()*deviceWidth), Constants.PLATFORM_Y_POSITION], width: 80, height: 10, 
                                    isVisible: true, isUnder: false, renderer: <Platform /> },
                        fallChecker: { position: [deviceWidth/2, deviceHeight/10], fcWidth: deviceWidth , fcHeight: 2, renderer: <FallChecker />}
                    }}
                    running = {this.state.running}
                    onEvent = {this.onEvent}
                />

                //Move left and right buttons because adding swiping and tilting is a pain
                <View style = {styles.row}>
                <TouchableOpacity onPress = {() => {this.engine.dispatch({type: 'move-left'})}}>
                    <View style = {styles.controlsButton}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {this.engine.dispatch({type: 'move-right'})}}>
                    <View style = {styles.controlsButton}></View>
                </TouchableOpacity>
            </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
        height: deviceHeight,
        width: deviceWidth,
    },
    title1: {
        fontSize: 50,
        color: '#e3ded8',
        fontWeight: 'bold',
        margin: 15,
        
    },
    title2: {
        fontSize: 60,
        color: '#0F52BA',
        fontWeight: 'bold',
        
    },
    menuButton: {
        width: deviceWidth/2.25, 
        height: deviceHeight/12, 
        borderWidth: 3, 
        borderRadius: 10,  
        borderColor: '#c4c4c4',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    menuButtonText: {
        textAlign: 'center',
        color: 'darkblue',
        fontSize: 25,
        fontWeight: 'bold',
        
    },
    halfScreen: {
        width: deviceWidth,
        height: deviceHeight/2,
        alignItems: 'center',
    },
    settingsButton: {
        width: deviceWidth/6, 
        height: deviceWidth/6, 
        borderWidth: 3, 
        borderRadius: 10,  
        borderColor: '#c4c4c4',
        alignItems: 'center',
        justifyContent: 'center',
        margin: deviceWidth/32,
    },
    infoText: {
        color: 'white',
        fontSize: deviceWidth/14,
        fontWeight: 'bold',
        
        textAlign: 'center',
        padding: deviceWidth/24,
        lineHeight: deviceWidth/6,
    },
    infoContainer: {
        width: deviceWidth*3/4,
        height: deviceHeight*3/4,
        borderColor: 'white',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: deviceWidth/12
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',  
    },
    controlsButton: {
        width: deviceWidth/9, 
        height: deviceWidth/9, 
        borderWidth: 3, 
        borderRadius: 8,  
        borderColor: '#c4c4c4',
        alignItems: 'center',
        justifyContent: 'center',
        margin: deviceWidth/32,
    }
});
