"use strict";
import { StyleSheet, Platform } from "react-native";
import ColorConstants from "../../assets/ColorConstants";


module.exports = StyleSheet.create({

    headerCont: {
        width: '100%',
        height: '12%',
        // flexDirection: 'row'
    },
    bgImage: {
        flex: 1,
    },

    header__container: {
        // backgroundColor: ColorConstants.MainBlue,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignContent: "center",
        alignItems: "center",
        shadowColor: 'transparent',
        // marginTop: 5,
    },

    sideHeaders: {
        alignSelf: 'center',
        width: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: ColorConstants.MainGray
    },
    iconButton: {
        alignSelf: 'center',
        height: 18,
        width: 18,
    },

    headerText: {
        fontFamily: "Montserrat",
        fontSize: 22,
        alignSelf: "center",
        fontWeight: "bold",
        color: ColorConstants.MainGray,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        alignContent: 'center'

    },

    backArrow: {
        marginLeft: 5
    }

});
