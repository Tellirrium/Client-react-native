import React from 'react';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux';

import {checkValue, checkUser, showAlert} from '../Redux/actions';


const styles = StyleSheet.create({
    containerLogin: {
      flex: 1,
      justifyContent: 'flex-start',
      padding:10,
      marginTop: 50
    },
    textLogin: {
      alignSelf: "center",
      color: '#fff',
      fontSize: 25,
      marginBottom: 10
    },
    registr: {
      flexDirection: 'row',
      justifyContent: 'center'
    }
  });

class LogIn extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
      super();
      this.state = {
        textEmail: '',
        textPassword: '',
      }
    }

    findUser = () => {
        if (/^.+@.+\..+$/igm.test(this.state.textEmail) && this.state.textPassword) {

            const userInfo = {
                email: this.state.textEmail.trim(),
                password: this.state.textPassword.trim()
            }

            this.props.checkUser(this, userInfo);
        } else {
            this.props.checkValue(true);
        }
    }

    showError = () => {
        if (this.props.value) {
            return (
                <Text style={{alignSelf:'flex-start', color: '#E61212', padding:5}}>Invalid password / email or You are not registred</Text>
            )
        } else {
            return null;
        }
    }

    showWrongPassword = () => {
        if (this.props.password) {
            return (
                <Text style={{alignSelf:'flex-start', color: '#E61212', padding:5}}>Wrong password</Text>
            )
        } else {
            return null;
        }
    }

    viewAlert = () => {
      if (this.props.alertValue) {
        Alert.alert('Registration was successful', 'you can enter the chat with your password and email');
        this.props.showAlert(false);
      }
    }
  
    render() {
      this.viewAlert();
      return (
        <LinearGradient colors={['#1E90FF', '#9400D3'].reverse()} start={{x: .1, y: 1}} end={{x: 0, y: .1}} style={{flex: 1}}>
          <View style={styles.containerLogin}>
            <Text style={styles.textLogin}>Login</Text>

            {this.showError()}
            {this.showWrongPassword()}
          
            <TextInput
              label='Email'
              onChangeText={(text) => this.setState({textEmail: text})}
              value={this.state.textEmail}
              mode='outlined'
              style={{marginBottom: 10, color:'#fff'}}
              selectionColor='#fff'
            />
  
            <TextInput
              label='Password'
              onChangeText={(text) => this.setState({textPassword: text})}
              value={this.state.textPassword}
              mode='outlined'
              selectionColor='#fff'
              style={{marginBottom: 10}}
            />
          
            <Button icon="done" mode="contained" onPress={this.findUser} style={{margin:10,shadowRadius:3}}>
              Log in
            </Button>
  
            <View style={styles.registr}>
              <Text style={{fontSize:20,marginRight:10}}>Don't have an account?</Text>
              <Text onPress={ () => this.props.navigation.navigate('Registration')} style={{fontSize:20, color: '#C621EF'}}>Sign up</Text>
            </View> 
  
          </View>
        </LinearGradient>
      );
    }
  }

  const mapStateToProps = (state) => {
      return {value: state.value, password: state.password, alertValue: state.alertValue}
  };
  
  export default connect(mapStateToProps, {checkValue, checkUser, showAlert}) (LogIn);