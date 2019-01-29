import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { relative } from 'path';

export default class Camera extends Component {

  constructor(props) {
    super(props);
    const initial = null;
    this.state = {
      image: null,
    };
  }
  _getSize = (data) => {
    console.log('Camera: getting size');
    let string = data;
    let size = atob(string);
    console.log("Camera: size =" + size.length);
    return (size.length);

  }

  takePicture = async () => {
    console.log("taking");
    const { params } = this.props.navigation.state;
    if (this.camera) {
      //picture orientation bug fix zube card #406
      const options = { base64: true, fixOrientation: true }
      try {
        const data = await this.camera.takePictureAsync(options);
        // this._getSize(data.base64);
        let image = Object.assign({}, {
          uri: data.uri,
          size: this._getSize(data.base64),
          string: "data:image/jpg;base64," + data.base64
        })
        this.setState({ image })

        params.setPic(this.state.image);
        console.log("Camera: afterBase", data.uri, "Camera: size: ", this._getSize(data.base64));
      } catch (err) { console.log('err: ', err)}
    };
  }

  renderCamera() {
    return (
      <RNCamera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        flashMode={RNCamera.Constants.FlashMode.off}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}>
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)">
          <View />
        </TouchableHighlight>
      </RNCamera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.image.uri }}
          style={styles.preview}/>
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ image: null })}>Cancel</Text>
        <Text
          style={styles.accept}
          onPress={() => this.props.navigation.goBack()}>Accept</Text>
      </View>
    );
  }

  render() {
    console.log(Object.keys(this.state), "thisStatein Render")
    
    return (
      <View style={styles.container}>
        {this.state.image ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 400,
    width: 400
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: -5,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  accept: {
    margin: 10,
    top: -5,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
    alignSelf: 'center'
  }
});
