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
import ColorConstants from '../../../constants/ColorConstants'
import { AddAssetButton } from "./SupplyChainComponents";
import { AssetCard } from "../../../components/AssetCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  // ShowAssetPasswordModal,
  GettingAssetIpfsDefintion,
  SelectedAsset,
  GetHeaders
} from "../Assets/AssetActionCreators";

// import AssetPasswordModal from "../../../components/modals/AssetPasswordModal";

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
    this.props.GetCurrentHercValue();
  };

  /* //deprecated PasswordModal
  passwordCorrect = () => {
    this.props.GetAssetDef(this.props.selectedAsset.hashes.ipfsHash);
    this.props.ShowAssetPasswordModal();

    this. props.navigation.navigate("SupplyChainSideChoice");
  };
  */

  renderAssets = () => {
    console.log('jm bruce lee', Object.keys(this.props.assets).length);

    return this.props.assets.map((x, i) => {
      console.log('jm', x, i);
      return (
        <TouchableHighlight key={i} onPress={() => this.onSelectAsset(i)}>
          <AssetCard asset={x} />
        </TouchableHighlight>
      );
    });
  };

  render() {
    let assetList = this.renderAssets();
    if (Object.keys(this.props.assets).length < 1) {
      return (
        <View style={styles.bigScreenMessage}>
          <Text>You do not have access to any assets right now.</Text>
          <TouchableHighlight
          onPress={() => {this.props.navigation.navigate("RegAssetSplash1")}}
          >
          <View style={[{ flexDirection: 'row', alignItems:'center' }]}>
            <Text>Create one</Text>
            <Icon
              name={"plus-circle-outline" }
              size={32}
              color={ColorConstants.MainBlue}
            />
          </View>
          </TouchableHighlight>
        </View>
      )
    }
    else {
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
            onPress={() => {
              this.props.SelectedAsset(item.item)
              this.props.GetAssetDef(item.item.hashes.ipfsHash)
              this.props.navigation.navigate("SupplyChainSideChoice")
            }}
            >
            <AssetCard asset={item.item} />
            </TouchableHighlight>
          );
        }}
        />

        </View>

        {/*  <AssetPasswordModal
          // heading={'Enter Asset Password'}
          isVisible={this.props.showPasswordModal}
          passwordCorrect={this.passwordCorrect}
          // ShowPasswordModal={this.props.ShowPasswordModal}
          /> */}
          </View>
        );
    }
  }
}

const mapStateToProps = state => ({
  assets: state.AssetReducers.assets,
  // selectedAsset: state.AssetReducers.selectedAsset,
  assetFetched: state.AssetReducers.assetFetched,
  // showPasswordModal: state.AssetReducers.showPasswordModal
});

const mapDispatchToProps = dispatch => ({
  // ShowAssetPasswordModal: () => dispatch(ShowAssetPasswordModal()),
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
