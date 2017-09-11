
import React from 'react';
import {
    Text,
    View,
    Button,
    Image,
    BackHandler,
    ScrollView,
    ListView,
    FlatList
}   from 'react-native';
import {
    Card,
    FormInput,
    List,
    ListItem
}   from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import firebase from '../firebase/FirebaseController.js';

class JoinScreen extends React.Component {

constructor(props) {
    super(props);
    this.currentRouteName = 'Join';

    const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
        datac: dataSource
    };
}

_makeRoomRequest = () => {
    
    this.setState({ loading: true });

    firebase.database().ref('rooms/').on('value', (dataSnapshot) => {
        var tasks = [];
        dataSnapshot.forEach((child) => {
        tasks.push({
            "username": child.val().username,
            "coffeeshop": child.val().coffeeshop,
            "dropoffloc": child.val().dropoffloc,
            "dropofftime": child.val().dropofftime,
            "roomname": child.val().roomname,
            "roomsize": child.val().roomsize,
            "spot1": child.val().spot1,
            "spot2": child.val().spot2,
            "spot3": child.val().spot3,
            "cups": child.val().cups,
            "_key": child.key
        });
    });
        
        this.setState({
        //data: this.state.data.cloneWithRows(tasks)
            datac: tasks
        });
    });
};

componentWillMount() {
    this._makeRoomRequest();
}


render(){
    return <View style = {{
                backgroundColor: '#e6ddd1',
            }}>

            <List style={{ borderTopWidth:0, borderBottomWidth:0 }}>
                <FlatList
                    data={this.state.datac}
                    renderItem={({item}) => (
                        <ListItem 
                            roundAvatar
                            avatar={'http://www.actuallywecreate.com/wp-content/uploads/2012/10/tim-hortons-logo.jpg'}
                            title={item.roomname}
                            titleStyle={{
                                fontWeight: 'bold',
                            }}
                            subtitle={item.username + "\n" + item.coffeeshop + "\n" + item.dropoffloc
                                + "\n" + item.dropofftime}
                            subtitleNumberOfLines={4}
                            rightTitle= {item.cups + '/4'}
                            
                        />
                    )}
                    keyExtractor={item => item._key}
                />  
            </List>

        </View>
}};

export default JoinNavigation = StackNavigator(
{
    JoinScreen: {
        screen: JoinScreen,
    },
},
    {
        headerMode: 'none',
    }
)