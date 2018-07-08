import React, { Component } from 'react';
import {
    View,
    AsyncStorage
}   from 'react-native';
import { connect } from 'react-redux'

import { refreshLobbyReducer, joinRoom, turnOnLobbyListeners } from '../lobby/LobbyReducer'
import { refreshGameReducer } from '../game/GameReducer'
import { appStateLoaded } from './AppReducer'

import { firebaseService } from '@services'
import { NavigationTool } from '@navigation'

class LoadingScreen extends Component {

    componentDidMount() {
        firebaseService.initUser()

        this.props.refreshLobbyReducer()
        this.props.refreshGameReducer()
    }
    
    componentWillReceiveProps(newProps) {
        const { lobbyKey, lobbyRefreshed, place,
            gameKey, gameRefreshed,
            loaded } = newProps
            
        //If data hasn't been fetched OR app already navigated
        if(!lobbyRefreshed || !gameRefreshed || loaded) return
        
        if(lobbyKey) {
            firebaseService.joinRoom(lobbyKey)
            this.props.joinRoom(lobbyKey)
            this.props.turnOnLobbyListeners()
        }
        
        //Wait for place before turning on GameListeners
        if(gameKey && place === null) return

        this.props.appStateLoaded()
        
        if(gameKey){
            NavigationTool.navigate('Pregame')
        } else if(lobbyKey) {
            NavigationTool.navigate('Lobby')
        } else {
            NavigationTool.navigate('Home')
        }
    }

    render() {
        return <View style={{flex:1, backgroundColor:'purple'}}/>
    }
}

export default connect(
    state => ({
       lobbyKey: state.lobby.roomId,
       lobbyRefreshed: state.lobby.refreshed,
       place: state.lobby.place,
       gameKey: state.game.roomId,
       gameRefreshed: state.game.refreshed,
       loaded: state.appState.loaded
    }),
    dispatch => {
        return {
            refreshLobbyReducer: () => dispatch(refreshLobbyReducer()),
            refreshGameReducer: () => dispatch(refreshGameReducer()),
            joinRoom: (roomId) => dispatch(joinRoom(roomId)),
            turnOnLobbyListeners: () => dispatch(turnOnLobbyListeners()),
            turnOnGameListeners: () => dispatch(turnOnGameListeners()),
            appStateLoaded: () => dispatch(appStateLoaded())
        }
    }
)(LoadingScreen)