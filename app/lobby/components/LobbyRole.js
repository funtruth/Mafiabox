import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import Roles from '../../misc/roles'

const LobbyRole = ({ roleid, count }) => {
    const { container, playerName, description, countText } = styles
    const { name, rules } = Roles[roleid]

    return (
        <TouchableOpacity style={container}>
            <View style={{flex:0.7}}>
                <Text style={playerName}>{name}</Text>
                <Text style={description}>{rules}</Text>
            </View>
            <View style={{flex:0.2}}>
                <Text style={countText}>{count}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    playerName: {
        fontFamily: 'BarlowCondensed-Medium',
        fontSize: 24,
        color: '#A6895D',
        margin: 5
    },
    description: {
        fontFamily: 'BarlowCondensed-Medium',
        fontSize: 18,
        color: '#A6895D',
        margin: 5
    },
    countText: {
        fontFamily: 'BarlowCondensed-Medium',
        fontSize: 20,
        color: '#A6895D'
    }
}

export default LobbyRole