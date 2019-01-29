import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import styles from '../assets/styles';
import { connect } from 'react-redux';
import newOriginator from "../components/buttons/originatorButton.png"; // todo: turn into vector
import newRecipient from "../components/buttons/recipientButton.png"; // todo: turn into vector
import submit from "../components/buttons/submit.png"; // todo: turn into vector
import uploadImage from "../components/buttons/uploadImage.png";
import takePhoto from "../components/buttons/takePhoto.png";
import { addPhoto } from '../actions/AssetActions';
var ImagePicker = require('react-native-image-picker');

class ImageUpload extends Component {

  constructor(props){
    super(props)
    this.setImage = this.setImage.bind(this);
    this.state = {
      image: null,
    }
  }

  async componentWillMount() {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA).then(await Permissions.askAsync(Permissions.CAMERA_ROLL));
    // this.setState({ permissionsGranted: 'granted' });
  }

  setImage = (imgObj) => {
    if(imgObj) console.log("trying to set the Image");

    this.setState({
      image: imgObj.string,
      size: imgObj.size,
      uri: imgObj.path
    })

  }
  _pickImage = () => {
    console.log("ImageUpload Camera: picking image")

    ImagePicker.launchImageLibrary({}, (response) => {

      if (response.didCancel) {
        console.log('ImageUpload Camera: User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImageUpload Camera: ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('ImageUpload Camera: User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.setState({
          image: "data:image/jpg;base64," + response.data,
          size: response.fileSize,
          uri: source
        });
      }
    });
  }
  _takePic = () => {
    const { navigate } = this.props.navigation;
    console.log("ImageUpload Camera: takingpic")
    navigate('Camera',{ setPic: this.setImage})

  }

  _onSubmit = () => {
    const { navigate } = this.props.navigation;
    let image = this.state;
    this.props.addPhoto(image);
    navigate('SupplyChainReview', { logo: this.props.logo, name: this.props.name })
  };

  render() {
    let image = this.state;
    console.log(Object.keys(image), 'ImageUpload Camera: should be this state');
    let transInfo = this.props.transInfo;
    let locationImage = this.props.transInfo.location === 'recipient' ? newRecipient : newOriginator;
    let logo = this.props.logo;

    return (
      <View style={styles.container} >
        <View style={styles.containerCenter} >
          <View style={{ margin: 25 }}></View>
          <Image source={locationImage} style={[localStyles.assetLocationLabel, { marginTop: 5, marginBottom: 50 }]} />

          {
            image &&
            <Image source={{ uri: image.image }} style={{ width: 200, height: 200, margin: 10 }} />
          }

          <TouchableHighlight onPress={() => this._pickImage()}>
            <Image style={styles.menuButton} source={uploadImage} />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this._takePic()}>
            <Image style={styles.menuButton} source={takePhoto} />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this._onSubmit()}>
            <Image source={submit} style={localStyles.submitButton} />
          </TouchableHighlight>

        </View >
      </View>
    )
  }

}


const mapStateToProps = (state) => ({
  transInfo: state.AssetReducers.trans.header,
  logo: state.AssetReducers.selectedAsset.Logo,
  name: state.AssetReducers.selectedAsset.Name

});
const mapDispatchToProps = (dispatch) => ({
  addPhoto: (image) =>
    dispatch(addPhoto(image)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);

const localStyles = StyleSheet.create({
  submitButton: {
    height: 40,
    width: 200,
    resizeMode: "contain",
    marginTop: 20,
    alignSelf: "center"
  },
  assetLocationLabel: {
    height: 30,
    width: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 80
  },
});
