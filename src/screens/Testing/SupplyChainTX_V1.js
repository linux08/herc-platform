import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

import MetricModal from '../../assets/modals/MetricModal';
import CameraSourceModal from '../../assets/modals/CameraSourceModal';
import EditModal from '../../assets/modals/EDI_T_Modal';
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
import Header from "../../components/Headers/Header";
import { TransInfoCard, MetricTransactionComponent, DocTransactionComponent, EdiTransactionComponent, CameraTransactionComponent } from "../../components/SupplyChainComponents";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
var RNFS = require('react-native-fs')
import { connect } from 'react-redux';
import assets from "../../components/TesterAssets";

var ImagePicker = require('react-native-image-picker');
const { height, width } = Dimensions.get('window');

import {
    BigYellowButton
} from "../../components/SharedComponents";

import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';
const ORIGNAL_STATE = {
    metricModalVisibility: false,
    camerModalVisibility: false,
    editModalVisibility: false,
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

        this.showCameraModal = this.showCameraModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.showMetricModal = this.showMetricModal.bind(this);

        this._pickImage = this._pickImage.bind(this);
        this.setPic = this.setPic.bind(this);
        this.setEDI = this.setEDI.bind(this);
        this.setMetrics = this.setMetrics.bind(this);

        this.clearEDI = this.clearEDI.bind(this);
        this.clearMetrics = this.clearMetrics.bind(this);
    }

    clearAll = () => {
        this.setState(ORIGNAL_STATE)
    }

    clearDoc = () => {
        this.setState({
            doc: {}
        })
    }

    clearImage = () => {
        this.setState({
            img: {}
        })

    }
    clearMetrics = () => {
        this.setState({
            metrics: {}
        })
    }
    clearEDI = () => {
        this.setState({
            edi: {}
        })
    }

    showEditModal = () => {
        this.setState({
            editModalVisibility: !this.state.editModalVisibility
        })

    }

    showMetricModal = () => {
        this.setState({
            metricModalVisibility: !this.state.metricModalVisibility
        })

    }

    showCameraModal = () => {
        this.setState({
            camerModalVisibility: !this.state.camerModalVisibility
        })

    }

    setEDI = (item) => {
        this.setState({
            edi: item
        })
        this.showEditModal();
    }

    _pickImage = () => {

        ImagePicker.launchImageLibrary({}, (response) => {

            if (response.didCancel) {
                console.log('ImageUpload Camera: User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImageUpload Camera: ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('ImageUpload Camera: User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    img: {
                        name: response.uri.substring(response.uri.lastIndexOf('/') + 1, response.uri.length),
                        image: "data:image/jpg;base64," + response.data,
                        size: response.fileSize,
                        uri: source
                    }
                });
                this.showCameraModal();
            }
        });
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
                        this.setState({
                            doc: {
                                uri: res.uri,
                                name: res.fileName,
                                size: res.fileSize,
                                type: res.type,
                                content: contents
                            }
                        });
                    })
            }
        });
    }

    setPic = (snappedImg) => {
        console.log("setting a taken image");
        this.setState({
            img: snappedImg
        })
    }


    setMetrics = (metricName, value) => {
        this.setState({
            metrics: {
                [metricName]: value
            }
        })
    }

    testOnPress = () => {
        console.log("this will be Transaction Start!");
        console.log(this.state, 'state here');
    }


    _onBackdropPress = () => {
        this.showCameraModal();

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
                            onPress={() => this.showCameraModal()}
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
                    visibility={this.state.camerModalVisibility}
                    changeModal={this.showCameraModal}
                    _pickImage={this._pickImage}
                    setPic={this.setPic}
                    navigation={this.props.navigation}
                    routeName={'SupplyChainTx'}
                    onBackdropPress={this._onBackdropPress}
                />

                <EditModal
                    visibility={this.state.editModalVisibility}
                    changeModal={this.showEditModal}
                    setEDI={this.setEDI}
                    onBackdropPress={this.showEditModal}
                    clearEDI={this.clearEDI}
                />

                <MetricModal
                    visibility={this.state.metricModalVisibility}
                    metrics={metrics}
                    clearMetrics={this.clearMetrics}
                    localOnChange={this.setMetrics}
                    changeModal={this.showMetricModal}
                />

            </View>
        )
    }
}

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