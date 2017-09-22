
import React from 'react';
import {
    View,
    Image,
    AsyncStorage,
    BackHandler,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Keyboard,
    FlatList,
    ListView
}   from 'react-native';

import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import ModalPicker from 'react-native-modal-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

import { Button, List, ListItem, FormInput } from "react-native-elements";
import ProfileButton from '../components/ProfileButton.js';
import HeaderButton from '../components/HeaderButton.js';
import NormalListItem from '../components/NormalListItem.js';
import ToggleListItem from '../components/ToggleListItem.js';

//Firebase
import firebase from '../firebase/FirebaseController.js';

class FindGroups_Screen extends React.Component {

static navigationOptions = {
  headerTitle: 'Search for Group',
  headerTintColor: 'white',
  headerStyle: {
      backgroundColor: '#b18d77',
  }
}

  constructor(props) {
    super(props);
    this.state = {
        invitationcode: '',
    }
  }

componentWillMount() {

}

  render(){
    return <View style={{
        flex: 1,
        backgroundColor: '#e6ddd1',
    }}>

        <View style = {{ flex: 1}}></View>
        <View style = {{
            flex: 1.4,
            flexDirection: 'row',
            justifyContent: 'center',
        }}>

            <FormInput
                value={this.state.roomname}
                placeholder="Invitation Code ..."
                onChangeText={invitationcode => this.setState({ invitationcode })}
                style={{
                    width: 180,
                    alignSelf: 'center',
                    textAlign: 'center',
                }}
            />

            <ProfileButton title="Go" 
                icon={{name: 'done', size: 16}}
                onPress={() => {
                    alert('yo')
            }}/>

        </View>
    </View>
}};

class ActiveGroup_Screen extends React.Component {

static navigationOptions = ({navigation}) => ({
    headerTitle: 'Active Group',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#b18d77',
    },
})

constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
        data: dataSource,

        activegroupname: '',
        activegroupid: '',

        refreshflag: '',
    };

    this.ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid)

}

componentWillMount() {

    //Grabbing name of Active Group
    this.ref.on('value', snap => {

        this.setState({refreshflag: snap.val().refreshflag});

        //Active Group Details
        firebase.database().ref('groups/' + snap.val().activegroup).once('value', snapshot => {
            this.setState({
                activegroupname: snapshot.val().displayname,
                activegroupid: snapshot.key,
            })
        });

        //Pull the list of Drop off Locations
        firebase.database().ref('groups/' + snap.val().activegroup + '/dropoffloc/')
        .once('value', insidesnapshot => {

            const coolarray = [];
            insidesnapshot.forEach((child)=>{
                coolarray.push({
                    location:child.key,
                    switched:child.val().toggle,
                    ref:'groups/' + snap.val().activegroup + '/dropoffloc/',
                })
            })
            this.setState({data:coolarray})
        });
    });
}

componentWillUnmount() {
    if(this.ref) {
        this.ref.off();
    }
}

render() {
    return <View style = {{
        backgroundColor: '#e6ddd1',
        flex: 1,
    }}>

    <View style = {{
        flex:3,
        borderWidth: 1,
        margin: 10,
    }}>
        <Text>{this.state.activegroupname}</Text>
        <Text>{this.state.activegroupid}</Text>
        <Text>Group Background</Text>
        <Text>Edit button for Owner</Text>
    </View>

    <View style = {{
        flex:5,
        borderWidth:1,
        margin: 10,
    }}>
        <Text>Locations</Text>

        <List style={{ borderTopWidth:0, borderBottomWidth:0, backgroundColor: '#e6ddd1', }}>
            <FlatList
                data={this.state.data}
                renderItem={({item}) => (
                    <ToggleListItem 
                        title={item.location}
                        switched={item.switched}
                        onSwitch={() => {
                            if(item.switched){
                                
                                firebase.database().ref(item.ref + item.location)
                                    .update({toggle:false})

                                if(this.state.refreshflag){
                                    this.ref.update({refreshflag:false})
                                } else {
                                    this.ref.update({refreshflag:true})
                                }
                            } else {
                                firebase.database().ref(item.ref + item.location)
                                    .update({toggle:true})

                                if(this.state.refreshflag){
                                    this.ref.update({refreshflag:false})
                                } else {
                                    this.ref.update({refreshflag:true})
                                }
                            }
                        }}
                    />
                )}
                keyExtractor={item => item.location}
            />
        </List>
    </View>
    
    <ActionButton
        buttonColor="rgba(222, 207, 198, 1)"
        degrees={30}
        useNativeFeedback = {false} 
        icon={<MaterialIcons name="menu" style={styles.actionButtonIcon }/>}>
        
        <ActionButton.Item
            buttonColor='#b18d77' 
            title="Find Group" 
            hideShadow
            onPress={() => {
                this.props.navigation.navigate('FindGroups_Screen')}}>
            <MaterialIcons name="search" style={styles.actionButtonItem} />
        </ActionButton.Item>

        <ActionButton.Item
            buttonColor='#b18d77' 
            title="My Groups" 
            hideShadow
            onPress={() => {
                this.props.navigation.navigate('MyGroups_Screen')}}>
            <MaterialIcons name="group" style={styles.actionButtonItem} />
        </ActionButton.Item>

        <ActionButton.Item
            buttonColor='#b18d77' 
            title="Create a Group" 
            hideShadow
            onPress={() => {
                this.props.navigation.navigate('CreateGroup_Screen')
            }}>
            <MaterialIcons name="group-add" style={styles.actionButtonItem} />
        </ActionButton.Item>
    </ActionButton>

    </View>
}

}

