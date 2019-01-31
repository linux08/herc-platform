'use strict';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image, ActivityIndicator, Modal } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { relative } from 'path';
import modalStyle from "../assets/confModalStyles";

export default class Camera extends Component {

  constructor(props) {
    super(props);
    const initial = null;
    this.state = {
      capturing: false
    };
  }

  _getSize = (data) => {
    let size = atob(data);
    return (size.length);
  }

  // Trying to make the camera reusable for the register asset flow,
  // passing in the route that is calling the camera in params.origRoute
  // also passing in the function to set the state with the taken image.
  takePicture = async () => {
    this.setState({ capturing: true })
    console.log("takingPicture");
    const { params } = this.props.navigation.state;
    console.log(params, "camera params")
    if (this.camera) {
      const options = {
        base64: true,
        //  fixOrientation: true,
        pauseAfterCapture: true
      }
      if (params.width) {
        options.width = params.width
      }
      try {
        const data = await this.camera.takePictureAsync(options);
        console.log(data, 'taken picture info, looking for name')
        let image = Object.assign({}, {
          name: data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.length),
          uri: data.uri,
          size: this._getSize(data.base64),
          string: "data:image/jpg;base64," + data.base64
        })
        console.log(image.name, "image name!!!! i hope")
        this.setState({
          image
        })
        console.log("Camera: afterBase", data.uri, "Camera: size: ", this._getSize(data.base64));
      } catch (err) { console.log('err: ', err) }
    };
  }

  _pressCancel() {
    this.setState({ image: null })
    if (this.camera) {
      this.camera.resumePreview()
    }
  }
  

  acceptPicture = () => {
    const { params } = this.props.navigation.state;
    console.log("its a keeper");
    params.setPic(this.state.image);
    params.navigation.navigate(params.origRoute)

  }

  renderCamera() {
    return (
      <RNCamera
        ref={(cam) => {
          this.camera = cam;
        }}
        // ratio={"4:4"}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
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
          style={styles.preview} />
        <Text
          style={styles.cancel}
          onPress={this._pressCancel.bind(this)}>Cancel</Text>
        <Text
          style={styles.accept}
          onPress={this.acceptPicture}>Accept</Text>
      </View>
    );
  }

  render() {
    console.log(Object.keys(this.state), "thisStatein Render")

    return (
      <View style={styles.container}>
        {/* <Modal
          transparent={false}
          animationType={'none'}
          visible={this.state.capturing}
          onRequestClose={() => { console.log("modal closed") }}
        >
          <View style={modalStyle.container}>
            <View style={modalStyle.modalBackground}>
              <View style={modalStyle.activityIndicatorWrapper}>
                <Text>Snapping Photo</Text>
                <ActivityIndicator
                  animating={this.state.capturing} size="large" color="#091141" />
              </View>
            </View>
          </View>
        </Modal> */}
        {this.state.image ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 50
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
