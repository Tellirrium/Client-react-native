import React from 'react';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'slide1',
    title: 'Log in',
    text: 'You can sign up for our chat or sign in with Google.',
    icon: 'ios-at',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'slide2',
    title: 'Amazing chat',
    text: 'Сhat with your friends around the world.',
    icon: 'ios-chatboxes',
    colors: ['#A3A1FF', '#3A3897'],
  },
];

 
export default class AppStart extends React.Component {

  static navigationOptions = {
    header: null
  }


  renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }


  renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }

  renderItem = slider => (
    <LinearGradient
      style={[styles.mainContent, {
        paddingTop: slider.topSpacer,
        paddingBottom: slider.bottomSpacer,
        width: slider.width,
        height: slider.height,
      }]}
      colors={slider.colors}
      start={{x: 0, y: .1}} end={{x: .1, y: 1}}
    >
      <Ionicons style={{ backgroundColor: 'transparent' }} name={slider.icon} size={200} color="white" />
      <View>
        <Text style={styles.title}>{slider.title}</Text>
        <Text style={styles.text}>{slider.text}</Text>
      </View>
    </LinearGradient>
  );

  onDone = () => {
    this.props.navigation.navigate('Login')
  }
 
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this.renderItem}
        onDone={this.onDone}
        renderDoneButton={this.renderDoneButton}
        renderNextButton={this.renderNextButton}
      />
    )
  }
}