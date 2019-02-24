import React, { Component } from "react";
import {
  Platform,
  WebView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from "react-native";
// import hiprLogo from "../assets/hiprLogo.png";
const { height, width } = Dimensions.get('window');
import ColorConstants from '../../../../../constants/ColorConstants';
import { widthPercentageToDP, heightPercentageToDP } from '../../../../../assets/responsiveUI';

import {assetCardStyles} from './trackComponentStyles';


export const SwiperTextFieldWithLabel = props => {

  let text = props.text;
  if (text.length > 32) {
    let beginning = text.substring(0, 7);
    let middle = " ... ";
    let end = text.substring(text.length - 9, text.length - 1);
    text = beginning + middle + end;
    console.log(beginning, 'beginning', middle, 'middle', end, 'end', text);
  }
  return (
    <View key={text} style={localStyles.textFieldContainer}>
      <Text style={localStyles.labelText}>{props.label}</Text>
      <Text style={localStyles.textField}>{text}</Text>
    </View>
  );
};

export const SwiperBigYellowButton = (props) => {
  return (

    <TouchableHighlight onPress={props.onPress} style={localStyles.registerButton}>
      <Text style={[localStyles.buttonLabel, { color: 'white' }]}>{props.buttonName}</Text>
    </TouchableHighlight>
  )
}

export function CardCostDisplay(props) {
  return (
    <View
      style={[
        localStyles.textFieldContainer,
        { backgroundColor: ColorConstants.MainBlue }
      ]}
    >
      <Text style={localStyles.labelText}>Amount</Text>

      <View style={localStyles.flexRow}>
        <Text style={[localStyles.costFieldAmount, { color: "white" }]}>
          {props.amount}
        </Text>
        <Image
          source={hercpngIcon}
          style={{
            height: 20,
            width: 20,
            borderRadius: 20,
            resizeMode: "contain"
          }}
        />
      </View>
    </View>
  );
}


export const SimpleAssetCard = (props) => {
  console.log(props, "this is state, looking for the deets passed in")
  return (
    <View style={assetCardStyles.assetCard}>
      
      <View style={assetCardStyles.assetImageContainer}>

          <Image source={{ uri: props.Logo }} style={assetCardStyles.assetImage} />

      </View>

      <View style={assetCardStyles.cardMain}>
        <View style={assetCardStyles.cardContentLeft}>
          <Text style={assetCardStyles.assetLabel}>Asset Name</Text>
          <Text style={assetCardStyles.assetName}>{props.Name}</Text>
        </View>
        <View style={assetCardStyles.cardContentRight}>
          <Text style={assetCardStyles.assetLabel}>Herc ID</Text>
          <Text style={assetCardStyles.assetName}>{props.hercId}</Text>
        </View>
      </View>
    </View>

  )
}



const localStyles = StyleSheet.create({
  textFieldContainer: {
    flexDirection: "column",
    width: "97%",
    height: heightPercentageToDP(((40 / height) * 100).toString()),
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: ColorConstants.ElementBG,
    margin: 5,
    paddingLeft: 5,
    borderRadius: 6
    // height: heightPercentageToDP(((50 / height) * 100).toString()),
  },

  textField: {
    color: ColorConstants.MainBlue,
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
    // fontSize: 14,
    paddingLeft: 5,
    textAlign: "left",
    fontSize: 14,
    borderRadius: 8,
    // height: heightPercentageToDP('4.95'),
    paddingBottom: 0
  },
  costFieldAmount: {
    color: ColorConstants.MainBlue,
    marginRight: 5,
    paddingLeft: 5,
    textAlign: "left",
    fontSize: 20
  },

  labeledTextInput: {
    color: ColorConstants.MainBlue,
    width: "100%",
    borderRadius: 8,
    backgroundColor: ColorConstants.ElementBG,
    margin: 0,
    fontSize: 17
  },
  labelText: {
    fontSize: 11,
    color: ColorConstants.MainSubGray,
    marginLeft: 3,
    fontWeight: "normal"
  },

  PasswordInputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: ColorConstants.MainGray,
    borderRadius: 6,
    margin: 0
    // paddingRight: 10
  },
  passwordTextInput: {
    borderRadius: 0,
    backgroundColor: ColorConstants.ElementBG,
    margin: 0,
    flex: 1,
    fontSize: 17,
    alignSelf: "center"
  },

  costDisplay: {
    height: heightPercentageToDP(((40 / height) * 100).toString()),
    width: widthPercentageToDP("90"),
    backgroundColor: ColorConstants.MainBlue,
    borderRadius: 8,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginTop: 10,
    alignSelf: "center"
    // marginTop: heightPercentageToDP('20')
  },
  eyeballContainer: {
    justifyContent: "center",
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
    width: widthPercentageToDP("90"),
    height: heightPercentageToDP("6"),
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: ColorConstants.ElementBG,
    margin: 5,
    paddingLeft: 5,
    borderRadius: 8
  },

  buttonLabel: {
    fontSize: 12,
    color: ColorConstants.MainSubGray,
    margin: 5,
    // marginLeft: '15%',
    alignSelf: "center"
  },

  flexRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  registerButton: {
    height: heightPercentageToDP(((40 / height) * 100).toString()),
    width: '75%',
    backgroundColor: ColorConstants.MainGold,
    borderRadius: 8,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    alignSelf: "center"
    // marginTop: heightPercentageToDP('20')
  }

  // width: (width * .9),
  // height: (height * .056),
});
