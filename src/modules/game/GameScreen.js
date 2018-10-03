import React, { Component } from 'react'
import {
    ScrollView
}   from 'react-native'
import { connect } from 'react-redux'
import { Styler } from '@common'

import LinearGradient from 'react-native-linear-gradient'
import { ConsoleView, GameTimer, General, PlayerListView, PrivateNewsView, PrivateRoleView } from './components'

class GameScreen extends Component {
    render() {
        const { news, events, roleId } = this.props
        
        return (
            <LinearGradient colors={Styler.color.gradient} style = {{flex:1, width: '100%'}}>
                <ScrollView>
                    <ScrollView horizontal>
                        <ConsoleView />
                        <GameTimer />
                    </ScrollView>

                    <PlayerListView />
                </ScrollView>
                <General news={news}/>
                <PrivateNewsView events={events}/>
                <PrivateRoleView roleId={roleId}/>
            </LinearGradient>
        )
    }
}

export default connect(
    state => ({
        ready: state.game.myReady,
        roleId: state.lobby.myInfo.roleId,
        news: state.game.news,
        events: state.game.events
    })
)(GameScreen)