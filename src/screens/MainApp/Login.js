import {
  Button,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  PermissionsAndroid
} from 'react-native';
import React, { Component } from 'react';
// import { LoginScreen } from 'edge-login-ui-rn';
import { LoginScreen } from 'herc-edge-login-ui-rn';
import { YellowBox } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios';
import hercLogoPillar from "../../assets/hercLogoPillar.png";
import { ethereumCurrencyPluginFactory } from 'edge-currency-ethereum';
import { GetUsername, GetAccount, AuthToken, GetOrganization } from '../../features/AccountFlow/AccountActionCreators';
import {  GetEthAddress, GetWallet, UpdateBalances } from '../../features/WalletFlow/WalletActionCreators';
import { CheckWalletMeetsMinimumRequirement } from '../../features/RegisterAssetFlow/RegAssetActionCreators';
import { GetHeaders, ClearState } from "../../features/SupplyChainFlow/Assets/AssetActionCreators";
// import { getOrganization } from "../../actions/WalletActActions";
import { WEB_SERVER_API_TOKEN, WEB_SERVER_API_LATEST_APK, WEB_SERVER_API_USERS } from "../../components/settings";
import { makeEdgeContext } from 'edge-core-js';
import { EDGE_API_KEY } from '../../components/settings.js'
import firebase from "../../constants/Firebase";

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      context: null,
      account: null,
      walletId: null,
      wallet: null
    }
  makeEdgeContext({
    // Replace this with your own API key from https://developer.airbitz.co:
    apiKey: EDGE_API_KEY,
    appId: 'one.herc',
    // appId: 'com.mydomain.myapp',
    vendorName: 'Chain Net',
    vendorImageUrl: 'https://s3.us-east-2.amazonaws.com/hercmedia/hLogo.png',
    plugins: [ethereumCurrencyPluginFactory]
  }).then(context => {
    this.setState({ context })
  })
}



  onLogin = async (error = null, account) => {
    let tokenHerc = {
      currencyName: 'Hercules', // 0x6251583e7d997df3604bc73b9779196e94a090ce
      contractAddress: '0x6251583e7D997DF3604bc73B9779196e94A090Ce',
      currencyCode: 'HERC',
      multiplier: '1000000000000000000'
    };
    let customHercTokens = {
      tokens: [ "HERC", "HERCULES" ]
    };
    if (!this.state.account) {
      console.log('jm account', account);
      this.setState({account})
      this.props.GetAccount(account);
      this.props.GetUsername(account.username);

      let promiseArray = []

      promiseArray.push(axios.get(WEB_SERVER_API_TOKEN + account.username)
        .then(response => {
          let token = response.data
          this.props.AuthToken(token)
          firebase.auth().signInWithCustomToken(token).catch( error => { console.log(error) })
          axios.defaults.headers.common = {
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
          };
          return response
        })
        .catch(error => { console.log(error) })
      )

      promiseArray.push(axios.get(WEB_SERVER_API_LATEST_APK)
        .then(response => { return response })
        .catch(error => { console.log(error) })
      )
      console.log('jm keys?', account.allKeys[1].keys.ethereumAddress);
      promiseArray.push(axios.post(WEB_SERVER_API_USERS, {
        username: account.username,
        address: account.allKeys[1].keys.ethereumAddress
      })
        .then(response => { return response })
        .catch(error => { console.log(error) })
      )

      Promise.all(promiseArray)
        .then(async results => {
          console.log("Is this the latest APK?", results[1].data)
          console.log('jm user exists?', results[2].data.response);
          if (results[2].data.response !== true){
            await account.dataStore.setItem("one.herc", "hercUserID", results[2].data.id);
            // var item = await account.dataStore.getItem("one.herc", "hercUserID");
            // console.log('jm check if item is in account?',item);
          }
          const { navigate } = this.props.navigation;

          this.props.GetHeaders(this.props.username);

          if (results[1].data && results[1].data == true) {
            navigate('SideMenuNav', {
              userExists: results[2].data.response
            })
          } else {
            navigate('SideMenuNav', {
              userExists: results[2].data.response,
              alertLatestVersion: true
            })
          }

        })
        .catch(err => {
          console.log(err)
        })

    }
    if (!this.state.walletId) {
      // Check if there is a wallet, if not create it
      let walletInfo = account.getFirstWalletInfo('wallet:ethereum')
      if (walletInfo) {
        this.setState({walletId: walletInfo.id})
        account.waitForCurrencyWallet(walletInfo.id)
          .then(async wallet => {
            wallet.watch('balances', (newBalances) =>
            {
              console.log('NewBalances in login.js: jm', newBalances)
              this.props.UpdateBalances(newBalances)
            }
          );
            const tokens = await wallet.getEnabledTokens()

            this.props.GetEthAddress(wallet.keys.ethereumAddress)
            this.props.GetWallet(wallet)
            this.props.CheckWalletMeetsMinimumRequirement(wallet)
            wallet.addCustomToken(tokenHerc)
            wallet.enableTokens(customHercTokens).catch(err => {console.log("Enable Token Err: jm", err)})
            return wallet
          })
      } else {
        account.createCurrencyWallet('wallet:ethereum', {
          name: 'My First Wallet',
          fiatCurrencyCode: 'iso:USD'
        }).then(async wallet => {
          wallet.watch('balances', (newBalances) => this.props.UpdateBalances(newBalances));
          this.props.GetEthAddress(wallet.keys.ethereumAddress)
          this.props.GetWallet(wallet)
          this.props.CheckWalletMeetsMinimumRequirement(wallet)
          wallet.addCustomToken(tokenHerc)
          wallet.enableTokens(customHercTokens).catch(err => {console.log("Enable Token Err: jm", err)})
          this.setState({walletId: wallet.id})
        })
      }
    }
  }

  renderLoginApp = () => {
    if (this.state.context && !this.state.account) {
      return (
        <LoginScreen
          context={this.state.context}
          onLogin={this.onLogin}
          accountOptions={{}}
        />
      );
    }
    return   <Image source={hercLogoPillar} />;
  };

  render() {
      return (
        <View style={styles.container}>{this.renderLoginApp()}</View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

const mapStateToProps = (state) => ({
    edge_account: state.AssetReducers.edge_account,
});

const mapDispatchToProps = (dispatch) => ({
    GetHercId: () => dispatch(getHercId()),
    GetHeaders: (name) => dispatch(GetHeaders(name)),
    // GetOrganization: () => dispatch(GetOrganization()),
    ClearState: () => dispatch(ClearState()),

    UpdateBalances: (newBalances) => dispatch(UpdateBalances(newBalances)),
    GetUsername: (edge_account) => dispatch(GetUsername(edge_account)),
    AuthToken: (auth_token) => dispatch(AuthToken(auth_token)),
    GetEthAddress: (ethereumAddress) => dispatch(GetEthAddress(ethereumAddress)),
    GetWallet: (wallet) => dispatch(GetWallet(wallet)),
    GetAccount: (account) => dispatch(GetAccount(account)),
    CheckWalletMeetsMinimumRequirement: (wallet) => dispatch(CheckWalletMeetsMinimumRequirement(wallet))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
