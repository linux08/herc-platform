import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableHighlight
} from 'react-native';
import styles from "../../assets/styles";
import React, { Component } from 'react';
import TesterAssets from "../../components/TesterAssets";
import { AddAssetButton } from "../../components/SupplyChainComponents/SupplyChainComponents.js";
import { AssetCard } from "../../components/AssetCard";
// AssetCard props = Name, Logo, HercId
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

export default class SupplyChainSplash extends Component {

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("componentTest")

        this.showCamModal = this.showCamModal.bind(this);
        this.pwChange = this.pwChange.bind(this);

        this.state = {
            showCamModal: false,
            showModal2: false
        }
    }



    onPressTest = (assetName) => {

        console.log(assetName, "I got Pressed!")
        this.props.navigation.navigate('SupplyChainSideChoice', { headerName: assetName });
    }

    renderAssets = () => {

        let assetList = []
        TesterAssets.map((x, i) => {
            console.log(x, i)
            assetList.push(
                <TouchableHighlight key={i} onPress={() => this.onPressTest(x.Name)}>
                    <AssetCard asset={x} />
                </TouchableHighlight>
            )
        })

        console.log(assetList.length, "in renderAssets func");
        return assetList;
    }

    showCamModal = () => {
        console.log(this.state.showCamModal, "showCamModal");
        this.setState({
            showCamModal: !this.state.showCamModal
        })
        console.log(this.state.showCamModal, "showCamModal---after");
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

        console.log(TesterAssets, "testerAssets")
        let assetList = this.renderAssets();
        return (

            <View style={styles.baseContainer}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'

                />
                <View style={styles.bodyContainer}>


                    <AddAssetButton onPress={this.onPressTest} />

                    {assetList}

                    <Text>Hello</Text>

                    <CameraSourceModal showCamModal={this.state.showCamModal} />

                    {/* Modal 1 */}


                </View>
            </View >
        )
    }
}

// const localStyles = StyleSheet.create({

//     imageSourceContainer: {
//         flexDirection: 'row',
//         backgroundColor: ColorConstants.MainGray,
//         padding: 10,
//         paddingTop: 30,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '50%',
//         height: '50%',
//         borderWidth: 0,


//     },

//     sourceIconContainer: {
//         height: '100%',
//         alignItems: 'center',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         backgroundColor: ColorConstants.MainGray
//     },

//     iconButton: {
//         alignSelf: 'center',
//         marginLeft: 10,
//         backgroundColor: ColorConstants.MainGray
//         // height: widthPercentageToDP('5'),
//         // width: heightPercentageToDP('5'),

//     },

//     camSourceIcon: {
//         backgroundColor: ColorConstants.MainGray,
//         justifyContent: 'center',
//         alignSelf: 'center',
//         // height: widthPercentageToDP('10'),
//         // width: heightPercentageToDP('10'),

//     },



//     activityIndicatorWrapper: {
//         backgroundColor: '#FFFFFF',
//         height: 100,
//         width: 100,
//         borderRadius: 7,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-around'
//     },

//     modalButton: {
//         margin: 10,
//         justifyContent: 'center',
//         alignSelf: 'center',
//         borderRadius: 2,
//         borderWidth: 2,
//     },
//     wordsText: {
//         textAlign: 'center',
//     },
//     closeButtonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         width: '80%',
//     },
//     closeButton: {
//         padding: 15
//     },

//     container: {
//         width: '100%',
//         height: '100%',
//         flexDirection: 'column',
//         // backgroundColor: ColorConstants.MainBlue,
//         backgroundColor: ColorConstants.MainGray,
//         alignItems: "center",
//         justifyContent: "flex-start",
//         // marginTop: 20,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20
//     },
//     labelTitle: {
//         fontSize: 18,
//         color: ColorConstants.MainBlue,
//         margin: 5
//     },
//     menuTitle: {
//         color: ColorConstants.MainBlue,
//         fontSize: 26,
//         margin: 5,

//     },
//     passwordInputContainer: {

//         justifyContent: 'flex-start',
//         backgroundColor: ColorConstants.ElementBG
//     }

// })