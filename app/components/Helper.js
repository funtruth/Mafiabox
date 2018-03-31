import React, { Component } from 'react';
import { View, Text, Animated, BackHandler } from 'react-native';

import colors from '../misc/colors.js';
import { NavigationActions } from 'react-navigation';

import { Layout } from "../../router";

export class Helper extends React.Component {
        
    constructor(props) {
        super(props);

        this.state = {
            nav: new Animated.Value(0),
        }
    }

    componentDidMount(){
        BackHandler.addEventListener("hardwareBackPress", this._onBackPress.bind(this));
    }

    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress");
    }

    _onBackPress(){
        return true
    }

    //Prop Functions
    _receiveNav(navigation){
        this.navigation = navigation
    }

    _showCover(show){
        Animated.timing(
            this.state.nav,{
                toValue:show?1:0,
                duration:400
            }
        ).start()
    }

    _navigate(screen,param){

        Animated.sequence([
            Animated.timing(
                this.state.nav,{
                    toValue:1,
                    duration:400
                }
            ),
            Animated.timing(
                this.state.nav,{
                    toValue:0,
                    duration:800
                }
            )
        ]).start()

        setTimeout(()=>{
            this.navigation.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ 
                        routeName: screen,
                        params: { roomname:param }
                    })
                ]
                })
            )
        },400)

    }

    render() {

        return (
            <View style = {{position:'absolute', left:0, right:0, bottom:0, top:0, backgroundColor:colors.background}}>

                <Animated.View style = {{
                    flex:1,
                    opacity: this.state.nav.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                    }),
                    transform: [{
                        scale: this.state.nav.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1],
                        })
                    }],
                }}>
                    <Layout
                        screenProps={{
                            passNavigation:val=>{this._receiveNav(val)},
                            navigate:(val,roomname)=>{
                                this._navigate(val,roomname)
                            },
                        }}
                    />
                </Animated.View>

            </View>
        )
    }
}
