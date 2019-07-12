import React from 'react';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux';

import {registrUser, registrValue} from '../Redux/actions';


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

class Registration extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
      super();
      this.state = {
        textEmail: '',
        textPassword: '',
        textName: ''
      }
    }

    registrUser = () => {
        if (/^.+@.+\..+$/igm.test(this.state.textEmail) && this.state.textPassword && this.state.textName) {

            const user = {
                email: this.state.textEmail.trim(),
                name: this.state.textName.trim(),
                password: this.state.textPassword.trim()
            }

            this.props.registrUser(this, user);
        } else {
            this.props.registrValue(true);
        }
    }


    showError = () => {
        if (this.props.registrationValue) {
            return (
                <Text style={{alignSelf:'flex-start', color: 'red', padding:5, fontSize:20}}>Invalid data or this email address is already in use.</Text>
            )
        } else {
            return null;
        }
    }

  
    render() {
      return (
        <LinearGradient colors={['#1E90FF', '#9400D3'].reverse()} start={{x: .1, y: 1}} end={{x: 0, y: .1}} style={{flex: 1}}>
          <View style={styles.containerLogin}>
            <Text style={styles.textLogin}>Registration</Text>
          
            <TextInput
              label='Email'
              onChangeText={(text) => this.setState({textEmail: text})}
              value={this.state.textEmail}
              mode='flat'
              style={{marginBottom: 10, color:'#fff'}}
              selectionColor='#9400D3'
            />

            <TextInput
              label='Full name'
              onChangeText={(text) => this.setState({textName: text})}
              value={this.state.textName}
              mode='flat'
              style={{marginBottom: 10, color:'#fff'}}
              selectionColor='#9400D3'
            />
  
            <TextInput
              label='Password'
              onChangeText={(text) => this.setState({textPassword: text})}
              value={this.state.textPassword}
              mode='flat'
              selectionColor='#9400D3'
              style={{marginBottom: 10}}
            />
          
            <Button color='#9400D3' icon="done" mode="contained" onPress={this.registrUser} style={{margin:10,shadowRadius:3}}>
              Registration
            </Button>

            {this.showError()}
   
          </View>
          </LinearGradient>
      );
    }
  }

  const mapStateToProps = (state) => {
      return {registrationValue: state.registrationValue}
  };
  
  export default connect(mapStateToProps, {registrUser, registrValue}) (Registration);