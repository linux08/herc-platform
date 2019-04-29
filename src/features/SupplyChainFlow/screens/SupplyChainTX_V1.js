import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableHighlight,
    Alert,
    Linking
} from 'react-native';

import MetricModal from '../modals/MetricModal';
import CustomModal from '../../../components/modals/CustomModal';
import CameraSourceModal from '../../CamSourceModal/Modal/CameraSourceModal';
import { ToggleCamSourceModal } from '../../CamSourceModal/CamSourceModalActionCreators';
import EditModal from '../modals/EDI_T_Modal';
import Modal from 'react-native-modal';
import {
    ShowEditModal,
    ShowMetricModal,
    SendTransaction,
    AddDoc,
    AddEdiT,
    AddMetrics,
    AddPhoto,
} from '../Transactions/TransactionActionCreators';

import styles from "../../../assets/styles";
import ColorConstants from "../../../constants/ColorConstants";
import React, { Component } from 'react';
import { TransInfoCard, MetricTransactionComponent, DocTransactionComponent, EdiTransactionComponent, CameraTransactionComponent } from "./SupplyChainComponents";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
var RNFS = require('react-native-fs')

import { connect } from 'react-redux';
// import assets from "../../components/TesterAssets";

// var ImagePicker = require('react-native-image-picker');
const { height, width } = Dimensions.get('window');

import {
    BigYellowButton, ModalSubmitButton
} from "../../../components/SharedComponents";

import { widthPercentageToDP, heightPercentageToDP } from '../../../assets/responsiveUI';
const BigNumber = require("bignumber.js");

const ORIGNAL_STATE = {
    img: {},
    doc: {},
    edi: {},
    metrics: {},
    isVisible: false,
    displayConfirmationModal: false
}

componentWillUnmount = () => {
    this.setState({
        isVisible: false
    })
}


class SupplyChainTX extends Component {

    constructor(props) {
        super(props);
        this.state = ORIGNAL_STATE;
    }

    toggleModal = () => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    allDone = () => {
        this.setState({
            isVisible: false,
        })
        this.props.navigation.navigate('WalletNavigator');
        // this.props.clearState();

    }

    clearAll = () => {
        this.setState(ORIGNAL_STATE)
    }

    //  see if this works, trying to clean up a little
    clear = (stateProp) => {
        this.setState({
            stateProp: {}
        })
    }


    setEDI = (item) => {
        this.props.addEdit(item);
        this.props.showEditModal();
    }

