import { View, StatusBar, TouchableHighlight, FlatList } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { AssetCard } from "../../../../components/AssetCard";
import {
  ToggleAssetPasswordModal,
  SelectedAsset,
  GetHeaders
} from "../../../SupplyChainFlow/Assets/AssetActionCreators";

import AssetPasswordModal from "../../../../components/modals/AssetPasswordModal";
import styles from '../../../../assets/styles';
// import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

class TrackSplash extends Component {
  constructor(props) {
    super(props);
    console.log("TrackSplash");
  }

  componentWillMount = () => {
    this.props.GetHeaders();
  }

  // noAssetPassword = ( asset ) => {
  //   this.props.SelectedAsset(asset);
  //   this.props.navigation.navigate('TrackSideChoice')
  // }


  passwordCorrect = () => {

    this.props.ToggleAssetPasswordModal();
    this.props.navigation.navigate("TrackSideChoice");
  };


  render() {
    let assets = Object.keys(this.props.assets).map(x => this.props.assets[x])
    return (
      <View style={styles.baseContainer}>
        <StatusBar
          barStyle={"light-content"}
          translucent={true}
          backgroundColor="transparent"
        />
        <View style={styles.bodyContainer}>
          <FlatList
            data={assets}
            keyExtractor={item => item.key}
            renderItem={(item) => {
              return (
                <TouchableHighlight
                  key={item.key}
                  onPress={() => this.props.SelectedAsset(item.item)}
                >
                  <AssetCard key={item.key} asset={item.item} />
                </TouchableHighlight>
              );
            }}
          />


        </View>

        <AssetPasswordModal
          isVisible={this.props.showPasswordModal}
          passwordCorrect={this.passwordCorrect}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  assets: state.AssetReducers.assets,
  selectedAsset: state.AssetReducers.selectedAsset,
  showPasswordModal: state.AssetReducers.showPasswordModal
});

const mapDispatchToProps = dispatch => ({
  ToggleAssetPasswordModal: () => dispatch(ToggleAssetPasswordModal()),
  SelectedAsset: asset => dispatch(SelectedAsset(asset)),
  GetHeaders: () => dispatch(GetHeaders())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackSplash);

