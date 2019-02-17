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
import Icon from "react-native-vector-icons/FontAwesome";
const hercpngIcon = require('../../assets/icons/hercIcon.png');
import { HercTextFieldWithLabel } from "../SharedComponents";
// import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

export function AddAssetButton(props) {
    return (

        <View style={localStyles.addAssetButton}>

            <Text style={{color: 'white'}}>Create New</Text>
            <View style={localStyles.cameraIconContainer}>
                <Icon
                    color={'white'}
                    name='plus-circle'
                    onPress={props.onPress}

                >
                </Icon>

            </View>
        </View>

    )
}


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
                        name='camera'
                        onPress={props.onPress}
                    >
                    </Icon>
                </View>
            }
            {props.image ?
                <View style={localStyles.transComponentInfo}>
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
                <Text style={localStyles.textNormal}>"Add Photo"</Text>
            }

        </View>


    )
}

export function EdiTransactionComponent(props) {
    let bgColor = props.edi.name ? ColorConstants.ElementBG : ColorConstants.MainGray;
    let iconColor = props.edi.name ? ColorConstants.MainGold : 'black';
    console.log(props, "edi transaction component")
    return (

        <View style={localStyles.transactionComponentContainer}>
            <View style={[localStyles.iconSquare, { backgroundColor: bgColor }]}>
                <Icon
                    style={[localStyles.componentIcon, { color: iconColor }]}
                    name='pencil'
                    onPress={props.onPress}
                >
                </Icon>
            </View>
            {props.edi.name ?
                <View style={localStyles.transComponentInfo}>
                    <HercTextFieldWithLabel label={props.edi.value} text={props.edi.name} />
                </View>
                :
                <Text style={localStyles.textNormal}>Choose EDI-T Sets</Text>
            }
        </View>


    )
}

export function DocTransactionComponent(props) {
    let bgColor = props.doc.name ? ColorConstants.ElementBG : ColorConstants.MainGray;
    let iconColor = props.doc.name ? ColorConstants.MainGold : 'black';
    console.log(props, "doctransaction component");
    return (

        <View style={localStyles.transactionComponentContainer}>
            <View style={[localStyles.iconSquare, { backgroundColor: bgColor }]}>
                <Icon
                    style={[localStyles.componentIcon, { color: iconColor }]}
                    name='text-document'
                    onPress={props.onPress}
                >
                </Icon>
            </View>
            {props.doc.name ?
                <View style={localStyles.transComponentInfo}>
                    <View>
                        <Text style={[localStyles.textNormal, { fontSize: 12, margin: 5 }]}>{props.doc.name}</Text>
                        <Text style={[localStyles.textNormal, { fontSize: 12, margin: 5 }]}>{(props.doc.size / 1024).toFixed(3)} kb</Text>
                    </View>

                    <View style={localStyles.price}>
                        <Text style={localStyles.textBold}>{(((props.doc.size / 1024) * .00000002) / .4).toFixed(8)}</Text>
                        <Image source={hercpngIcon} style={localStyles.hercPriceIcon} />
                    </View>
                </View>
                :
                <Text style={localStyles.textNormal}>"Add Documents"</Text>
            }

        </View>


    )
}
/// rendering the metrics UX
export function MetricTransactionComponent(props) {
    let bgColor = props.metrics ? ColorConstants.ElementBG : ColorConstants.MainGray;
    let iconColor = props.metric ? ColorConstants.MainGold : 'black';
    console.log(props, "metric transaction component")
    return (

        <View style={localStyles.transactionComponentContainer}>
            <View style={[localStyles.iconSquare, { backgroundColor: bgColor }]}>
                <Icon
                    style={[localStyles.componentIcon, { color: iconColor }]}
                    name='clipboard'
                    onPress={props.onPress}
                >
                </Icon>
            </View>
            {props.metrics ?
                <View style={localStyles.transComponentInfo}>

                    <Text style={localStyles.textNormal}>Update Metrics</Text>
                </View>
                :
                <Text style={localStyles.textNormal}>Add Metrics</Text>
            }
        </View>


    )
}

const localStyles = StyleSheet.create({


    buttonLabel: {
        fontSize: 12,
        color: ColorConstants.MainSubGray,
        margin: 5,
        // marginLeft: '15%',
        alignSelf: 'center'

    },

    addAssetButton: {
        height: heightPercentageToDP(((40 / height) * 100).toString()),
        width: widthPercentageToDP('75'),
        backgroundColor: ColorConstants.MainGold,
        borderRadius: 8,
        margin: 5,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '10%',
        paddingLeft: '10%'
    },

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
    transComponentInfo: {
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
    

})
