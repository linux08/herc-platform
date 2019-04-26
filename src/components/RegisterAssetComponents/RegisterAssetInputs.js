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

const hercpngIcon = require('../../assets/icons/hercIcon.png');
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';


export function RegisterButton(props) {
    return (

        <TouchableHighlight onPress={props.onPress} style={localStyles.registerButton}>
            <Text style={localStyles.buttonLabel}>Register</Text>
        </TouchableHighlight>
    )
}


export function AddPhotoButton(props) {
    return (

        <View style={localStyles.addPhotoButton}>

            <Icon
                style={localStyles.cameraIconContainer}
                color={ColorConstants.MainBlue}
                name='camera'
                onPress={props.onPress}
                size={20}
            >
            </Icon>
            <Text style={localStyles.buttonLabel}>Add a Photo</Text>
        </View>


    )
}

export function AddMetricButton(props) {
    return (

        <View style={localStyles.addMetricButton}>

            <Text style={[localStyles.buttonLabel, { marginLeft: 0 }]}>Add a Metric</Text>
            <View style={localStyles.cameraIconContainer}>
                <Icon
                    color={ColorConstants.MainBlue}
                    name='plus-circle'
                    onPress={props.onPress}
                    size={20}
                >
                </Icon>

            </View>
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
        alignSelf: 'center'
        // marginTop: heightPercentageToDP('20')
    },
    addMetricButton: {
        height: heightPercentageToDP(((40 / height) * 100).toString()),
        width: widthPercentageToDP('90'),
        backgroundColor: ColorConstants.ElementBG,
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

    addPhotoButton: {
        height: heightPercentageToDP(((40 / height) * 100).toString()),
        width: widthPercentageToDP('80'),
        backgroundColor: ColorConstants.ElementBG,
        borderRadius: 8,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '10%',
        paddingLeft: '10%'
    },

  })
