import { createBottomTabNavigator, tabBarIcon } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import HomeScreen from '../Containers/homeScreen';
import InfoScreen from '../Containers/infoScreen';
import SettingsScreen from '../Containers/settingsScreen';

ChatNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({tintColor}) => (
                <Icon name='ios-home' color={tintColor} size={24} />
            )
        }
    },
    Info: {
        screen: InfoScreen,
        navigationOptions: {
            tabBarLabel: 'Info',
            tabBarIcon: ({tintColor}) => (
                <Icon color={tintColor} name='ios-information-circle' size={24} />
            )
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => (
                <Icon color={tintColor} name='ios-settings' size={24} />
            )
        }
    }
},
{
    initialRouteName: 'Home',

    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey'
    }
});

export default ChatNavigator;