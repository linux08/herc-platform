import { View, StatusBar, TouchableHighlight, FlatList } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { AssetCard } from "../../../../components/AssetCard";
import {
  ShowAssetPasswordModal,
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

noAssetPassword = ( asset ) => {
  this.props.SelectedAsset(asset);
  this.props.navigation.navigate('TrackSideChoice')
}


  // passwordCorrect = () => {

  //   this.props.ShowAssetPasswordModal();
  //   this.props.navigation.navigate("TrackSideChoice");
  // };


  render() {
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
            keyExtractor={item => item.Name}
            renderItem={item => {
              return (
                <TouchableHighlight
                  key={item.item.Name}
                  onPress={() => this.noAssetPassword(item.item)}
                >
                  <AssetCard asset={item.item} />
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
  ShowAssetPasswordModal: () => dispatch(ShowAssetPasswordModal()),
  SelectedAsset: asset => dispatch(SelectedAsset(asset)),
  GetHeaders: () => dispatch(GetHeaders())
});

export default connect(mapStateToProps,mapDispatchToProps)(TrackSplash);

