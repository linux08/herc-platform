import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import Modal from 'react-native-modal';
import ColorConstants from "../../constants/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

import { HercTextInputWithLabel } from '../SharedComponents'


export default class AssetPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwTry: ""
        }
    }
    render() {
        return (
            <Modal
                isVisible={this.props.isVisible}
                onBackdropPress={this.props.ShowPasswordModal}
            >
                <View style={localStyles.baseModal}>
                    <View style={localStyles.modalBackground}>
                        <Text style={[localStyles.pad10, localStyles.headingFont]}>EnterAsset Password</Text>
                        <HercTextInputWithLabel
                            style={{ width: '90%' }}
                            localOnChange={() => this.setState({ pwTry: text })} label={'Asset Password'}
                            placeholder={'Asset Password'}
                        />
                        <View style={[{ flexDirection: 'row', alignSelf: 'flex-end' }, localStyles.pad10]}>
                            <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => { this.props.checkPassword(this.state.pwTry) }}>
                                <Text style={localStyles.dismissAcceptText}>{this.state.dismissAcceptText}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => { this.props.closeModal(false) }}>
                                <Text style={localStyles.dismissRejectText}>{this.state.dismissRejectText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )

    }

}
const localStyles = StyleSheet.create({
    baseModal: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },

    modalBackground: {
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('40'),
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 6,
        padding: 5,
        marginHorizontal: 10,
    },


    pad10: {
        padding: 5
    },
    headingFont: {
        fontSize: 18,
        fontFamily: 'dinPro',
        color: '#737a9b'
    },
    contentFont: {
        fontSize: 18,
        fontFamily: 'dinPro',
        color: '#000000'
    },
    dismissAcceptText: {
        color: '#95c260',
        fontSize: 18,
    },
    dismissRejectText: {
        color: '#bbbecb',
        fontSize: 18,
    }

});