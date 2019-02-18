import React, { Component } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
// import { ConstanSts, BarCodeScanner, Permissions } from "expo";
import { Button } from "react-native";
import { connect } from "react-redux";
import { getQRData } from "../actions/AssetActions";

//to test QR functionality without a camera do the following:
// * comment out lines 40, and 78 - 87
// * uncomment lines 42-53, and 88-95

class QRCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  // _requestCameraPermission = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({
  //     hasCameraPermission: status === "granted"
  //   });
  // };

  handleQRForward = () => {
    const passStateToRedux = this.props.getQRData(this.state);

    const { navigate } = this.props.navigation;
    navigate("NewAssetForm");
  };

  _handleBarCodeRead = data => {
    const scanResult = data.data;
    const splitScanResult = scanResult.split(", ");

    // const splitScanResult = [
    //   "anthemSilver",
    //   "anthemgold.com",
    //   "https://firebasestorage.googleapis.com/v0/b/hercone-8025f.appspot.com/o/AG_logo.png?alt=media&token=756e5e75-7c07-4f5c-91a7-d72ce1c0b9ed",
    //   "Assay",
    //   "Bar Serial",
    //   "Bar ID",
    //   "Date Processed",
    //   "Mint",
    //   "Supplier",
    //   "Vault Location",
    //   "Weight"
    // ];

    this.setState(
      {
        assetName: splitScanResult[0],
        assetURL: splitScanResult[1], //assetURL is deprecated 11/09/2018 version 0.9.4
        iconURL: splitScanResult[2],
        CoreProps: {
          metric1: splitScanResult[3],
          metric2: splitScanResult[4],
          metric3: splitScanResult[5],
          metric4: splitScanResult[6],
          metric5: splitScanResult[7],
          metric6: splitScanResult[8],
          metric7: splitScanResult[9],
          metric8: splitScanResult[10]
        }
      },
      () => this.handleQRForward()
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text>Camera permission is not granted</Text>
        ) : (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{ height: 200, width: 200 }}
          />
        )}
        {/* <Button
          onPress={() => {
            this._handleBarCodeRead();
          }}
          title="click to simulate scan"
          color="#841584"
          accessibilityLabel="click to simulate scan"
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});

const mapDispatchToProps = dispatch => ({
  getQRData: data => dispatch(getQRData(data))
});

export default connect(
  null,
  mapDispatchToProps
)(QRCapture);
