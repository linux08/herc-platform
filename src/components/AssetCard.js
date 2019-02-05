import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import ColorConstants from "../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responsiveUI';

export function AssetCard(asset) {
    console.log(asset);
    return (
        <View style={localStyles.assetCard}>
            <View style={localStyles.assetImageContainer}>
                <Image source={asset.asset.Logo} style={localStyles.assetImage} />
            </View>

            <View style={localStyles.cardMain}>
                <View style={localStyles.cardContentLeft}>

                    <Text style={localStyles.assetLabel}>Asset Name</Text>
                    <Text style={localStyles.assetName}>{asset.asset.Name}</Text>
                </View>
                <View style={localStyles.cardContentRight}>
                    <Text style={localStyles.assetLabel}>Herc ID</Text>
                    <Text style={localStyles.assetName}>{asset.asset.HercId}</Text>
                </View>
            </View>
        </View>

    )
}

const localStyles = StyleSheet.create({

    assetCard: {
        flex: 0,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('10'),
        borderRadius: 6,
        backgroundColor: ColorConstants.MainGray,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    assetImageContainer: {
        height: '90%',
        width: '25%',
        backgroundColor: ColorConstants.MainBlue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    assetImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'

    },
    cardMain: {
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        width: "70%",
        height: "80%",
        padding: 5

    },
    cardContentLeft: {
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContentRight: {
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
   
    assetName: {
        fontSize: 14,
        color: ColorConstants.MainBlue,
        margin: 2,
        textAlign: 'left'
    },
    assetLabel: {
        color: ColorConstants.MainSubGray,
        fontSize: 12,
        margin: 2,
        marginRight: 3,
        textAlign: 'left'

    },
   


})



