import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Alert,
  Clipboard,
  Linking
} from "react-native";
import React from "react";
import styles from "../../assets/styles";
import hercCoin from "../../assets/icons/hercCoin.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import BigNumber from "bignumber.js";
import QRCode from "react-qr-code";
import RadioForm from "react-native-simple-radio-button";
import Modal from "react-native-modal";
import CustomModal from "../../components/modals/CustomModal";

///////  All this wallet balance stuff,
class WalletFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destAddress: "",
      sendAmount: "",
      displayWallet: "",
      availableTokens: [],
      selectedCrypto: "HERC",
      receiveModalVisible: false,
      transactions: [],
      displayTransactions: true,
      displayModalChooseToken: false,
      displayModalSendDetails: false,
      displayModalConfirmation: false,
      displayModalComplete: false,
      transactionID: ""
    };
  }

  static navigationOptions = () => ({
    headerTitle: (
      <View style={localStyles.headerBox}>
        <Text style={localStyles.headerText}>Wallet</Text>
      </View>
    )
  });

  componentDidMount = async () => {
    console.log(this.props, "these are the props****");
    if (!this.props.watchBalance || !this.props.watchBalance.ETH) {
      let light = await this.props.wallet.getEnabledTokens();
      let enabledTokens = light.reverse();
      console.log("###########" + enabledTokens);
      this.setState(
        {
          availableTokens: enabledTokens,
          displayWallet: enabledTokens[0] // initiate with HERC wallet
        },
        () => this._updateWallet()
      );
    } else {
      let enabledTokens = Object.keys(this.props.watchBalance).reverse();
      console.log("###########" + enabledTokens);
      this.setState(
        {
          availableTokens: enabledTokens,
          displayWallet: enabledTokens[0] // initiate with HERC wallet
        },
        () => this._updateWallet()
      );
    }

    await this._getActivity(this.props.ethereumAddress, this.state.displayWallet);
    this.setInterval(() => console.log(this.state.transactions), 1000);
  };

  _updateWallet = () => {
    if (!this.props.watchBalance || !this.props.watchBalance.ETH) {
      if (this.props.wallet) {
        let displayWallet = this.state.displayWallet;
        console.log(
          "Display Wallet: ",
          this.props.wallet.balances[displayWallet]
        );
        let tempBalance = new BigNumber(
          this.props.wallet.balances[displayWallet]
        )
          .times(1e-18)
          .toFixed(18);
        console.log(tempBalance, "***temp balance***");
        return tempBalance;
        // return "0.000000"; //don't assume it is 0
      }
    } else {
      let displayWallet = this.state.displayWallet;
      let tempBalance = new BigNumber(this.props.watchBalance[displayWallet])
        .times(1e-18)
        .toFixed(18);
      return tempBalance;
    }
  };
  async _onPressSend() {
    let selectedCrypto = this.state.selectedCrypto;
    const wallet = this.props.wallet;
    let destAddress = this.state.destAddress;
    let sendAmountInEth = new BigNumber(this.state.sendAmount);
    if (!destAddress) Alert.alert("Missing Destination Address");
    if (!sendAmountInEth) Alert.alert("Invalid Send Amount");
    let sendAmountInWei = sendAmountInEth.times(1e18).toString();

    const abcSpendInfo = {
      networkFeeOption: "standard",
      currencyCode: selectedCrypto,
      metadata: {
        name: "Transfer From Herc Wallet",
        category: "Transfer:Wallet:College Fund"
      },
      spendTargets: [
        {
          publicAddress: destAddress,
          nativeAmount: sendAmountInWei
        }
      ]
    };
    try {
      let abcTransaction = await this.props.wallet.makeSpend(abcSpendInfo);
      await wallet.signTx(abcTransaction);
      await wallet.broadcastTx(abcTransaction);
      await wallet.saveTx(abcTransaction);
      this._closeAllModals();
      this.setState({
        transactionID: abcTransaction.txid,
        displayModalComplete: true,
      });

      // Alert.alert(
      //   "Transaction ID",
      //   abcTransaction.txid,
      //   [
      //     {
      //       text: "Copy",
      //       onPress: () => this.writeToClipboard(abcTransaction.txid),
      //       style: "cancel"
      //     },
      //     { text: "OK", onPress: () => console.log("OK Pressed") }
      //   ],
      //   { cancelable: false }
      // );
    } catch (e) {
      let displayWallet = this.state.displayWallet;
      let tempBalance = new BigNumber(this.props.watchBalance[displayWallet])
        .times(1e-18)
        .toFixed(6);

      Alert.alert(
        "Insufficient Funds",
        "Balance: " + tempBalance + " " + displayWallet,
        [{ text: "Ok", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
    // TODO: after successful transaction, reset state.
  }

  writeToClipboard = async data => {
    await Clipboard.setString(data);
    Alert.alert("Copied to Clipboard!", data);
  };

  _addWallet = walObj => {
    this.props.addWallet(walObj);
    this.setModalVisible();
  };

  _toggleReceiveModal = () => {
    this.setState({
      receiveModalVisible: !this.state.receiveModalVisible
    });
  };

  _closeAllModals = () => {
    this.setState({
      displayModalChooseToken: false,
      displayModalSendDetails: false,
      displayModalConfirmation: false,
      displayModalComplete: false,
      receiveModalVisible: false
    });
  };

  _displayChangeCurrency = () => {
    if (this.state.displayWallet === "HERC") {
      return (
        // <View style={localStyles.changeCurrencyContainer}>
        //   <Image style={localStyles.smallIcon} source={hercCoin} />
        //   <Text style={localStyles.changeCurrencyText}> HERC</Text>
        // </View>
        <View style={localStyles.changeCurrencyContainer}>
          <Icon name="ethereum" size={16} />
          <Text style={localStyles.changeCurrencyText}> ETH</Text>
        </View>
      );
    } else {
      return (
        // <View style={localStyles.changeCurrencyContainer}>
        //   <Icon name="ethereum" size={16} />
        //   <Text style={localStyles.changeCurrencyText}> ETH</Text>
        // </View>
        <View style={localStyles.changeCurrencyContainer}>
          <Image style={localStyles.smallIcon} source={hercCoin} />
          <Text style={localStyles.changeCurrencyText}> HERC</Text>
        </View>
      );
    }
  };

  _selectCrypto = crypto => {
    this.setState({
      selectedCrypto: crypto
    });
  };

  _displayActivity = (transaction, index) => {
    let transactionAmount;
    if(this.state.displayWallet === "HERC"){
      //convert the HERC values to appropriate decimal places
      transactionAmount = new BigNumber(transaction.value).times(1e-18).toFixed(18);
    }else if ( this.state.displayWallet === "ETH"){
      //ETH values are received at correct decimal places
      transactionAmount = new BigNumber(transaction.value).toFixed(18);
    }
    if (transaction.from === this.props.ethereumAddress) {
      activityType = "Sent";
    } else if (transaction.to === this.props.ethereumAddress) {
      activityType = "Received";
    }
    var t = new Date(transaction.timestamp * 1000).toString();
    var formattedTime = t.substr(4, 17);
    return (
      <View
        key={index}
        style={[
          localStyles.displayActivityContainer,
          this.state.displayTransactions
            ? localStyles.displayFlex
            : localStyles.displayNone,
          index % 2 === 0
            ? localStyles.displayActivityContainerBG1
            : localStyles.displayActivityContainerBG2
        ]}
      >
        <Icon
          style={[{ flex: 1, alignSelf: "center" }]}
          name={
            activityType === "Sent" ? "arrow-top-right" : "arrow-bottom-left"
          }
          size={32}
          color={activityType === "Sent" ? "#f5565b" : "#95c260"}
        />
        <View style={{ flex: 4 }}>
          <Text style={{ color: "#9398b2" }}>
            {activityType} {this.state.displayWallet}
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            {transactionAmount}
             {this.state.displayWallet}
          </Text>
        </View>
        <Text
          style={{
            flex: 3,
            color: "#9398b2",
            fontSize: 12,
            textAlign: "right"
          }}
        >
          {formattedTime}
        </Text>
      </View>
    );
  };

  _getActivity = (address, token) => {
    let hercAddress = "0x6251583e7d997df3604bc73b9779196e94a090ce";
    let api = "";
    if (token === "ETH") {
      api =
        "http://api.ethplorer.io/getAddressTransactions/" +
        address +
        "?apiKey=freekey";
    } else if (token === "HERC") {
      api =
        "http://api.ethplorer.io/getAddressHistory/" +
        address +
        "?apiKey=freekey&token=" +
        hercAddress;
    }

    fetch(api)
      .then(response => response.json())
      .then(responseJson => {
        if (token === "ETH") {
          this.setState({
            transactions: responseJson,
            displayTransactions: true
          });
        } else if (token === "HERC") {
          this.setState({
            transactions: responseJson.operations,
            displayTransactions: true
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  _changeCurrency = async () => {
    await this.setState(
      {
        displayTransactions: false,
        displayWallet: this.state.displayWallet === "HERC" ? "ETH" : "HERC"
      },
      () => this._updateWallet()
    );
    this._getActivity(this.props.ethereumAddress, this.state.displayWallet);
  };

  render() {
    let currencyValue = this._updateWallet();

    return (
      <View style={localStyles.walletContainer}>
        <View style={localStyles.balanceWrapperContainer}>
          <View style={localStyles.balanceContainer}>
            <View style={localStyles.balanceInnerContainer}>
              <View style={localStyles.balanceInnerLeftContainer}>
                <Text style={localStyles.balanceLabelText}>Your Balance</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 5,
                    alignItems: "center"
                  }}
                >
                  <Text style={localStyles.balanceText}>{currencyValue} </Text>
                  {this.state.displayWallet === "HERC" ? (
                    <Image style={localStyles.icon} source={hercCoin} />
                  ) : (
                    <Icon name="ethereum" size={26} />
                  )}
                </View>
              </View>
              <View style={localStyles.balanceInnerRightContainer}>
                <Text
                  style={[
                    localStyles.balanceLabelText,
                    { alignSelf: "center" }
                  ]}
                >
                  Choose
                </Text>
                <TouchableHighlight
                  onPress={() => {
                    this._changeCurrency();
                  }}
                >
                  {this._displayChangeCurrency()}
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>

        <View style={localStyles.activityContainer}>
          <Text>Activity</Text>
          <ScrollView>
            {typeof this.state.transactions !== "undefined"
              ? this.state.transactions.map((transaction, index) =>
                  this._displayActivity(transaction, index)
                )
              : null}
          </ScrollView>
        </View>
        <View style={localStyles.actionsContainer}>
          <TouchableHighlight
            style={[localStyles.actionButton, { backgroundColor: "#95c260" }]}
            onPress={() => this.setState({ displayModalChooseToken: true })}
          >
            <Text style={localStyles.actionButtonText}>Send</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[localStyles.actionButton, { backgroundColor: "#f5565b" }]}
            onPress={this._toggleReceiveModal}
          >
            <Text style={localStyles.actionButtonText}>Receive</Text>
          </TouchableHighlight>
        </View>

        <Modal
          isVisible={this.state.displayModalChooseToken}
          onBackButtonPress={() =>
            this.setState({ displayModalChooseToken: false })
          }
          onBackdropPress={this._closeAllModals}
          style={{ margin: 0 }}
        >
          <View style={modalStyles.modalLower}>
            <View style={modalStyles.sendCryptoContainer}>
              <Text style={modalStyles.menuTitle}>Send Cryptocurrency</Text>
              <Text style={modalStyles.menuSubtitle}>
                Choose Cryptocurrency
              </Text>

              <View style={modalStyles.send1LowerContainer}>
                <View style={modalStyles.sourceIconContainer}>
                  <TouchableHighlight
                    onPress={() => this._selectCrypto("HERC")}
                  >
                    <View
                      style={[
                        modalStyles.cryptoIconContainer,
                        this.state.selectedCrypto === "HERC"
                          ? modalStyles.selectedCryptoIconBackground
                          : modalStyles.unselectedCryptoIconBackground
                      ]}
                    >
                      <Image style={localStyles.icon} source={hercCoin} />
                    </View>
                  </TouchableHighlight>
                  <Text
                    style={[
                      modalStyles.cryptoText,
                      this.state.selectedCrypto === "HERC"
                        ? modalStyles.selectedCryptoTextColor
                        : modalStyles.unselectedCryptoTextColor
                    ]}
                  >
                    HERC
                  </Text>
                </View>

                <View style={modalStyles.sourceIconContainer}>
                  <TouchableHighlight onPress={() => this._selectCrypto("ETH")}>
                    <View
                      style={[
                        modalStyles.cryptoIconContainer,
                        this.state.selectedCrypto === "ETH"
                          ? modalStyles.selectedCryptoIconBackground
                          : modalStyles.unselectedCryptoIconBackground
                      ]}
                    >
                      <Icon name="ethereum" size={26} />
                    </View>
                  </TouchableHighlight>
                  <Text
                    style={[
                      modalStyles.cryptoText,
                      this.state.selectedCrypto === "ETH"
                        ? modalStyles.selectedCryptoTextColor
                        : modalStyles.unselectedCryptoTextColor
                    ]}
                  >
                    ETH
                  </Text>
                </View>
              </View>

              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    displayModalChooseToken: false,
                    displayModalSendDetails: true
                  });
                  console.log("clicked button");
                }}
                style={localStyles.bigButton}
              >
                <Text style={localStyles.bigButtonText}>Send</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.displayModalSendDetails}
          onBackButtonPress={() => {
            this.setState({ displayModalSendDetails: false, displayModalChooseToken: true })
          }}
          onBackdropPress={this._closeAllModals}
          style={{ margin: 0 }}
        >
          <View style={modalStyles.modalLower}>
            <View style={modalStyles.sendCryptoContainer}>
              <Text style={modalStyles.menuTitle}>Send Cryptocurrency</Text>
              <Text style={modalStyles.menuSubtitle}>
                Send Details
              </Text>

              <View style={modalStyles.send2LowerContainer}>
                <TextInput
                  style={localStyles.textInput}
                  underlineColorAndroid="transparent"
                  placeholder="Destination Address"
                  onChangeText={destAddress =>
                    this.setState({ destAddress }, () =>
                      console.log("destination address", this.state.destAddress)
                    )
                  }
                  value={this.state.destAddress}
                />
                <TextInput
                  style={localStyles.textInput}
                  underlineColorAndroid="transparent"
                  placeholder="Amount"
                  onChangeText={sendAmount =>
                    this.setState({ sendAmount }, () =>
                      console.log("sendAmount", this.state.sendAmount)
                    )
                  }
                  value={this.state.sendAmount}
                />
              </View>

              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    displayModalConfirmation: true,
                    displayModalSendDetails: false
                  });
                }}
                style={localStyles.bigButton}
              >
                <Text style={localStyles.bigButtonText}>Send</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.displayModalConfirmation}
          onBackButtonPress={() => {
            this.setState({ displayModalConfirmation: false, displayModalSendDetails: true })
          }}
          onBackdropPress={this._closeAllModals}
          style={{ margin: 0 }}
        >
          <View style={modalStyles.modalLower}>
            <View style={modalStyles.sendCryptoContainer}>
              <Text style={modalStyles.menuTitle}>Send Cryptocurrency</Text>
              <Text style={modalStyles.menuSubtitle}>Confirmation</Text>

              <View style={modalStyles.send2LowerContainer}>
                <View style={{ width: "90%" }}>
                  <Text style={{ textAlign: "left" }}>Address</Text>
                  <Text style={{ color: "gold" }}>
                    {this.state.destAddress}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "90%"
                  }}
                >
                  <View>
                    <Text style={modalStyles.menuSubtitle}>Amount</Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "black"
                      }}
                    >
                      {" "}
                      {this.state.sendAmount}{" "}
                    </Text>
                  </View>
                  <View>
                    <Text style={modalStyles.menuSubtitle}>Cryptocurrency</Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "black"
                      }}
                    >
                      {this.state.selectedCrypto}
                    </Text>
                  </View>
                  {/* ***THIS IS THE DOLLARS VALUE WORTH OF CRYPTO**
                  
                  <View>
                    <Text style={modalStyles.menuSubtitle}>US Dollars</Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "black"
                      }}
                    >
                      500
                    </Text>
                  </View> */}

                </View>
              </View>

              <TouchableHighlight
                onPress={() => {
                  this._closeAllModals();
                  this._onPressSend()
                }}
                style={localStyles.confirmButton}
              >
                <Text style={localStyles.confirmButtonText}>Send</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.receiveModalVisible}
          onBackButtonPress={this._toggleReceiveModal}
          onBackdropPress={this._closeAllModals}
          style={{ margin: 0 }}
        >
          <View style={modalStyles.modalLower}>
            <View style={modalStyles.receiveContainer}>
              <Text style={modalStyles.menuTitle}>Receive Cryptocurrency</Text>
              {this.props.ethereumAddress ? (
                <QRCode size={180} value={this.props.ethereumAddress} />
              ) : null}
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={modalStyles.menuSubtitle}>
                  Hold to copy wallet address
                </Text>
                <View style={modalStyles.addressContainer} />
                <TouchableHighlight
                  onPress={() => {
                    this.writeToClipboard(this.props.ethereumAddress);
                  }}
                >
                  <View style={modalStyles.addressContainer}>
                    <Text style={{ fontSize: 12 }}>Address</Text>
                    <Text style={modalStyles.addressText}>
                      {this.props.ethereumAddress}
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <CustomModal
          isVisible={this.state.displayModalComplete}
          modalCase="complete"
          content={
            this.state.selectedCrypto + "has been sent successfully." +
            " Transaction ID: " +
            this.state.transactionID
          }
          dismissAcceptText="Continue"
          closeModal={() => {
            this.setState({ displayModalComplete: false });
          }}
        />
        <CustomModal
          isVisible={false}
          modalCase="error"
          content="Something went wrong."
          dismissRejectText="Try again"
          closeModal={() => {}}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ethereumAddress: state.WalletReducers.ethereumAddress,
  // currencyCode: state.WalletReducers.wallet.currencyInfo.currencyCode,
  availableWallets: state.WalletReducers.walletTypes,
  wallet: state.WalletReducers.wallet,
  // balanceInWei:
  //     state.WalletReducers.wallet.balances[
  //     state.WalletReducers.wallet.currencyInfo.currencyCode
  //     ],
  account: state.WalletReducers.account,
  watchBalance: state.WalletReducers.watchBalance
});

