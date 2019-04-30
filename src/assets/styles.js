"use strict";
import { StyleSheet, Platform } from "react-native";
import ColorConstants from "./ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from './responsiveUI';

module.exports = StyleSheet.create({

  pageBottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    alignContent: 'center'
},
  baseContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: ColorConstants.MainBlue,
    alignItems: "center",
    justifyContent: "flex-start",
    display: 'flex'
  },
  bigScreenMessage:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: ColorConstants.MainGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  splashTop: {
    width: widthPercentageToDP('98'),
    height: heightPercentageToDP('48'),
    padding: 5,
    justifyContent: 'center'
  },
  splashImage: {
    width: widthPercentageToDP('60'),
    height: heightPercentageToDP('60'),
  },
  CopyHeader: {
    fontSize: 14,
    textAlign: 'center',
    margin: 5
  },
  copyBody: {
    fontSize: 12
  }
});