class MyGroups_Screen extends React.Component {

static navigationOptions = ({navigation}) => ({
  headerTitle: 'My Groups',
  headerTintColor: 'white',
  headerStyle: {
      backgroundColor: '#b18d77',
  },
})

constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
        loading: false,
        data: dataSource,
    };

    this.ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/groups');
}

_pullGroupDataDB() {
    
    this.setState({ loading: true });
    const groups = [];

    this.ref.on('value', (snapshot) => {
        
        snapshot.forEach((child) => {
            groups.push({
                groupname: child.val(),
                groupid: child.key,
            })
        });

        this.setState({data:groups,})
    });
};

componentWillMount() {
    this._pullGroupDataDB();
}

componentWillUnmount() {
    if(this.ref) {
        this.ref.off();
    }
}

render() {
  return <View style = {{
      backgroundColor: '#e6ddd1',
      flex: 1,
  }}>

    <List style={{ borderTopWidth:0, borderBottomWidth:0, backgroundColor:'#e6ddd1' }}>
        <FlatList
            data={this.state.data}
            renderItem={({item}) => (
                <NormalListItem 
                    title={item.groupid}
                    subtitle={item.groupname}
                    onPress={()=> {
                        firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
                            activegroup: item.groupid,
                        })
                        this.props.navigation.dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'ActiveGroup_Screen'})
                            ]
                        }));
                    }}
                    
                />
            )}
            keyExtractor={item => item.groupid}
        />
    </List>

  </View>
}}

class CreateGroup_Screen extends React.Component {
    
static navigationOptions = ({navigation}) => ({
    headerTitle: 'Create a Group',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#b18d77',
    },
})

constructor(props){
    super(props);
    this.state = {
        groupid: '',

        groupdisplayname: '',
        groupowner: '',
        grouptype: '',           //Security
    }
    this.ref = null;
}

componentWillMount() {
    this.ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid)
    this.ref.once('value',snapshot => {
        this.setState({
            groupowner: snapshot.val().username
        })
    })
}

_makeGroupDB(displayname,id,type,owner) {

    //Create the group and add the owner
    firebase.database().ref('groups/' + id).set({
        displayname: displayname,
        type:type,
        owner:owner,
    })
    firebase.database().ref('groups/' + id + '/' + owner).set(owner)

    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/groups/' + id).set(displayname)
}

render() {
    return <View style = {{
        backgroundColor: '#e6ddd1',
        justifyContent: 'center',
        flex: 1,
    }}>
        <FormInput
            value={this.state.groupdisplayname}
            placeholder="Name of Group ..."
            onChangeText={groupdisplayname => this.setState({ groupdisplayname })}
            style={{
                width: 180,
                alignSelf: 'center',
                textAlign: 'center'
            }}/>

        <FormInput
            value={this.state.groupid}
            placeholder="Group id"
            onChangeText={groupid => this.setState({ groupid })}
            style={{
                width: 180,
                alignSelf: 'center',
                textAlign: 'center'
            }}/>

        <FormInput
            value={this.state.grouptype}
            placeholder="Public or Private"
            onChangeText={grouptype => this.setState({ grouptype })}
            style={{
                width: 180,
                alignSelf: 'center',
                textAlign: 'center'
            }}/>

        <Button
            backgroundColor='#b18d77'
            borderRadius={15}
            color='white'
            title="Create Group"
            onPress={() => {
                this._makeGroupDB(this.state.groupdisplayname,this.state.groupid,
                    this.state.grouptype,this.state.groupowner)
                this.props.navigation.dispatch(NavigationActions.reset(
                 {index: 1,
                    actions: [
                      NavigationActions.navigate({ routeName: 'ActiveGroup_Screen'}),
                      NavigationActions.navigate({ routeName: 'MyGroups_Screen'})
                    ]
                  }));
                Keyboard.dismiss()
            }}
            style={{
                width: 200,
                alignSelf: 'center'
            }}
        />
    </View>
}

}


export default stackNav = StackNavigator(
  {
      ActiveGroup_Screen: {
          screen: ActiveGroup_Screen,
      },
      FindGroups_Screen: {
          screen: FindGroups_Screen,
      },
      MyGroups_Screen: {
          screen: MyGroups_Screen,
      },
      CreateGroup_Screen: {
          screen: CreateGroup_Screen,
      },
  },
      {
          headerMode: 'screen',
          initialRouteName: 'ActiveGroup_Screen',
      }
  );


  const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: '#8b6f4b',
    },
    actionButtonItem: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

});