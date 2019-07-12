import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Avatar, DefaultTheme, Button } from 'react-native-paper';

const styles = StyleSheet.create({
    name: {
        alignSelf:'center',
        fontSize:14, 
        color: 'black',
        fontWeight:'bold'
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



class Users extends React.PureComponent {
    constructor(props) {
      super(props);
      this.counter = 0;
    }
    
    render() {
      let usersDom = this.props.data.map((user) => {
        return (
            <View key={this.counter++} style={{flexDirection:'row', marginBottom:10, justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <Avatar.Image size={44} source={{uri: `${user.picture}`}} theme={theme} style={{marginRight:10}}/>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
                <Button>Message</Button>
            </View>
        )
      });
      
      return (
        <ScrollView
            style={{padding:5,flex:1}}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {      
                this.scrollView.scrollToEnd({animated: true});
            }}
        >
            {usersDom}
        </ScrollView>
      )
    }
}

export default Users;