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

    // componentDidMount() {
    //     let canWeSeeIt = this.props.visibility;
    //     console.log(canWeSeeIt, "in the modal");
    //     this.setState({ visibility: canWeSeeIt });

    // }

    // closeModal = () => {
    //     this.setState({
    //         visibility: false
    //     })
    // }
    render() {
        let visible = this.props.visibility;
        console.log(visible, 'visibile')
        return (
            <Modal

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
                                        onPress={this.props.changeModal}
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
                                        onPress={this.props.changeModal}
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
