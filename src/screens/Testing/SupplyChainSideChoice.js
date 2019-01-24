import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import modalStyles from "../../assets/modals/ModalStyles";

import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';

const OrigImage = require('../../assets/SupplyChainAssets/originator.png')
const RecipImage = require('../../assets/SupplyChainAssets/recipient.png')
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responisiveUI';

export default class SupplyChainSideChoice extends Component {

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("componentTest")

        // this.localOnChange = this.localOnChange.bind(this);
        // this.pwChange = this.pwChange.bind(this);
    }



    onPressTest = () => {

        console.log("I got Pressed!")
        this.props.navigation.navigate('RegAsset2');
    }

    // changeModal1 = () => {
    //     console.log(this.state.showModal1, "showmodal1");
    //     this.setState({
    //         showModal1: !this.state.showModal1
    //     })
    //     console.log(this.state.showModal1, "showmodal1after");
    // }

    // changeModal2 = () => {
    //     console.log(this.state.showModal2, "showmodal2");
    //     this.setState({
    //         showModal2: !this.state.showModal2
    //     })
    //     console.log(this.state.showModal2, "showmodal2after");
    // }


    // pwChange = (pwChar) => {
    //     console.log(pwChar, 'incompoTest Passing functions')
    //     this.setState({
    //         Password: pwChar
    //     });
    // }

    // localOnChange = (inputValue, name) => {
    //     console.log('inputValue', inputValue, "changing metric text", name);
    //     this.setState({
    //         [name]: inputValue
    //     })
    // }

    render() {

        return (

            <View style={styles.baseContainer}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'

                />
                <View style={styles.bodyContainer}>
                    <Text style={localStyles.labelTitle}>Where are you along the Supply Chain?</Text>
                    <View style={localStyles.choiceContainer}>
                        <View style={localStyles.choiceImageContainer}>
                            <Image source={OrigImage} style={localStyles.choiceImage}  />
                        </View>

                        <View style={localStyles.choiceImageContainer}>
                            <Image source={RecipImage} style={localStyles.choiceImage} />
                        </View>

                    </View>





                </View>
            </View >
        )
    }
}

const localStyles = StyleSheet.create({

    choiceContainer: {
        flexDirection: 'row',
        // backgroundColor: ColorConstants.MainGray,
        backgroundColor: 'blue',
        padding: 10,
        // paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: heightPercentageToDP('30')

    },

    choiceImageContainer: {

        flex: 0,
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: ColorConstants.MainGold,
        alignItems: 'center',
        justifyContent: 'center'
    },

    checkBoxContainer: {
        alignSelf: 'center',
        marginLeft: 10,
        backgroundColor: ColorConstants.MainGray
        // height: widthPercentageToDP('5'),
        // width: heightPercentageToDP('5'),

    },

    choiceImage: {
        resizeMode: 'contain',
        height: 50,
        width: 50,
        alignSelf: 'center'
    },
    labelTitle: {
        fontSize: 18,
        color: ColorConstants.MainBlue,
        margin: 5,
        fontWeight: 'bold'
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