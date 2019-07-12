import React from 'react';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { TextInput, DefaultTheme, Avatar, Button } from 'react-native-paper';
import {connect} from 'react-redux';
import {Permissions, Constants} from 'expo';
import * as ImagePicker from 'expo-image-picker';

import {updatePhoto, showUsersFromBd} from '../Redux/actions';
import Users from '../Components/users'


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'transparent',
      accent: 'transparent',
    }
};

const styles = StyleSheet.create({
  headline: {
    color: 'tomato',
    fontSize:18,
    marginTop:30,
    marginBottom: 10
  },
  headline2: {
    color: 'tomato',
    fontSize:18,
    marginTop:20,
    marginBottom: 10
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    marginBottom:10,
    color:'red',
    fontWeight:'bold'
  }
});


class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      uploading: false,
    };
  }


  render() {
      return (
          <View style={{flex:1, justifyContent:'flex-start', alignItems: 'center'}}>
              <Text style={styles.headline}>Personal information</Text>
              <Text style={styles.name}>{this.props.user.name}</Text>
              
              <Avatar.Image size={74} source={{uri: `${this.props.user.src}`}} theme={theme} style={{marginBottom:5}}/>

              <Button onPress={this._pickImage}>Pick an image from camera roll</Button>
              <Button onPress={this._takePhoto}>Take a photo</Button>
              <Text onPress={() => this.props.showUsersFromBd()} style={styles.headline2}>Show/update users</Text>

              <Users data={this.props.users}/>

              {this._maybeRenderUploadingOverlay()}
          </View>
        )
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };


  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();


        this.props.updatePhoto(uploadResult.location, this.props.user);
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };
}


async function uploadImageAsync(uri) {

  let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];
  let formData = new FormData();

  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });


  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}



const mapStateToProps = (state) => {
  return {user: state.user, messages: state.messages, src: state.user.src, users: state.users};
};

export default connect(mapStateToProps, {updatePhoto, showUsersFromBd})(Info);