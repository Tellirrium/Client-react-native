import React from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux';


export default class Settings extends React.Component {
    logOut = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={{flex:1, justifyContent:'flex-start', alignItems: 'center', marginTop:40}}>
                <Button onPress={this.logOut}>logOut</Button>
            </View>
        )
    }
}