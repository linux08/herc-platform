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
import Icon from "react-native-vector-icons/Entypo";
const hercpngIcon = require('../assets/icons/hercIcon.png');

// import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responisiveUI';


export function TransInfoCard(props) {
    return (
        <View style={localStyles.transInfoCard}>
            <Text style={localStyles.textBold}>{props.transSide}</Text>
            <View style={localStyles.flexEndRow}>
                <Text style={[localStyles.textNormal, { fontSize: 12, marginRight: 10 }]}>HERC ID</Text>
                <Text style={[localStyles.textBold]}>{props.hercId}</Text>
            </View>
        </View>
    )
}

export function CameraTransactionComponent(props) {
    let bgColor = props.image ? ColorConstants.ElementBG : ColorConstants.MainGray;
    let squareType = props.image ? "imageSquare" : "iconSquare";
    console.log(props, "transaction component")
    return (

        <View style={localStyles.transactionComponentContainer}>
            {props.image ?
                <TouchableHighlight onPress={props.onPress} style={localStyles.imageSquare}>
                    <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                        source={{ uri: props.image }} />
                </TouchableHighlight>
                :

                <View style={[localStyles.iconSquare, { backgroundColor: ColorConstants.MainGray }]}>
                    <Icon
                        style={localStyles.componentIcon}
                        name={props.iconName}
                        onPress={props.onPress}
                    >
                    </Icon>
                </View>
            }
            {props.image ?
                <View style={localStyles.imageInfo}>
                    <View>
                        <Text style={[localStyles.textNormal, { fontSize: 12, margin: 5 }]}>{props.img.name}</Text>
                        <Text style={[localStyles.textNormal, { fontSize: 12, margin: 5 }]}>{(props.img.size / 1024).toFixed(3)} kb</Text>
                    </View>

                    <View style={localStyles.price}>
                        <Text style={localStyles.textBold}>{(((props.img.size / 1024) * .00000002) / .4).toFixed(8)}</Text>
                        <Image source={hercpngIcon} style={localStyles.hercPriceIcon} />
                    </View>
                </View>

                :
                <Text style={localStyles.textNormal}>{props.componentName}</Text>
            }

        </View>


    )
}

export function TransactionComponent(props) {
    let bgColor = props.image ? ColorConstants.ElementBG : ColorConstants.MainGray;
    console.log(props, "transaction component")
    return (

        <View style={localStyles.transactionComponentContainer}>
            <View style={[localStyles.iconSquare, { backgroundColor: bgColor }]}>
                {props.image ?
                    <Image
                        style={localStyles.imageSquare}
                        source={{ uri: props.image }} />
                    :

                    <Icon
                        style={localStyles.componentIcon}
                        name={props.iconName}
                        onPress={props.onPress}
                    >
                    </Icon>
                }
            </View>
            <Text style={localStyles.textNormal}>{props.image ? "Change Photo" : props.componentName}</Text>
        </View>


    )
}

