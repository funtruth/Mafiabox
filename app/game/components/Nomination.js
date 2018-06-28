import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Animated, 
    Dimensions 
} from 'react-native';

import { Button } from '../../components/Button';
import firebaseService from '../../firebase/firebaseService';

//DEPRECATED
class Nomination extends Component {
        
    constructor(props) {
        super(props);

        this.state = {

            nominee:null,

        }

        this.nav = new Animated.Value(0)

        this.nominationRef = null
        this.myReadyRef = null
    }

    _on(view){

        Animated.timing(
            this.nav,{
                toValue:view?1:0,
                duration:500
            }
        ).start()

    }

    buttonPress(choice) {
        
    }

    render() {

        const { visible, buttonOne, buttonTwo } = this.state

        if(!visible) return null

        return ( 
            <Animated.View style = {[
                styles.console,
                {
                    opacity:this.nav.interpolate({
                        inputRange:[0,0.7,1],
                        outputRange:[0,0,1]
                    })
                }
            ]}>
                    
                <Text style = {styles.phase}>is now on Trial</Text>

                <Button
                    horizontal = {0.4}
                    margin = {10}
                    backgroundColor = {colors.dead}
                    onPress = {() => this.buttonPress(1)}
                ><Text style = {styles.choiceButton}>Innocent</Text>
                </Button>

                <Button
                    horizontal = {0.4}
                    backgroundColor = {colors.dead}
                    onPress = {() => this.buttonPress(-1)}
                ><Text style = {styles.choiceButton}>Guilty</Text>
                </Button>

            </Animated.View>
        )
    }
}

const styles = {
    console:{
        flex:0.3,
        margin:5,
        borderRadius:5,
        backgroundColor:colors.card,
        justifyContent:'center',
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    phase:{
        fontSize:30,
        fontFamily:'FredokaOne-Regular',
        marginBottom:5, 
        color:colors.shadow,
        alignSelf:'center'
    },
    choiceButton: {
        fontFamily:'FredokaOne-Regular',
        fontSize: 17,
        alignSelf: 'center',
        color: colors.shadow,
        margin:4,
    },
}

export default Nomination

