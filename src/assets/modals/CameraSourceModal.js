import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import modalStyles from "./ModalStyles";

export default class CameraSourceModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false
        }
    }


    goToCamera = () => {
        console.log('goingtoCamera')
        this.props.changeModal(),

            this.props.navigation.navigate("Camera",
                {   // Passing in the route to return to after taking a picture 
                    origRoute: this.props.routeName,
                    navigation: this.props.navigation,
                    // sets the taken pic in local state of SupplyChainTX
                    setPic: this.props.setPic
                }
            )
    }

    render() {
        let visible = this.props.visibility;
        console.log(visible, 'visibile')
        return (
            <Modal
                //OnBackdrop will close the modal if clicked on outside of it
                onBackdropPress={this.props.onBackdropPress}
                backdropColor={'rgba(0,0,0,0.5)'}
                isVisible={this.props.visibility}
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
                                        onPress={this.props._pickImage}
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
