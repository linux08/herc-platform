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
import { ShowPasswordModal } from '../../features/SupplyChainFlow/Assets/AssetActionCreators';


class GetTransactionPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pwTry: "",
            headerText: "Enter Asset Password",
           
        }
    }

    
    getOriginTrans = password => {
       
          let transactions = this.props.selectedAsset.transactions;
          for (const key of Object.keys(transactions)) {
            if (transactions[key].header.password === password) {
              console.log("password found", transactions[key].header);
              if (transactions[key].header.password === password) {
                let OgHeader = transactions[key].header;
                let OriginTransInfo = {
                  OrigTxEntryHash: OgHeader.factomEntry,
                  hercId: OgHeader.hercId,
                  OgTxKey: key,
                  OgTxTime: OgHeader.dTime
                };
                this.props.SetOriginTransInfo(OriginTransInfo)
                
            }
        }
    }





    render() {
        console.log(this.props, "password modal");
        return (
            <Modal
                isVisible={this.props.showPasswordModal}
                onBackdropPress={() => this.props.ShowPasswordModal(false)}
            >
                <View style={localStyles.baseModal}>
                    <View style={localStyles.modalBackground}>
                        <Text style={[localStyles.pad10, localStyles.headingFont]}>{this.state.headerText}</Text>
                        <HercTextInputWithLabel 
                            style={{ width: '90%' }}
                            localOnChange={(text) => this.setState({ pwTry: text })} label={'Asset Password'}
                            placeholder={'Transaction Password'}
                        />
                        <View style={localStyles.buttonContainer}>
                            <TouchableOpacity style={localStyles.button} onPress={() => this.checkPassword(this.state.pwTry)}>
                                <Text style={localStyles.dismissAcceptText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={localStyles.button} onPress={() => this.props.ShowPasswordModal(false)}>
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
    passwordModal: state.TransactionReducers.modals.passwordModal,
    
})

mapDispatchToProps = (dispatch) => ({
    ShowPasswordModal: visible => dispatch(ShowPasswordModal(visible)),
    SetOriginTransInfo: 


})

export default connect(mapStateToProps, mapDispatchToProps)(GetTransactionPasswordModal);

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