const localStyles = StyleSheet.create({

    hercPriceIcon: {
        height: 20,
        width: 20,
        borderRadius: 20,
        resizeMode: 'contain',
        marginLeft: 5
    },

    price: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    imageInfo: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'blue',
        justifyContent: 'flex-start',
        marginLeft: 0
    },
    transInfoCard: {
        height: heightPercentageToDP('4'),
        width: widthPercentageToDP('90'),
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 6,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
    },

    textBold: {
        fontSize: 14,
        color: ColorConstants.MainBlue,
        marginLeft: 3,
        fontWeight: 'bold',
    },

    textNormal: {
        fontSize: 14,
        color: ColorConstants.MainBlue,
        marginLeft: 3,
        fontWeight: 'normal',
    },
    transactionComponentText: {
        fontSize: 14,
        color: ColorConstants.MainSubGray,
        marginLeft: 3,
        fontWeight: 'normal',
    },

    transactionComponentContainer: {
        // 20% = 159.42857142857142 on Galaxy S9
        height: heightPercentageToDP('11.5'),
        width: '100%',
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 6,
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // padding: 20,
    },
    componentIcon: {
        fontSize: 25,
        color: ColorConstants.MainBlue
    },
    imageSquare: {
        height: heightPercentageToDP('9'),
        width: heightPercentageToDP('9'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        // resizeMode: 'contain',
        borderRadius: 6

    },

    iconSquare: {
        // 79.71428571428571 is 10% on Galaxy S9
        height: heightPercentageToDP('8'),
        width: heightPercentageToDP('9'),
        backgroundColor: ColorConstants.MainGray,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginRight: 20,
        borderRadius: 6
    },
    flexEndRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    // costDisplay: {
    //     height: 40,
    //     width: widthPercentageToDP('90'),
    //     backgroundColor: ColorConstants.MainBlue,
    //     borderRadius: 8,
    //     margin: 5,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 5,
    //     marginTop: 10,
    //     alignSelf: 'center'
    //     // marginTop: heightPercentageToDP('20')
    // },
    // eyeballContainer: {
    //     justifyContent: 'center',
    //     backgroundColor: ColorConstants.ElementBG,
    //     // height: heightPercentageToDP('6'),
    // },

    // eyeBallButton: {
    //     backgroundColor: ColorConstants.ElementBG,
    //     borderRadius: 8,
    // },

    // registerButton: {
    //     height: 40,
    //     width: widthPercentageToDP('90'),
    //     backgroundColor: ColorConstants.MainGold,
    //     borderRadius: 8,
    //     margin: 5,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 5,
    //     marginTop: 10,
    //     alignSelf: 'center'
    //     // marginTop: heightPercentageToDP('20')
    // },


    // addPhotoButton: {
    //     height: heightPercentageToDP('8'),
    //     width: widthPercentageToDP('80'),
    //     backgroundColor: ColorConstants.ElementBG,
    //     borderRadius: 8,
    //     margin: 5,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     paddingRight: '10%',
    //     paddingLeft: '10%'
    // },

    // cameraIconContainer: {
    //     backgroundColor: ColorConstants.ElementBG,
    //     borderRadius: 8,
    //     // marginLeft: '15%'

    // },

    // RegisterAssetInputPasswordContainer: {
    //     justifyContent: 'space-between',
    //     flexDirection: 'row',
    //     backgroundColor: ColorConstants.MainGray,
    //     width: widthPercentageToDP('90'),
    //     height: heightPercentageToDP('4'),
    //     borderRadius: 8,
    //     margin: 5

    // },
    // // textInput: {
    // //     borderRadius: 8,
    // //     // backgroundColor: ColorConstants.MainGray,
    // //     backgroundColor: ColorConstants.ElementBG,
    // //     marginTop: 0,
    // //     marginBottom: 0,
    // //     paddingLeft: 5,
    // //     textAlign: 'left',
    // //     marginLeft: 0,
    // //     marginRight: 0,
    // //     fontSize: 17,
    // //     height: 40,
    // //     width: '100%'
    // //     // alignSelf: 'center'
    // // },
    // textInputContainer: {
    //     flex: 0,
    //     width: widthPercentageToDP('90'),
    //     height: heightPercentageToDP('6'),
    //     justifyContent: 'center',
    //     alignItems: 'flex-start',
    //     backgroundColor: ColorConstants.ElementBG,
    //     margin: 5,
    //     paddingLeft: 5,
    //     borderRadius: 8
    // },
    // textField: {
    //     color: ColorConstants.MainBlue,
    //     width: '100%',
    //     marginLeft: 0,
    //     marginRight: 0,
    //     // fontSize: 14,
    //     paddingLeft: 5,
    //     textAlign: 'left',
    //     fontSize: 17,
    //     borderRadius: 8,
    //     height: heightPercentageToDP('4.95'),
    //     paddingBottom: 0
    // },
    // textFieldText: {
    //     color: ColorConstants.MainBlue,
    //     marginRight: 5,
    //     paddingLeft: 5,
    //     textAlign: 'left',
    //     fontSize: 17,
    // },
    // textFieldContainer: {
    //     flex: 0,
    //     width: widthPercentageToDP('90'),
    //     height: heightPercentageToDP('6'),
    //     justifyContent: 'center',
    //     alignItems: 'flex-start',
    //     backgroundColor: ColorConstants.ElementBG,
    //     margin: 5,
    //     paddingLeft: 5,
    //     borderRadius: 8,
    //     paddingBottom: 10
    //     // backgroundColor: ColorConstants.MainSubCrownBlue
    // },


    // labeledTextInput: {
    //     color: ColorConstants.MainBlue,
    //     width: '100%',
    //     borderRadius: 8,
    //     backgroundColor: ColorConstants.ElementBG,
    //     margin: 0,
    //     fontSize: 17,
    //     height: heightPercentageToDP('5.5')
    // },
    // passwordTextInput: {
    //     width: widthPercentageToDP('90'),
    //     height: heightPercentageToDP('5.5'),
    //     borderRadius: 0,
    //     backgroundColor: ColorConstants.ElementBG,
    //     margin: 0,
    //     flex: 1,
    //     fontSize: 17,
    //     alignSelf: 'center'
    // },


    // textLabel: {
    //     fontSize: 12,
    //     color: ColorConstants.MainSubGray,
    //     marginLeft: 3,
    //     fontWeight: 'normal',
    //     marginTop: 10
    // },
    // buttonLabel: {
    //     fontSize: 12,
    //     color: ColorConstants.MainBlue,
    //     margin: 5,
    //     // marginLeft: '15%',
    //     alignSelf: 'center'

    // },

    // flexRow: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     alignItems: 'center'

    // },

    // // width: (width * .9),
    // // height: (height * .056),


})
