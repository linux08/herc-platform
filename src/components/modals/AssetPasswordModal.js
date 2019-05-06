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
import { connect } from 'react-redux';
import { HercTextInputWithLabel } from '../SharedComponents'
import { ToggleAssetPasswordModal } from '../../features/SupplyChainFlow/Assets/AssetActionCreators';


class AssetPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwTry: "",
            headerText: "Enter Asset Password",

        }
    }

    checkPassword = () => {
        if (this.props.selectedAsset.Password === this.state.pwTry) {
            this.props.passwordCorrect()
        } else {
           this.setState({
               headerText: 'Password Incorrect!'
           })
        }
    }


    render() {
        console.log(this.props, "password modal");
        return (
            <Modal
                isVisible={this.props.showPasswordModal}
                onBackdropPress={() => this.props.ToggleAssetPasswordModal()}
            >
                <View style={localStyles.baseModal}>
                    <View style={localStyles.modalBackground}>
                        <Text style={[localStyles.pad10, localStyles.headingFont]}>{this.state.headerText}</Text>
                        <HercTextInputWithLabel
                            style={{ width: '90%' }}
                            localOnChange={(text) => this.setState({ pwTry: text })} label={'Asset Password'}
                            placeholder={'Asset Password'}
                        />
                        <View style={localStyles.buttonContainer}>
                            <TouchableOpacity style={localStyles.button} onPress={() => this.checkPassword(this.state.pwTry)}>
                                <Text style={localStyles.dismissAcceptText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={localStyles.button} onPress={() => this.props.ToggleAssetPasswordModal(false)}>
                                <Text style={localStyles.dismissRejectText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )

    }

}

mapStateToProps = (state) => ({
    selectedAsset: state.AssetReducers.selectedAsset,
    showPasswordModal: state.AssetReducers.showPasswordModal,
    AssetPassword: state.AssetReducers.selectedAsset.Password
})

mapDispatchToProps = (dispatch) => ({
    ToggleAssetPasswordModal: () => dispatch(ToggleAssetPasswordModal()),

})

export default connect(mapStateToProps, mapDispatchToProps)(AssetPasswordModal);

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

    buttonContainer: {
        width: '100%',
        padding: 10,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    button: {
        height: 20,
        width: 70,
        backgroundColor: ColorConstants.MainGray,
        marginHorizontal: 20,
        alignSelf: 'center',
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
        color: '#000000',
        textAlign: 'center'
    },
    dismissAcceptText: {
        color: ColorConstants.MainSubCrownBlue,
        fontSize: 18,
        textAlign: 'center'
    },
    dismissRejectText: {
        color: ColorConstants.MainSubRed,
        fontSize: 18,
        textAlign: 'center'
    }

});