    _pickDocument = () => {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            //this if(res) allows user to use native android back button to exit docpicker
            if (res) {
                if (error) Alert.alert("Something Went Wrong! Error: " + error);
                // Android
                RNFS.readFile(res.uri, 'base64')
                    .then(contents => {
                        let doc = {
                            uri: res.uri,
                            name: res.fileName,
                            size: res.fileSize,
                            type: res.type,
                            content: contents
                        }
                        this.props.addDocument(doc);
                    })
            }
        });
    }

    setPic = (snappedImg) => {
        console.log("setting a taken image, this is the data******", snappedImg);
        this.props.addPhoto(snappedImg)
    }


    setMetrics = (metricName, value) => {
        this.setState({
            metrics: {
                ...this.state.metrics,
                [metricName]: value
            }
        })
    }

    submitTransaction = () => {
        let docPrice = this.props.trans.data.documents.price ? this.props.trans.data.documents.price : 0;
        let imgPrice = this.props.trans.data.images.price ? this.props.trans.data.images.price : 0;
        let networkFee = this.props.networkFee ? new BigNumber(this.props.networkFee).toFixed(18) : 0;
        let totalHercCost = new BigNumber(docPrice).plus(imgPrice).plus(networkFee).toFixed(18);
        let gasPrice = this.props.gasPrice ? new BigNumber(this.props.gasPrice).toFixed(0) : 0;
        let totalEthCost = gasPrice;
        let hercBalance = new BigNumber(this.props.wallet.balances.HERC).multipliedBy(.000000000000000001).toFixed(18);

        if (isNaN(hercBalance) || hercBalance < totalHercCost) {
            this.setState({
                isVisible: false,
                displayConfirmationModal: false
            })
            Alert.alert(
                'Not enough funds',
                'Please purchase more Hercs or add ETH to your wallet',
                [
                    {
                        text: 'Top Up Hercs',
                        onPress: () => { Linking.openURL("https://purchase.herc.one") }
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
        else if (hercBalance > totalHercCost) {
            this.setState({
                isVisible: true
            })
            this.props.sendTransaction()
        }
    }


    _onBackdropPress = () => {
        // this.showCamSourceModal();

    }

    _displayConfirmationModal = () => {
        this.setState({
            displayConfirmationModal: true
        })
    }

    _toggledisplayConfirmationModal = () => {
        this.setState({
            displayConfirmationModal: !this.state.displayConfirmationModal
        })
    }


    render() {

        let docPrice = this.props.trans.data.documents.price ? this.props.trans.data.documents.price : 0;
        let imgPrice = this.props.trans.data.images.price ? this.props.trans.data.images.price : 0;
        let networkFee = this.props.networkFee ? new BigNumber(this.props.networkFee).toFixed(18) : 0;
        let total = new BigNumber(docPrice).plus(imgPrice).plus(networkFee).toFixed(18);
        let gasPrice = this.props.gasPrice ? new BigNumber(this.props.gasPrice).toFixed(0) : 0;

        return (

            <View style={styles.baseContainer}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'
                />
                <View style={styles.bodyContainer}>
                    <TransInfoCard header={this.props.trans.header} />

                    <View style={localStyles.transactionComponentListContainer}>

                        <CameraTransactionComponent
                            onPress={() => this.props.ToggleCamSourceModal()}
                            img={this.state.img}
                            image={this.props.trans.data.images}
                        />

                        <EdiTransactionComponent
                            onPress={() => this.props.showEditModal()}
                            componentName={"Choose EDI-T Sets"}
                            edi={this.props.trans.data.ediT}
                        />

                        <DocTransactionComponent
                            onPress={this._pickDocument}
                            doc={this.props.trans.data.documents}
                        />

                        <MetricTransactionComponent
                            onPress={() => this.props.showMetricModal()}
                            iconName='clipboard'
                            metrics={this.props.trans.data.metrics}
                        />

                    </View>
                    <View style={localStyles.pageBottom}>
                        <BigYellowButton buttonName={"Submit"} onPress={this._displayConfirmationModal} />
                    </View>
                </View>

                <CameraSourceModal
                    visibility={this.props.showCamSourceModal}
                    changeModal={this.props.ToggleCamSourceModal}
                    _pickImage={this._pickImage}
                    setPic={this.setPic}
                    navigation={this.props.navigation}
                    routeName={'SupplyChainTx'}
                    onBackdropPress={this.props.ToggleCamSourceModal}
                />

                <EditModal
                    visibility={this.props.modals.editModal}
                    changeModal={this.props.showEditModal}
                    setEDI={this.props.addEdit}
                    onBackdropPress={this.props.showEditModal}
                    clearEDI={this.props.clearEDI}
                />

                <MetricModal
                    visibility={this.props.modals.metricModal}
                    metrics={this.props.trans.data.metrics}
                    clearMetrics={this.clearMetrics}
                    localOnChange={this.setMetrics}
                    changeModal={this.showMetricModal}
                />

                <CustomModal
                    heading={"Your Transaction Is Being Written To The Blockchain"}
                    content={this.props.content}
                    modalCase="progress"
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this._toggleModal()}
                    percent={this.props.percent}
                    closeModal={this.allDone}
                    dismissRejectText={"All Done"}
                />

                <Modal
                    style={styles.baseModal}
                    backdropColor={'rgba(0,0,0,0.5)'}
                    animationIn={'slideInRight'}
                    animationOut={'slideOutRight'}
                    isVisible={this.state.displayConfirmationModal}
                    onRequestClose={() => { this._toggledisplayConfirmationModal() }}
                    onBackButtonPress={() => { this._toggledisplayConfirmationModal() }}>

                    <View style={styles.bodyContainer}>
                        <Text style={{ color: "black", fontSize: 18, marginBottom: "10%" }}> Confirm Transaction</Text>
                        <Text style={{ marginVertical: 10 }}>Network Fee: {networkFee} HERC</Text>
                        <Text style={{ marginVertical: 10 }}>Document Fee: {docPrice} HERC</Text>
                        <Text style={{ marginVertical: 10 }}>Photo Fee: {imgPrice} HERC</Text>
                        <Text style={{ marginBottom: "10%" }}>Total: {total} HERC</Text>
                        <Text style={{ marginVertical: 10 }}>Gas Price (Average): {gasPrice} GWEI </Text>
                        <Text style={{ marginVertical: 10 }}>Gas Supply: 80,000 </Text>
                        <Text style={{ marginVertical: 10 }}>Total Est. TX Cost:  {(80000 * gasPrice) * .000000001} ETH</Text>

                        <ModalSubmitButton buttonName={"Submit"} onPress={() => this.submitTransaction()} />
                    </View>
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    modals: state.TransactionReducers.modals,
    showCamSourceModal: state.CamSourceModalReducer.showCamSourceModal,
    trans: state.TransactionReducers.trans,
    content: state.TransactionReducers.content,
    percent: state.TransactionReducers.percentage,
    networkFee: state.TransactionReducers.networkFee,
    gasPrice: state.TransactionReducers.gasPrice,
    wallet: state.WalletReducers.wallet,
})

const mapDispatchToProps = (dispatch) => ({
    showMetricModal: () => dispatch(ShowMetricModal()),
    addMetrics: (newMetrics) => dispatch(AddMetrics(newMetrics)),

    ToggleCamSourceModal: () => dispatch(ToggleCamSourceModal()),
    addPhoto: (imgObject) => dispatch(AddPhoto(imgObject)),

    addDocument: (file) => dispatch(AddDoc(file)),

    showEditModal: () => dispatch(ShowEditModal()),
    addEdit: (ediItem) => dispatch(AddEdiT(editItem)),


    sendTransaction: () => dispatch(SendTransaction()),

    ToggleCamSourceModal: () => dispatch(ToggleCamSourceModal()),

})

export default connect(mapStateToProps, mapDispatchToProps)(SupplyChainTX);
const localStyles = StyleSheet.create({

    textBold: {
        fontSize: 14,
        color: ColorConstants.MainSubGray,
        marginLeft: 3,
        fontWeight: 'bold',
    },

    textNormal: {
        fontSize: 14,
        color: ColorConstants.MainSubGray,
        marginLeft: 3,
        fontWeight: 'normal',
    },
    transactionComponentListContainer: {
        width: '100%',
        height: heightPercentageToDP('50'),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: ColorConstants.MainGray,
    },

    pageBottom: {
        height: '20%',
        backgroundColor: ColorConstants.MainGray,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        padding: 20,
    },
})
