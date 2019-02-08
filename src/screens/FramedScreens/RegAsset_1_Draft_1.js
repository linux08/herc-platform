import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
} from 'react-native';
const loadingGif = require("../../assets/icons/liquid_preloader_by_volorf.gif");

import AssetCard from "../../components/AssetCard";
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
import CameraSourceModal from "../../components/modals/CameraSourceModal"
import { createStackNavigator } from 'react-navigation';
import { AddPhotoButton, AddMetricButton, RegisterButton } from "../../components/RegisterAssetComponents/RegisterAssetInputs";
import { BasePasswordInput, HercTextInput, HercTextInputWithLabel } from "../../components/SharedComponents";

import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

export default class RegAsset1 extends Component {

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("componentTest")
        this.state = {
            showCamSourceModal: false,
            showModal2: false,
            showModal3: false,
            asset: {
                HercId: 123,
                Name: "",
                Logo: "",
                CoreProps: {
                    Metric1: "",
                    Metric2: "",
                    Metric3: "",
                    Metric4: "",
                    // Metric5: "",
                    // Metric6: "",

                }
            }
        }
        this.localOnChange = this.localOnChange.bind(this);
        this.pwChange = this.pwChange.bind(this);
        this.showCamSourceModal = this.showCamSourceModal.bind(this);
    }


    renderInputs = () => {
        let coreProps = this.state.asset.CoreProps;
        let metrics = Object.keys(coreProps);
        let metricInputs = [];
        metrics.map((x) => {
            // let name = x

            metricInputs.push(
                <HercTextInput
                    key={x}
                    name={x}
                    placeholder={x}
                    localOnChange={this.localOnChange}
                />
            )
        })
        console.log(metricInputs);
        return metricInputs;
    }

    onPressTest = () => {

        console.log("I got Pressed!")
        this.props.navigation.navigate('RegAsset2');
    }

    showCamSourceModal = () => {
        // console.log(this.state.showCamSourceModal, "showCamSourceModal");
        this.setState({
            showCamSourceModal: !this.state.showCamSourceModal
        })
        // console.log(this.state.showCamSourceModal, "showmodal1after");
    }

    changeModal2 = () => {
        console.log(this.state.showModal2, "showmodal2");
        this.setState({
            showModal2: !this.state.showModal2
        })
        console.log(this.state.showModal2, "showmodal2after");
    }


    pwChange = (pwChar) => {
        console.log(pwChar, 'incompoTest Passing functions')
        this.setState({
            Password: pwChar
        });
    }

    localOnChange = (inputValue, name) => {
        console.log('inputValue', inputValue, "changing metric text", name);
        this.setState({
            [name]: inputValue
        })
    }

    render() {


        let metricInputs = this.renderInputs();

        return (

            <View style={styles.baseContainer}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'

                />
                <View style={styles.bodyContainer}>

                    <BasePasswordInput
                        label='Asset Password'
                        placeholder='Asset Password'
                        pwChange={this.pwChange}
                    />

                    <HercTextInputWithLabel
                        name='Asset Name'
                        label='Asset Name'
                        placeholder='Asset Name'
                        localOnChange={this.localOnChange}
                    />

                    {metricInputs}

                    <AddMetricButton onPress={this.show} />

                    <AddPhotoButton onPress={this.changeModal2} />

                    <View style={[styles.pageBottom, { justifyContent: 'flex-end' }]}>

                        <AssetCard asset={this.state.asset} />

                        <RegisterButton onPress={this.onPressTest} />
                    </View>

                    {/* Modal 1 */}


                </View>
                <CameraSourceModal
                    backdropColor={'rgba(0,0,0,0.5)'}
                    isVisible={this.state.showCamSourceModal}
                    onRequestClose={() => { console.log("modal closed") }}
                />
            </View>
        )
    }
}

const localStyles = StyleSheet.create({

    imageSourceContainer: {
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        padding: 10,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        height: '50%',
        borderWidth: 0,


    },

    sourceIconContainer: {
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: ColorConstants.MainGray
    },

    iconButton: {
        alignSelf: 'center',
        marginLeft: 10,
        backgroundColor: ColorConstants.MainGray
        // height: widthPercentageToDP('5'),
        // width: heightPercentageToDP('5'),

    },

    camSourceIcon: {
        backgroundColor: ColorConstants.MainGray,
        justifyContent: 'center',
        alignSelf: 'center',
        // height: widthPercentageToDP('10'),
        // width: heightPercentageToDP('10'),

    },



    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    modalButton: {
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 2,
        borderWidth: 2,
    },
    wordsText: {
        textAlign: 'center',
    },
    closeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
    },
    closeButton: {
        padding: 15
    },

    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        // backgroundColor: ColorConstants.MainBlue,
        backgroundColor: ColorConstants.MainGray,
        alignItems: "center",
        justifyContent: "flex-start",
        // marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    labelTitle: {
        fontSize: 18,
        color: ColorConstants.MainBlue,
        margin: 5
    },
    menuTitle: {
        color: ColorConstants.MainBlue,
        fontSize: 26,
        margin: 5,

    },
    passwordInputContainer: {

        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.ElementBG
    }

})