export default connect(
  mapStateToProps,
  null
)(WalletFlow);

const localStyles = StyleSheet.create({
  walletContainer: {
    flex: 1,
    backgroundColor: "#0b0368",
    justifyContent: "center"
  },
  balanceWrapperContainer: {
    flex: 3
  },

  balanceContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
    backgroundColor: "#252079",
    borderRadius: 5
  },
  activityContainer: {
    flex: 8,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 20
  },
  actionsContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  balanceText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14
  },
  balanceLabelText: {
    color: "#8e94af",
    fontSize: 14
  },
  balanceInnerContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 15,
    marginHorizontal: 20
  },
  balanceInnerLeftContainer: {
    flex: 2,
    justifyContent: "space-evenly"
  },
  balanceInnerRightContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  changeCurrencyContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center"
  },

  changeCurrencyText: {
    fontSize: 10,
    fontWeight: "bold"
  },

  icon: {
    height: 26,
    width: 26,
    borderRadius: 26 / 2,
    resizeMode: "contain",
    alignSelf: "center"
  },

  smallIcon: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    resizeMode: "contain",
    alignSelf: "center"
  },

  actionButton: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    alignItems: "center"
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    paddingVertical: 10
  },

  headerBox: {
    flex: 1,
    backgroundColor: "#0b0368",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontSize: 26
  },
  text: {
    color: "black",
    textAlign: "left",
    fontSize: 22,
    fontWeight: "normal",
    margin: 5,
    fontFamily: "dinPro"
  },
  flipIcon: {
    transform: [{ rotate: "270deg" }]
  },
  displayFlex: {
    display: "flex"
  },
  displayNone: {
    display: "none"
  },
  displayActivityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 5,
    marginTop: 5,
    padding: 10
  },
  displayActivityContainerBG1: {
    backgroundColor: "#f2f3fb"
  },
  displayActivityContainerBG2: {
    backgroundColor: "#ffffff"
  },
  bigButton: {
    margin: 5,
    backgroundColor: "#f4c736",
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
    width: "90%",
    borderRadius: 5
  },
  confirmButton: {
    margin: 5,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
    width: "90%",
    borderRadius: 5
  },
  bigButtonText: {
    color: "#ffffff",
    fontSize: 16
  },
  greenSendButton: {
    margin: 5,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
    width: "90%",
    borderRadius: 5
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: "#f2f3fb",
    width: "90%"
  }
});

const modalStyles = StyleSheet.create({
  modalLower: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    flex: 1
  },

  send1LowerContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  send2LowerContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  sendCryptoContainer: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "40%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  sourceIconContainer: {
    height: "50%",
    width: "30%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff"
  },
  cryptoIconContainer: {
    padding: 10,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center"
  },
  selectedCryptoIconBackground: {
    backgroundColor: "#95c260"
  },
  unselectedCryptoIconBackground: {
    backgroundColor: "#f2f3fb"
  },
  selectedCryptoTextColor: {
    color: "#95c260"
  },
  unselectedCryptoTextColor: {
    color: "#8e94af"
  },
  cryptoText: {
    fontSize: 14,
    fontWeight: "bold"
  },

  menuTitle: {
    color: "#000000",
    fontSize: 18,
    margin: 10
  },
  menuSubtitle: {
    color: "#9398b2",
    fontSize: 12,
    margin: 5
  },
  receiveContainer: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  addressContainer: {
    backgroundColor: "#f2f3fb",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  addressText: {
    fontWeight: "bold",
    fontSize: 14
  }
});
