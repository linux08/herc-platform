import {
    StyleSheet,
    Text,
    View,
    ImageStore
} from 'react-native';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ToggleCamSourceModal } from "../CamSourceModalActionCreators";
import Modal from 'react-native-modal';
import ColorConstants from '../../../constants/ColorConstants';
// import modalStyles from "../../../components/modals/ModalStyles";
// import { NavigationActions } from 'react-navigation';
var ImagePicker = require('react-native-image-picker');


class CameraSourceModal extends Component {
    constructor(props) {
        super(props);
    }
    goToCamera = () => {
        this.props.toggleCamSourceModal(false);
        console.log("this is the props of go to camera", this.props)
        let options = {}

        if(this.props.routeName == "RegAsset1"){
            options = {
                maxWidth: 400,
                maxHeight: 400
            };
        }

        console.log(options)

        ImagePicker.launchCamera(options, (response) => {

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

                let uri = response.uri;

                ImageStore.getBase64ForTag(
                    uri,
                    (base64image) => {
                        let img = {
                            name: response.fileName,
                            imageString: base64image,
                            size: response.fileSize,
                            uri: response.uri,
                            type: response.type
                        }
                        this.props.setPic(img);
                    },
                    (error) => {
                        console.error(error)
                    }
                )
            };
        })
    }

    _pickImage = () => {
        this.props.toggleCamSourceModal();
        let options = {}

        ImagePicker.launchImageLibrary(options, (response) => {

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
                let uri = response.uri;

                ImageStore.getBase64ForTag(
                    uri,
                    (base64image) => {
                        let img = {
                            name: response.fileName,
                            imageString: base64image,
                            size: response.fileSize,
                            uri: response.uri,
                            type: response.type
                        }
                        this.props.setPic(img);
                    },
                    (error) => {
                        console.error(error)
                    }
                )
            };
        })
    };


    render() {

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



const modalStyles = StyleSheet.create({
    cameraModal: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: widthPercentageToDP('95'),
        height: heightPercentageToDP('95'),
        backgroundColor: 'black',
    },

    baseModal: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },

    modalLower: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1
    },

    lowerModalContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        // backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20
    },

    imageSourceContainer: {
        flexDirection: 'column',
        backgroundColor: ColorConstants.MainGray,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '30%',
        borderWidth: 0,
        borderRadius: 8


    },
    sourceIconContainer: {
        height: '70%',
        width: '30%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: ColorConstants.MainGray
    },
    camSourceIcon: {
        backgroundColor: ColorConstants.MainGray,
        // justifyContent: 'space-between',
        // alignSelf: 'flex-start',
        // flexDirection: 'column',
    },

    modalContent2: {
        backgroundColor: ColorConstants.MainSubRed,
        height: widthPercentageToDP('30'),
        width: heightPercentageToDP('25'),
    },



    labelTitle: {
        fontSize: 18,
        color: ColorConstants.MainBlue,
        margin: 5
    },

    menuTitle: {
        color: ColorConstants.MainBlue,
        fontSize: 26,
        margin: 5,

    },


})
