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
import styles from "../../../assets/styles";
import ColorConstants from "../../../constants/ColorConstants";
import React, { Component } from "react";
import { BigYellowButton } from "../../../components/SharedComponents";
import { connect } from "react-redux";
import { StartTransaction } from "../Transactions/TransactionActionCreators";
import GetOrSetTransactionPasswordModal from '../../../components/modals/GetOrSetTransactionPasswordModal';
const OrigImage = require("./imageAssets/originator.png");
const RecipImage = require("./imageAssets/recipient.png");
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../../../assets/responsiveUI";
import { ShowPasswordModal } from "../Transactions/TransactionActionCreators";

class SupplyChainSideChoice extends Component {
  constructor(props) {
    // console.log(this.props.navigation, "navigation??")
    super(props);
    console.log("componentTest");
    this.state = {
      checkOrig: false,
      checkRecip: false,
      place: "",
      pwModalIsVisible: false

    };
    this.passwordHandled = this.passwordHandled.bind(this);
    // this.localOnChange = this.localOnChange.bind(this);
    // this.pwChange = this.pwChange.bind(this);
  }

  toggleModal = () => {
      this.setState({
          pwModalIsVisible: !this.state.pwModalIsVisible
      })
  }

  onPressOrig = () => {
    console.log("orig Pressed!");
    this.setState({
      checkOrig: !this.state.checkOrig,
      checkRecip: false,
      place: "Originator"
    });
  };

  onPressRecip = () => {
    console.log("recip Pressed!");
    this.setState({
      checkOrig: false,
      checkRecip: true,
      place: "Recipient"
      // checkOrig: !this.state.checkOrig,
    });
  };

  passwordHandled = () => {
      this.props.StartTransaction(this.state.place);
      this.props.ShowPasswordModal();
      this.props.navigation.navigate('SupplyChainTx');
  }

goToSupplyChainTX = () => {
}

 handleSideChoice = () => {
    console.log("handling side choice");
    this.props.ShowPasswordModal()

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
          <Text style={localStyles.labelTitle}>
            Where are you along the Supply Chain?
          </Text>

          <View style={localStyles.choiceContainer}>
            <View style={localStyles.choiceSelection}>
              <View
                style={[
                  localStyles.choiceImageContainer,
                  {
                    backgroundColor: this.state.checkOrig
                      ? ColorConstants.MainGold
                      : ColorConstants.ElementBG
                  }
                ]}
              >
                {this.state.checkOrig && (
                  <View style={localStyles.checkBoxContainer}>
                    <Icon name={"check"} size={18} color={"white"} />
                  </View>
                )}
                <TouchableWithoutFeedback onPress={this.onPressOrig}>
                  <Image source={OrigImage} style={localStyles.choiceImage} />
                </TouchableWithoutFeedback>
              </View>
              <Text style={[localStyles.labelTitle, { fontWeight: "normal" }]}>
                Originator
              </Text>
            </View>
            <View style={localStyles.choiceSelection}>
              <View
                style={[
                  localStyles.choiceImageContainer,
                  {
                    backgroundColor: this.state.checkRecip
                      ? ColorConstants.MainGold
                      : ColorConstants.ElementBG
                  }
                ]}
              >
                {this.state.checkRecip && (
                  <View style={localStyles.checkBoxContainer}>
                    <Icon name={"check"} size={18} color={"white"} />
                  </View>
                )}
                <TouchableWithoutFeedback onPress={this.onPressRecip}>
                  <Image source={RecipImage} style={localStyles.choiceImage} />
                </TouchableWithoutFeedback>
              </View>
              <Text style={[localStyles.labelTitle, { fontWeight: "normal" }]}>
                Recipient
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
        <GetOrSetTransactionPasswordModal
            place={this.state.place}
            passwordHandled={this.passwordHandled}
            />

      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedAsset: state.AssetReducers.selectedAsset,
  showPassWordModal: state.TransactionReducers.modals.passwordModal
});

const mapDispatchToProps = (dispatch) => ({
  StartTransaction: (place) => dispatch(StartTransaction(place)),
  ShowPasswordModal: () => dispatch(ShowPasswordModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplyChainSideChoice);

const localStyles = StyleSheet.create({
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
  // checkOrig: {
  //     display: this.state.checkOrig
  // },
  // checkRecip: {
  //     display: this.state.checkRecip
  // },

  choiceImage: {
    resizeMode: "contain",
    height: 50,
    width: 50,
    alignSelf: "center"
  },
  labelTitle: {
    fontSize: 18,
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
