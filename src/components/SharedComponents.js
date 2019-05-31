import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableHighlight,
    Image,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');
const hercpngIcon = require('../assets/icons/hercIcon.png');
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../constants/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responsiveUI';

// props =  buttonName, onPress
export function BigYellowButton(props) {
    return (

        <TouchableHighlight onPress={props.onPress} style={localStyles.registerButton}>
            <Text style={[localStyles.buttonLabelText, { color: 'white' }]}>{props.buttonName}</Text>
        </TouchableHighlight>
    )
}

export function ModalSubmitButton(props) {
    return (
        <TouchableHighlight onPress={props.onPress} style={localStyles.modal__Submitbutton}>
            <Text style={{ color: 'white', fontSize: heightPercentageToDP(1.8) }}>Submit</Text>
        </TouchableHighlight>
    )
}

export function CostDisplay(props) {

    return (
        <View style={[localStyles.textFieldContainer, { backgroundColor: ColorConstants.MainBlue }]}>
            <Text style={localStyles.labelText}>Amount</Text>

            <View style={localStyles.flexRow}>
                <Text style={[localStyles.costFieldAmount, { color: 'white' }]}>{props.amount}</Text>
                <Image source={hercpngIcon} style={{ height: 20, width: 20, borderRadius: 20, resizeMode: 'contain' }} />
            </View>
        </View>

    )

}

export class HercTextField extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={localStyles.textFieldContainer}>
                <Text style={localStyles.textField}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

export class HercTextFieldWithLabel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <View key={this.props.label} style={localStyles.textFieldContainer}>
                <Text style={localStyles.labelText}>{this.props.label}</Text>
                <Text style={localStyles.textField}>{this.props.text}</Text>
            </View>
        )
    }

}

// Trying to have the inputs accept a function for "onChangeText" to change the local state from where it is called


export class HercTextInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let name = this.props.name;
        return (
            <View style={localStyles.textFieldContainer}>
                <TextInput style={localStyles.textField}
                    placeholder={this.props.placeholder}
                    placeholder-text-color={ColorConstants.MainSubGray}
                    underlineColorAndroid='transparent'
                    onChangeText={(inputVal) => this.props.localOnChange(inputVal, name)}
                    multiline={false}
                    scrollEnabled={false}
                />
            </View>
        )
    }
}

export class HercTextInputWithLabel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props, "textInputWithLabel, lookingfor localOnChange")
        let name = this.props.name;
        return (
            <View style={localStyles.textFieldContainer}>
                <View>
                    <Text style={localStyles.labelText}>{this.props.label}:</Text>
                </View>
                <View style={{width: "100%"}}>
                    <TextInput
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChangeText={(change) => this.props.localOnChange(change, name)}
                        style={localStyles.labeledTextInput}
                        underlineColorAndroid='transparent'
                        multiline={false}
                        scrollEnabled={false}
                    // value={this.props.v}
                    />
                </View>
            </View>
        )
    }

}


export class BasePasswordInput extends Component {
    constructor(props) {
        super(props);
        console.log(props, "registerAssetPassword")
        this.state = {
            hidePass: true
        }
    }
    onHideShow = () => {
        console.log("hidingshow")
        this.setState({
            hidePass: !this.state.hidePass
        })
    }

    render() {
        return (
            <View style={[localStyles.textFieldContainer, { paddingTop: 10, paddingBottom: 2 }]}>
                <Text style={localStyles.labelText}>{this.props.label}</Text>
                <View style={localStyles.PasswordInputContainer}>
                    {/* localStyles.passwordTextInput */}
                    <TextInput style={localStyles.passwordTextInput}
                        placeholder={this.props.placeholder}
                        placeholder-text-color={ColorConstants.MainBlue}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.hidePass}
                        onChangeText={pass => this.props.pwChange(pass)}
                    />
                    <View style={localStyles.eyeballContainer}>
                        <Icon.Button
                            style={localStyles.eyeBallButton}
                            color={ColorConstants.MainBlue}
                            name='eye'

                            onPress={() => this.onHideShow()}

                        >
                        </Icon.Button>
                    </View>
                </View>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    textField: {
        color: ColorConstants.MainBlue,
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
        // fontSize: 14,
        textAlign: 'left',
        fontSize: heightPercentageToDP(2),
        borderRadius: 8,
        // height: heightPercentageToDP('4.95'),
        paddingBottom: 0
    },
    costFieldAmount: {
        color: ColorConstants.MainBlue,
        marginRight: 5,
        paddingLeft: 5,
        textAlign: 'left',
        fontSize: heightPercentageToDP(2),
    },
    textFieldContainer: {
        flexDirection: 'column',
        width: "100%",
        // height: heightPercentageToDP(((50 / height) * 100).toString()),
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: ColorConstants.ElementBG,
        margin: 5,
        borderRadius: 6,
        alignSelf: "center",
        // height: heightPercentageToDP(((50 / height) * 100).toString()),
    },
    labeledTextInput: {
        color: ColorConstants.MainBlue,
        width: '100%',
        borderRadius: 8,
        backgroundColor: ColorConstants.ElementBG,
        margin: 0,
        fontSize: heightPercentageToDP(3),
    },
    labelText: {
        fontSize: heightPercentageToDP(1.5),
        color: "black",
        marginLeft: 3,
        fontWeight: 'normal',
    },

    PasswordInputContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        borderRadius: 6,
        margin: 0,
        // paddingRight: 10

    },
    passwordTextInput: {
        borderRadius: 0,
        backgroundColor: ColorConstants.ElementBG,
        margin: 0,
        flex: 1,
        fontSize: heightPercentageToDP(1.8),
        alignSelf: 'center'
    },

    costDisplay: {
        height: heightPercentageToDP(((40 / height) * 100).toString()),
        width: widthPercentageToDP('90'),
        backgroundColor: ColorConstants.MainBlue,
        borderRadius: 8,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: 10,
        alignSelf: 'center'
        // marginTop: heightPercentageToDP('20')
    },
    eyeballContainer: {
        justifyContent: 'center',
        backgroundColor: ColorConstants.ElementBG,
        paddingBottom: 10
        // height: heightPercentageToDP('6'),
    },

    eyeBallButton: {
        backgroundColor: ColorConstants.ElementBG,
        marginRight: -1,
        // marginLeft: 10
        borderRadius: 0
    },


    textInputContainer: {
        // flex: 0,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('6'),
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: ColorConstants.ElementBG,
        margin: 5,
        paddingLeft: 5,
        borderRadius: 8
    },


    buttonLabelText: {
        fontSize: heightPercentageToDP(1.5),
        color: ColorConstants.MainSubGray,
        margin: 5,
        // marginLeft: '15%',
        alignSelf: 'center',


    },

    flexRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    registerButton: {
        height: heightPercentageToDP(((40 / height) * 100).toString()),
        width: widthPercentageToDP('90'),
        backgroundColor: ColorConstants.MainGold,
        borderRadius: 8,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'center'
        // marginTop: heightPercentageToDP('20')
    },
    modal__Submitbutton: {
        height: "5%",
        width: widthPercentageToDP('70'),
        backgroundColor: ColorConstants.MainGold,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignItems: "center"
        // marginTop: heightPercentageToDP('20')
    },
    // width: (width * .9),
    // height: (height * .056),


})
