import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableHighlight,
  FlatList
} from "react-native";
import styles from "../../../assets/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { AddAssetButton } from "./SupplyChainComponents";
import { AssetCard } from "../../../components/AssetCard";
import {
  ShowAssetPasswordModal,
  GettingAssetIpfsDefintion,
  SelectedAsset,
  GetHeaders
} from "../Assets/AssetActionCreators";

import AssetPasswordModal from "../../../components/modals/AssetPasswordModal";

import { GetCurrentHercValue } from "../Transactions/TransactionActionCreators";
// import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

class SupplyChainSplash extends Component {
  constructor(props) {
    // console.log(this.props.navigation, "navigation??")
    super(props);
    console.log("componentTest");
    // this.checkPassword = this.checkPassword.bind(this);
  }
  componentWillMount = () => {
    this.props.GetHeaders();

  }

  componentDidMount = () => {
    console.log("supplychain splash did mount, go for the prices"),
      this.props.GetCurrentHercValue();
  };

  passwordCorrect = () => {
    this.props.GetAssetDef(this.props.selectedAsset.hashes.ipfsHash);
    this.props.ShowAssetPasswordModal();

    this.props.navigation.navigate("SupplyChainSideChoice");
  };

  renderAssets = () => {
    return this.props.assets.map((x, i) => {
      console.log(x, i);
      return (
        <TouchableHighlight key={i} onPress={() => this.onSelectAsset(i)}>
          <AssetCard asset={x} />
        </TouchableHighlight>
      );
    });
  };

  render() {
    let assetList = this.renderAssets();
    return (
      <View style={styles.baseContainer}>
        <StatusBar
          barStyle={"light-content"}
          translucent={true}
          backgroundColor="transparent"
        />
        <View style={styles.bodyContainer}>
         
          <FlatList
            data={this.props.assets}
            keyExtractor={item => item.key}
            renderItem={item => {
              return (
                <TouchableHighlight
                  key={item.item.key}
                  onPress={() => this.props.SelectedAsset(item.item)}
                >
                  <AssetCard asset={item.item} />
                </TouchableHighlight>
              );
            }}
          />

        </View>

        <AssetPasswordModal
          // heading={'Enter Asset Password'}
          isVisible={this.props.showPasswordModal}
          passwordCorrect={this.passwordCorrect}
          // ShowPasswordModal={this.props.ShowPasswordModal}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  assets: state.AssetReducers.assets,
  selectedAsset: state.AssetReducers.selectedAsset,
  assetFetched: state.AssetReducers.assetFetched,
  showPasswordModal: state.AssetReducers.showPasswordModal
});

const mapDispatchToProps = dispatch => ({
  ShowAssetPasswordModal: () => dispatch(ShowAssetPasswordModal()),
  SelectedAsset: asset => dispatch(SelectedAsset(asset)),
  GetAssetDef: assetIpfsHash =>
    dispatch(GettingAssetIpfsDefintion(assetIpfsHash)),
  GetCurrentHercValue: () => dispatch(GetCurrentHercValue()),
  GetHeaders: () => dispatch(GetHeaders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplyChainSplash);

// const localStyles = StyleSheet.create({

//     imageSourceContainer: {
//         flexDirection: 'row',
//         backgroundColor: ColorConstants.MainGray,
//         padding: 10,
//         paddingTop: 30,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '50%',
//         height: '50%',
//         borderWidth: 0,

//     },

//     sourceIconContainer: {
//         height: '100%',
//         alignItems: 'center',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         backgroundColor: ColorConstants.MainGray
//     },

//     iconButton: {
//         alignSelf: 'center',
//         marginLeft: 10,
//         backgroundColor: ColorConstants.MainGray
//         // height: widthPercentageToDP('5'),
//         // width: heightPercentageToDP('5'),

//     },

//     camSourceIcon: {
//         backgroundColor: ColorConstants.MainGray,
//         justifyContent: 'center',
//         alignSelf: 'center',
//         // height: widthPercentageToDP('10'),
//         // width: heightPercentageToDP('10'),

//     },

//     activityIndicatorWrapper: {
//         backgroundColor: '#FFFFFF',
//         height: 100,
//         width: 100,
//         borderRadius: 7,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-around'
//     },

//     modalButton: {
//         margin: 10,
//         justifyContent: 'center',
//         alignSelf: 'center',
//         borderRadius: 2,
//         borderWidth: 2,
//     },
//     wordsText: {
//         textAlign: 'center',
//     },
//     closeButtonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         width: '80%',
//     },
//     closeButton: {
//         padding: 15
//     },

//     container: {
//         width: '100%',
//         height: '100%',
//         flexDirection: 'column',
//         // backgroundColor: ColorConstants.MainBlue,
//         backgroundColor: ColorConstants.MainGray,
//         alignItems: "center",
//         justifyContent: "flex-start",
//         // marginTop: 20,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20
//     },
//     labelTitle: {
//         fontSize: 18,
//         color: ColorConstants.MainBlue,
//         margin: 5
//     },
//     menuTitle: {
//         color: ColorConstants.MainBlue,
//         fontSize: 26,
//         margin: 5,

//     },
//     passwordInputContainer: {

//         justifyContent: 'flex-start',
//         backgroundColor: ColorConstants.ElementBG
//     }

// })
