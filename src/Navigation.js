import React, { Component } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Loading from './Screen/Loading'
import Login from './Screen/Users/Login'
import Register from './Screen/Users/Register'
import Friend from './Screen/Friend/Friends'
import DetailFriend from './Screen/Friend/DetailFriend'
import ListChat from './Screen/Chat/ListChats';
import ChatRoom from './Screen/Chat/ChatRoom'
import EditProfile from './Screen/More/EditProfile'
import More from './Screen/More/More'
import Maps from './Screen/Maps'

const TabNavigation = createMaterialBottomTabNavigator(
    {
        Friend: {
            screen: Friend,
            navigationOptions: {
                tabBarLabel: 'Friends',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <MaterialIcons style={[{ color: tintColor }]} size={25} name={'person'} />
                    </View>
                ),
            }
        },
        ListChat: {
            screen: ListChat,
            navigationOptions: {
                tabBarLabel: 'Chats',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <MaterialCommunityIcons style={[{ color: tintColor }]} size={25} name={'chat-processing'} />
                    </View>
                ),
            }
        },
        More: {
            screen: More,
            navigationOptions: {
                tabBarLabel: 'More',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Ionicons style={[{ color: tintColor }]} size={25} name={'ios-more'} />
                    </View>
                ),
            }
        },
    },
    {
        activeColor: '#202a43',
        inactiveColor: '#979797',
        barStyle: { backgroundColor: '#fff' }
    }
)

const MainNavigation = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        },
        ChatRoom: {
            screen: ChatRoom
        },
        EditProfile: {
            screen: EditProfile
        },
        DetailFriend: {
            screen: DetailFriend
        },
        Loading: {
            screen: Loading
        },
        Maps: {
            screen: Maps
        },
        Friend: TabNavigation,
    },
    {
        headerMode: 'none',
        // initialRouteName: 'Maps',
        initialRouteName: 'Loading',
        // initialRouteKey: 'Login',
    },
);

export default createAppContainer(MainNavigation);