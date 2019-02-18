import React, { Component } from 'react';
import { Platform, WebView, Image, StyleSheet, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import hiprLogo from "../assets/hiprLogo.png";


class Hipr extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Image style={{
      height: 150,
      width: 150,
      marginLeft: '22%',
      resizeMode: 'contain',
      alignSelf: 'center'
    }}
      source={hiprLogo} />,
  })

  /*

  NOTES FOR HIPR PAYMENT MODEL

  hipr fee > 0x20B3dB2C1E7CFdE1a7f7D40dEf288Dc94F1e59d4 = 0.000032 HERC
  priority for HIPR is
  0.000032 = Low
  0.000064 = mid
  0.000096 = High
  the hiprFee is like a minerFee

  */

componentDidMount (){}

  render() {
    let ethereumAddress = this.props.ethereumAddress
    let transaction = this.props.navigation.getParam('transaction') // TODO: add error handling for empty param
    let ipfsHash = transaction.data.properties
    let uri = 'https://hipr.one/' + ethereumAddress + '/' + ipfsHash + '/' + ipfsHash
    // let uri = 'https://hipr.one/'

    console.log('Full hipr uri: jm', uri)
    return (
      <WebView
        source={{ uri: uri }}
        style={{ margin: 0, padding: 0, flex: 1, width: '100%' }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  ethereumAddress: state.WalletActReducers.ethereumAddress
});


export default connect(mapStateToProps)(Hipr);

const localStyles = StyleSheet.create({
  hiprBackContainer: {
    width: 75,
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 5,
    flexDirection: 'row'
  },
  pillar: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  }
})
