import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
const { height, width } = Dimensions.get("window");
import styles from "../../../../assets/styles";
import ColorConstants from "../../../../assets/ColorConstants";
import React, { Component } from "react";
import { BigYellowButton } from "../../../../components/SharedComponents";
import { connect } from "react-redux";
const blockscannerImage = require("../../assets/block-scanner.png");
const swiperImage = require("../../assets/transaction-swiper.png");
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../../../../assets/responsiveUI";

class TrackSideChoice extends Component {
  constructor(props) {
    // console.log(this.props.navigation, "navigation??")
    super(props);
    console.log("componentTest");
    this.state = {
      checkSwiper: false,
      checkBlockScanner: false,
    };
  }

  onPressSwiper = () => {
    console.log("Swiper Pressed!");
    this.setState({
      checkSwiper: !this.state.checkSwiper,
      checkBlockScanner: false,
      place: "Swiper"
    });
  };

  onPressBlockScanner = () => {
    console.log("BlockScanner Pressed!");
    this.setState({
      checkSwiper: false,
      checkBlockScanner: !this.state.checkBlockScanner,
      place: "BlockScanner"
      // checkSwiper: !this.state.checkSwiper,
    });
  };

  handleSideChoice = () => {
    console.log("handling side choice");
    this.props.navigation.navigate('TxSwiper')

  };

  render() {
    let { height, width } = Dimensions.get("window");

    return (
      <View style={styles.baseContainer}>
        <StatusBar
          barStyle={"light-content"}
          translucent={true}
          backgroundColor="transparent"
        />

        <View style={styles.bodyContainer}>

          <View style={localStyles.choiceContainer}>
            <View style={localStyles.choiceSelection}>
              <View
                style={[
                  localStyles.choiceImageContainer,
                  {
                    backgroundColor: this.state.checkSwiper
                      ? ColorConstants.MainGold
                      : ColorConstants.ElementBG
                  }
                ]}
              >
                {this.state.checkSwiper && (
                  <View style={localStyles.checkBoxContainer}>
                    <Icon name={"check"} size={18} color={"white"} />
                  </View>
                )}
                <TouchableWithoutFeedback onPress={this.onPressSwiper}>
                  <Image source={swiperImage} style={localStyles.choiceImage} />
                </TouchableWithoutFeedback>
              </View>
              <Text style={[localStyles.labelTitle, { fontWeight: "normal" }]}>
                Trasaction Swiper
                </Text>
            </View>
            {/* Right Side Below */}
            <View style={localStyles.choiceSelection}>
              <View
                style={[
                  localStyles.choiceImageContainer,
                  {
                    backgroundColor: this.state.checkBlockScanner
                      ? ColorConstants.MainGold
                      : ColorConstants.ElementBG
                  }
                ]}
              >
                {this.state.checkBlockScanner && (
                  <View style={localStyles.checkBoxContainer}>
                    <Icon name={"check"} size={18} color={"white"} />
                  </View>
                )}
                <TouchableWithoutFeedback onPress={this.onPressBlockScanner}>
                  <Image source={blockscannerImage} style={localStyles.choiceImage} />
                </TouchableWithoutFeedback>
              </View>
              <Text style={[localStyles.labelTitle, { fontWeight: "normal" }]}>
                BlockScanner
                </Text>
            </View>
          </View>
          <View style={localStyles.pageBottom}>
            <BigYellowButton
              buttonName={"Next"}
              onPress={() => this.handleSideChoice()}
            />
          </View>
        </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedAsset: state.AssetReducers.selectedAsset,

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackSideChoice);

const localStyles = StyleSheet.create({
  labelTitle: {
    alignSelf: 'center'
  },
  pageBottom: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },

  choiceContainer: {
    flexDirection: "row",
    backgroundColor: ColorConstants.MainGray,
    // backgroundColor: 'blue',
    padding: 10,
    // paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: heightPercentageToDP("30")
  },

  choiceSelection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorConstants.MainGray,
    height: widthPercentageToDP(((150 / width) * 100).toString())
  },

  choiceImageContainer: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    width: widthPercentageToDP(((100 / width) * 100).toString()),
    height: heightPercentageToDP(((100 / height) * 100).toString()),
    borderRadius: 50,
    // backgroundColor: ColorConstants.MainGray,
    justifyContent: "center",
    margin: 15,
    marginTop: 0
  },

  checkBoxContainer: {
    alignSelf: "flex-end",
    justifyContent: "center",
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "black",
    borderRadius: 9

    // height: widthPercentageToDP('5'),
    // width: heightPercentageToDP('5'),
  },
  // checkSwiper: {
  //     display: this.state.checkSwiper
  // },
  // checkBlockscanner: {
  //     display: this.state.checkBlockscanner
  // },

  choiceImage: {
    resizeMode: "contain",
    height: 50,
    width: 50,
    alignSelf: "center"
  },
  labelTitle: {
    fontSize: 16,
    color: ColorConstants.MainBlue,
    margin: 5,
    fontWeight: "bold"
  },

  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },

  modalButton: {
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 2,
    borderWidth: 2
  },
  wordsText: {
    textAlign: "center"
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%"
  },
  closeButton: {
    padding: 15
  },

  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    // backgroundColor: ColorConstants.MainBlue,
    backgroundColor: ColorConstants.MainGray,
    alignItems: "center",
    justifyContent: "flex-start",
    // marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  menuTitle: {
    color: ColorConstants.MainBlue,
    fontSize: 26,
    margin: 5
  },
  passwordInputContainer: {
    justifyContent: "flex-start",
    backgroundColor: ColorConstants.ElementBG
  }
});
