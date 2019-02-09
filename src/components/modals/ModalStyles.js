import { StyleSheet, Platform } from "react-native";
import ColorConstants from "../../constants/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

module.exports = StyleSheet.create({
    cameraModal: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: widthPercentageToDP('95'),
        height: heightPercentageToDP('95'),
        backgroundColor: 'black',
    },

    baseModal: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },

    modalLower: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1
    },

    lowerModalContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        // backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20
    },

    imageSourceContainer: {
        flexDirection: 'column',
        backgroundColor: ColorConstants.MainGray,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '30%',
        borderWidth: 0,
        borderRadius: 8


    },
    sourceIconContainer: {
        height: '70%',
        width: '30%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: ColorConstants.MainGray
    },
    camSourceIcon: {
        backgroundColor: ColorConstants.MainGray,
        // justifyContent: 'space-between',
        // alignSelf: 'flex-start',
        // flexDirection: 'column',
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


})