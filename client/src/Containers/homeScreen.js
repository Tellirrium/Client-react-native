import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, DefaultTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import { sendMessage, closeSocket } from '../Redux/actions';
import Messages from '../Components/messages';

let name;

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      accent: 'tomato',
    }
};


class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            message: ''
        }
    }

    componentWillUnmount() {
        closeSocket();
    }

    onPressButton = () => {
        if (this.state.message) {
            sendMessage(this.state.message, name);
            this.setState({message: ''});
        }
    }

    render() {
        name = this.props.user.name;
        return (
            <View style={{flex:1}}>
                <View style={{flex:8}}>
                    <Messages data={this.props.messages} />
                </View>
                <KeyboardAvoidingView style={{flex:1, flexDirection: 'row', alignItems: 'flex-end'}} behavior="padding" enabled>
                    <TextInput
                        label='Message'
                        onChangeText={(text) => this.setState({message: text})}
                        value={this.state.message}
                        mode='flat'
                        selectionColor='tomato'
                        underlineColor='tomato'
                        style={{flex:5, height:60}}
                        theme={theme}
                    />
                    <TouchableOpacity onPress={this.onPressButton}>
                        <Icon name='md-send' size={30} style={{color: 'tomato', marginBottom:10, marginLeft:20,marginRight:20}} /> 
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.user, messages: state.messages, src: state.user.src};
};

export default connect(mapStateToProps)(Home);