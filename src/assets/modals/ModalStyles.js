import { StyleSheet, Platform } from "react-native";
import ColorConstants from "../ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../responisiveUI';

module.exports = StyleSheet.create({

    modalLower: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1
    },

    lowerModalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // alignContent: 'flex-end',
        backgroundColor: ColorConstants.MainGray,
        // backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20
    },
    
    imageSourceContainer: {
        flexDirection: 'column',
        backgroundColor: ColorConstants.MainGray,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '30%',
        borderWidth: 0,
        borderRadius:  8


    },
    sourceIconContainer: {
        height: '30%',
        width: '30%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: ColorConstants.MainGray
    },
    modalContent2: {
        backgroundColor: ColorConstants.MainSubRed,
        height: widthPercentageToDP('30'),
        width: heightPercentageToDP('25'),
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

    camSourceIcon: {
        backgroundColor: ColorConstants.MainGray,
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        flexDirection: 'column',

        

    },

})