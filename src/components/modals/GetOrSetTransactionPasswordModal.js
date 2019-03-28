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
import { ShowPasswordModal, SetNewOriginTransPassword, SetOriginTransInfo } from '../../features/SupplyChainFlow/Transactions/TransactionActionCreators';
import { transitions } from 'material-ui/styles';


class GetOrSetTransactionPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: "",
            getHeaderText: "Enter The Transaction Code Word",
            setHeaderText: "Pick A Code Word To ID the Transaction"

        }
    }

    handlePasswordInput = (password) => {
        if (this.props.place === 'Originator') {

            this.props.SetNewOriginTransPassword(password);
            this.props.passwordHandled();
        } else {

            this.findOriginTrans(this.state.pass);

        }

    }


    findOriginTrans = password => {

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
                   this.props.passwordHandled()
                }
            }
        }
    }

goToSupplyChainTrans = () => {
    this.props.ShowPasswordModal(); 
    this.props.navigation.navigate('SupplyChainTX')
}


    render() {
        console.log(this.props, "password modal");
        let headerText = this.props.place === "Originator" ?
            this.state.setHeaderText :
            this.state.getHeaderText;

        return (
            <Modal
                isVisible={this.props.showPasswordModal}
                onBackdropPress={() => this.props.ShowPasswordModal()}
            >
                <View style={localStyles.baseModal}>
                    <View style={localStyles.modalBackground}>
                        <Text style={[localStyles.pad10, localStyles.headingFont]}>{headerText}</Text>
                        <HercTextInputWithLabel
                            style={{ width: '90%' }}
                            localOnChange={(text) => this.setState({ pass: text })} label={'Transaction Password'}
                            placeholder={'Transaction Password'}
                        />
                        <View style={localStyles.buttonContainer}>
                            <TouchableOpacity style={localStyles.button} onPress={() => this.handlePasswordInput(this.state.pass)}>
                                <Text style={localStyles.dismissAcceptText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={localStyles.button} onPress={() => this.props.ShowPasswordModal()}>
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
    showPasswordModal: state.TransactionReducers.modals.passwordModal,

})

mapDispatchToProps = (dispatch) => ({
    ShowPasswordModal: () => dispatch(ShowPasswordModal()),
    SetOriginTransInfo: (transInfo) => dispatch(SetOriginTransInfo(transInfo)),
    SetNewOriginTransPassword: (password) => dispatch(SetNewOriginTransPassword(password))


})

export default connect(mapStateToProps, mapDispatchToProps)(GetOrSetTransactionPasswordModal);

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