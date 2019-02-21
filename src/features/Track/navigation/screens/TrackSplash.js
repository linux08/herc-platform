import { View, StatusBar, TouchableHighlight, FlatList } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { AssetCard } from "../../../../AssetCard";
import {
  ShowAssetPasswordModal,
  SelectedAsset
} from "../../features/SupplyChainFlow/Assets/AssetActionCreators";

import AssetPasswordModal from "../../components/modals/AssetPasswordModal";

// import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

class TrackSplash extends Component {
  constructor(props) {
    super(props);
    console.log("componentTest");
  }

  passwordCorrect = () => {
    this.props.ShowAssetPasswordModal();
    this.props.navigation.navigate("TrackSideChoice");
  };


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
            keyExtractor={item => item.Logo}
            renderItem={item => {
              return (
                <TouchableHighlight
                  key={item.item.Name}
                  onPress={() => this.props.SelectedAsset(item.item)}
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
  SelectedAsset: asset => dispatch(SelectedAsset(asset))
});

export default connect(mapStateToProps,mapDispatchToProps)(SupplyChainSplash);

