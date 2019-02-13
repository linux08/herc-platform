'use strict';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import modalStyle from "../../components/modals/ModalStyles";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { toggleCameraModal } from "../../actions/ModalVisibilityActions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class CameraModal extends Component {

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
        if (this.camera) {
            const options = {
                base64: true,
                //  fixOrientation: true,
                // pauseAfterCapture: true
            }
            // if (params.width) {
            //     options.width = params.width
            // }
            try {
                const data = await this.camera.takePictureAsync(options);
                console.log(data, 'taken picture info, looking for name')
                let image = Object.assign({}, {
                    name: data.uri.substring(data.uri.lastIndexOf('/') + 1, data.uri.length),
                    image: "data:image/jpg;base64," + data.base64,
                    size: this._getSize(data.base64),
                    uri: data.uri,
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
        this.props.toggleCameraModal
    }

    _cancelPhoto = () => {
        this.setState({ image: null })
    }

    acceptPicture = () => {
        console.log("its a keeper");
        this.props.setPic(this.state.image);
        this._pressCancel;
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
                <Icon name={'cancel'} size={33} onPress={() => this.props.toggleCameraModal(false)} />
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
                    onPress={this._pressCancel.bind(this)}>Cancel
                    </Text>
                <Text
                    style={styles.accept}
                    onPress={this.acceptPicture}>Accept
                    </Text>
                <Text
                    style={styles.accept}
                    onPress={this._cancelPhoto.bind(this)}>Not this One!
                    </Text>
            </View>
        );
    }

    render() {
        console.log(Object.keys(this.state), "thisStatein Render")

        return (

            <Modal
                isVisible={this.props.showCameraModal}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
            >
                <View style={styles.container}>
                    {this.state.image ? this.renderImage() : this.renderCamera()}
                </View>
            </Modal>


        );
    }
}

const mapStateToProps = (state) => ({
    showCameraModal: state.ModalVisibilityReducers.showCameraModal
});

const mapDispatchToProps = (dispatch) => ({
    toggleCameraModal: (show) =>
        dispatch(toggleCameraModal(show))
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraModal)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: 50
    },

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'black'
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
