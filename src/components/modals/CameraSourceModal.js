import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ToggleCamSourceModal } from "../../features/CamSourceModal/CamSourceModalActionCreators";
import Modal from 'react-native-modal';
import modalStyles from "./ModalStyles";
// import { NavigationActions } from 'react-navigation';
var ImagePicker = require('react-native-image-picker');

class CameraSourceModal extends Component {
    constructor(props) {
        super(props);
    }
    goToCamera = () => {
        this.props.toggleCamSourceModal(false);
        const options = {
            base64: true,
        }
        ImagePicker.launchCamera(options,(response) => {

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
                let img = {
                    name: response.uri.substring(response.uri.lastIndexOf('/') + 1, response.uri.length),
                    imageString: "data:image/jpg;base64," + response.data,
                    size: response.fileSize,
                    uri: response.uri
                }
                this.props.setPic(img);
            };
        })
    }

    _pickImage = () => {
        this.props.toggleCamSourceModal();

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
                let img = {
                    name: response.uri.substring(response.uri.lastIndexOf('/') + 1, response.uri.length),
                    imageString: "data:image/jpg;base64," + response.data,
                    size: response.fileSize,
                    uri: response.uri
                }
                this.props.setPic(img);
            };
        })
    };


    render() {
        console.log(this.props, 'render in camsource');

        return (
            <Modal
                //OnBackdrop will close the modal if clicked on outside of it
                onBackdropPress={() => this.props.toggleCamSourceModal()}
                backdropColor={'rgba(0,0,0,0.5)'}
                //  Attached visiblility to the redux state
                isVisible={this.props.showCamSourceModal}
                onRequestClose={() => { console.log("modal closed") }}
            >
                <View style={modalStyles.modalLower}>
                    <View style={modalStyles.imageSourceContainer}>
                        <Text style={modalStyles.menuTitle}>Choose Image Source</Text>

                        <View style={modalStyles.lowerModalContainer}>
                            <View style={modalStyles.sourceIconContainer}>

                                <View style={modalStyles.camSourceIcon}>
                                    <Icon
                                        containerStyle={modalStyles.iconButton}
                                        name="camera"
                                        size={20}
                                        color="black"
                                        onPress={this.goToCamera}
                                    >
                                    </Icon>
                                </View>
                                <Text style={modalStyles.labelTitle}>Camera</Text>
                            </View>

                            <View style={modalStyles.sourceIconContainer}>
                                <View style={modalStyles.camSourceIcon}>
                                    <Icon
                                        name="folder-open"
                                        size={20}
                                        containerStyle={modalStyles.iconButton}
                                        color="black"
                                        onPress={this._pickImage}
                                    >
                                    </Icon>
                                </View>
                                <Text style={modalStyles.labelTitle}>Gallery</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => ({
    showCamSourceModal: state.CamSourceModalReducer.showCamSourceModal,

});

const mapDispatchToProps = (dispatch) => ({
    toggleCamSourceModal: () =>
        dispatch(ToggleCamSourceModal()),
  
})
export default connect(mapStateToProps, mapDispatchToProps)(CameraSourceModal);