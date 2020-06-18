import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Chat from './screens/chatScreen';
import Login from './screens/Login';
import roomScreen from './screens/roomScreen';
import AllRooms from './screens/allRooms';
import Profile from './screens/profile';

import React from 'react';
import { View } from 'react-native';



const screens = {
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    },
    AllRooms: {
        screen: AllRooms,
        navigationOptions: {
            title: "Rooms",
            headerTitleStyle: { textAlign: 'center' },
            headerRight: () => <View />
        }
    },
    Profile: {
        screen: Profile
    },
    roomScreen: {
        screen: roomScreen,
        navigationOptions: {
            title: "Create Room",
            headerTitleStyle: { textAlign: 'center' },
            headerRight: () => <View />
        }
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            headerShown: false
            // title: "Chat Room",
            // headerTitleStyle: { textAlign: 'center' },
            // headerRight: () => <View />
        }
    }
}
const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);