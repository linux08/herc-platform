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
import CameraSourceModal from '../../components/modals/CameraSourceModal';
import EditModal from '../../components/modals/EDI_T_Modal';
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
import Header from "../../components/Headers/Header";
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
import { ShowMetricModal, ShowCamSourceModal, SendTransaction } from '../../features/SupplyChainFlow/Transactions/TransactionActionCreators';

const ORIGNAL_STATE = {
    img: {},
    doc: {},
    edi: {},
    metrics: {}
}

export default class SupplyChainTX extends Component {
    navigationOptions = ({ navigation }) => {
        return {
            header: <Header headerName={'Asset Name'} navigation={navigation} />
        }
    }
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

componentDidMount = () => {
    this
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

    testOnPress = () => {
        console.log("this will be Transaction Start!");
        console.log(this.state, 'state here');
    }


    _onBackdropPress = () => {
        // this.showCamSourceModal();

    }


    render() {
        let metrics = assets[0].CoreProps;
        return (

            <View style={styles.baseContainer}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'
                />
                <Header headerName={'Asset Name'} navigation={this.props.navigation} />
                <View style={styles.bodyContainer}>
                    <TransInfoCard transSide={'Originator'} hercId={'42'} />

                    <View style={localStyles.transactionComponentListContainer}>

                        <CameraTransactionComponent
                            onPress={() => this.showCamSourceModal()}
                            img={this.state.img}
                            image={this.state.img.string}
                        />

                        <EdiTransactionComponent
                            onPress={() => this.showEditModal()}
                            componentName={"Choose EDI-T Sets"}
                            edi={this.state.edi}
                        />

                        <DocTransactionComponent
                            onPress={this._pickDocument}
                            doc={this.state.doc}
                        />

                        <MetricTransactionComponent
                            onPress={() => this.showMetricModal()}
                            iconName='clipboard'
                        />

                    </View>
                    <View style={localStyles.pageBottom}>
                        <BigYellowButton buttonName={"Submit"} onPress={this.testOnPress} />
                    </View>
                </View>

                <CameraSourceModal
                    visibility={this.props.modals.showCamSourceModal}
                    changeModal={this.props.showCamSourceModal}
                    _pickImage={this._pickImage}
                    setPic={this.setPic}
                    navigation={this.props.navigation}
                    routeName={'SupplyChainTx'}
                    // onBackdropPress={this.props.showCamSourceModal()}
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
                    metrics={metrics}
                    clearMetrics={this.clearMetrics}
                    localOnChange={this.setMetrics}
                    changeModal={this.showMetricModal}
                />

            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    modals: state.TransactionReducers.modals,
    trans: state.TransactionReducers.trans,
})

const mapDispatchToProps = (dispatch) => ({
    showMetricModal = () => dispatch(ShowMetricModal()),
    addMetrics = (newMetrics) => dispatch(AddMetrics(newMetrics)),

    showCamSourceModal = () => dispatch(ShowCamSourceModal()),
    addPhoto = (imgObject) => dispatch(AddPhoto(imgObject)),

    addDocument = (file) => dispatch(AddDoc(file)),
    showEditModal = () => dispatch(ShowEditModal()),
    addEdit = (ediItem) => dispatch(AddEdiT(editItem)),


    sendTransaction = () => dispatch(SendTransaction())

})
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