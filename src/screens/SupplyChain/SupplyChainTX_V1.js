import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

import MetricModal from '../../components/modals/MetricModal';
import CustomModal from '../../components/modals/CustomModal';
import CameraSourceModal from '../../components/modals/CameraSourceModal';
import { ToggleCamSourceModal } from '../../features/CamSourceModal/CamSourceModalActionCreators';
import EditModal from '../../components/modals/EDI_T_Modal';

import {
    ShowEditModal,
    ShowMetricModal,
    SendTransaction,
    AddDoc,
    AddEdiT,
    AddMetrics,
    AddPhoto,
} from '../../features/SupplyChainFlow/Transactions/TransactionActionCreators';

import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
import { TransInfoCard, MetricTransactionComponent, DocTransactionComponent, EdiTransactionComponent, CameraTransactionComponent } from "../../components/SupplyChainComponents/SupplyChainComponents";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
var RNFS = require('react-native-fs')

import { connect } from 'react-redux';
// import assets from "../../components/TesterAssets";

// var ImagePicker = require('react-native-image-picker');
const { height, width } = Dimensions.get('window');

import {
    BigYellowButton
} from "../../components/SharedComponents";

import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

const ORIGNAL_STATE = {
    img: {},
    doc: {},
    edi: {},
    metrics: {},
    isVisible: false,
}

class SupplyChainTX extends Component {

    constructor(props) {
        super(props);
        this.state = ORIGNAL_STATE;

        // this.showEditModal = this.showEditModal.bind(this);
        // this.showMetricModal = this.showMetricModal.bind(this);

        // this._pickImage = this._pickImage.bind(this);
        // this.setPic = this.setPic.bind(this);
        // this.setEDI = this.setEDI.bind(this);
        // this.setMetrics = this.setMetrics.bind(this);

        // this.clearEDI = this.clearEDI.bind(this);
        // this.clearMetrics = this.clearMetrics.bind(this);
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

    // clearImage = () => {
    //     this.setState({
    //         img: {}
    //     })

    // }
    // clearMetrics = () => {
    //     this.setState({
    //         metrics: {}
    //     })
    // }
    // clearEDI = () => {
    //     this.setState({
    //         edi: {}
    //     })
    // }

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
        console.log("setting a taken image");
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
        console.log("this will be Transaction Start!");
        console.log(this.state, 'state here');
        this.props.sendTransaction()
        this.setState({
            isVisible: true
        })
    }


    _onBackdropPress = () => {
        // this.showCamSourceModal();

    }


    render() {
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
                        <BigYellowButton buttonName={"Submit"} onPress={this.submitTransaction} />
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
                    onBackdropPress={() => this.toggleModal()}
                    percent={this.props.percent}
                    closeModal={this.allDone}
                    dismissRejectText={"All Done"}
                />


            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    modals: state.TransactionReducers.modals,
    showCamSourceModal: state.CamSourceModalReducer.showCamSourceModal,
    trans: state.TransactionReducers.trans,
    content: state.TransactionReducers.content,
    percent: state.TransactionReducers.percentage
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
        // margin: 5
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
