import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Avatar, DefaultTheme } from 'react-native-paper';


const styles = StyleSheet.create({
    textContainer: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        maxWidth: 215
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom:5
    },
    text: {
        fontSize: 14
    }
});

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'transparent',
      accent: 'transparent',
    }
};

class Messages extends React.PureComponent {
    constructor(props) {
      super(props);
      this.counter = 0;
    }
    
    render() {
      let messageDom = this.props.data.map((message) => {
        return (

            <View key={this.counter++} style={{flex:1, flexDirection: 'row', padding: 10}}>
                <Avatar.Image size={54} source={{uri: `${message.person.src}`}} theme={theme} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{message.person.name}</Text>
                    <Text style={styles.text}>{message.text}</Text>
                </View>
            </View>
        )
      });
      
      return (
        <ScrollView 
            style={{flex:1, marginTop:15}}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {        
                this.scrollView.scrollToEnd({animated: true});
            }}
        >
            {messageDom}
        </ScrollView>
      )
    }
}


export default Messages;