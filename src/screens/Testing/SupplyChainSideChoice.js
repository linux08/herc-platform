import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import modalStyles from "../../assets/modals/ModalStyles";
const { height, width } = Dimensions.get('window');
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
import { 
    HercTextInputWithLabel,
    BasePasswordInput,
    HercTextFieldWithLabel,
    HercTextInput,
    HercTextField
} from "../../components/SharedComponents";
const OrigImage = require('../../assets/SupplyChainAssets/originator.png')
const RecipImage = require('../../assets/SupplyChainAssets/recipient.png')
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responisiveUI';

export default class SupplyChainSideChoice extends Component {

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("componentTest")
        this.state = {
            checkOrig: false,
            checkRecip: false
        }

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
        let { height, width } = Dimensions.get('window');

        console.log(widthPercentageToDP("2"), "2%", heightPercentageToDP(2), '2%');
        console.log(Dimensions.get('window'), "dimensions window", Dimensions.get('screen'), "dimensions screen");
        console.log(height, width);
        return (

            <View style={[styles.baseContainer,{marginTop: 50}]}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'

                />
                
                <HercTextField text={'TextField'} />
                <HercTextFieldWithLabel label={"test label"} text={"testtext"} />
                <HercTextInput placeholder={'TestPlaceHolder'} />
                <HercTextInputWithLabel placeholder={"placeholder with Label"} label={"label for Input"} />
                <BasePasswordInput pwChange={this.onPressTest} label={'TestPWLabel'} placeholder={'testlabeledPlaceholderPW'} />
                {/* <View style={styles.bodyContainer}>
                    <Text style={localStyles.labelTitle}>Where are you along the Supply Chain?</Text>
                    <View style={localStyles.choiceContainer}>
                        <View style={localStyles.checkBoxContainer}>
                            <Icon name={'check'} color={'white'} />
                        </View>

                        <TouchableHighlight onPress={this.onPressTest} style={localStyles.choiceImageContainer}>
                            <Image source={OrigImage} style={localStyles.choiceImage} />
                        </TouchableHighlight>
                    </View>
                   <View>
                    <View style={localStyles.checkBoxContainer}>
                        <Icon name={'check'} color={'white'} />
                    </View>
                    <TouchableHighlight onPress={this.onPressTest} style={localStyles.choiceImageContainer}>
                        <Image source={RecipImage} style={localStyles.choiceImage} />
                    </TouchableHighlight>
                </View> */}



            {/* </View> */}
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: heightPercentageToDP('30')

    },

    choiceImageContainer: {

        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: widthPercentageToDP(((100 / width) * 100).toString()),
        height: heightPercentageToDP(((100 / height) * 100).toString()),
        borderRadius: 50,
        backgroundColor: ColorConstants.MainGold,
        justifyContent: 'center',
        margin: 15
    },

    checkBoxContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: 'black'

        // height: widthPercentageToDP('5'),
        // width: heightPercentageToDP('5'),

    },
    // checkOrig: {
    //     display: this.state.checkOrig
    // },
    // checkRecip: {
    //     display: this.state.checkRecip
    // },

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