import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import hiprLogo from "../assets/hiprLogo.png";
import { getAssetDef, selectAsset } from "../actions/AssetActions";
import styles from '../assets/styles';


class HiprAssets extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    let headerStyles = StyleSheet.create({
      header__container: {
        display: "flex",
        height: 80,
        alignSelf: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
        paddingBottom: 20
      },
      header__container__centeredBox: {
        height: "100%",
        alignItems: "center",
        flexDirection: 'row'
      },
      header__text__box: {
        height: "100%",
        marginBottom: 5,
        marginLeft: 12,
      },
      header__image__box: {
        height: "100%",
        borderRadius: 100
      },
      assetHeaderLogo: {
        height: 35,
        width: 35,
        borderRadius: 50,
      },
      headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "normal",
        color: "black",
        textAlign: "center",
        marginTop: 2,
      },
    })

    return {
      headerTitle: (

        <View style={headerStyles.header__container}>
          <View style={headerStyles.header__container__centeredBox}>
            <View style={headerStyles.header__image__box}>
              <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => navigation.navigate("MenuOptions")}>
                <Image
                  style={headerStyles.assetHeaderLogo}
                  source={hiprLogo}
                />
              </TouchableHighlight>
            </View>
            <View style={headerStyles.header__text__box}>
              <Text style={headerStyles.headerText}>Validate</Text>
            </View>
          </View>
        </View>
      ),
      headerTitleStyle: {
        height: 50,
        width: 200,
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: 20
      }
    };
  };
  constructor(props) {
    super(props);
  }

  _onPress = (asset) => {
    this.props.selectAsset(asset);
    if (asset.hashes.ipfsHash) { // this gets the ipfsHash Def
      this.props.getAssetDef(asset.hashes.ipfsHash);
    }

    const { navigate } = this.props.navigation;
    navigate('HiprTransactions', { asset: asset });
  }

  render() {
    console.log('HiprAssets :', this.props, )
    let list = this.props.assets.map((asset, index) => {
      return (
        <TouchableHighlight style={{ borderRadius: 2 }} key={index} onPress={() => this._onPress(asset)}>
          <View style={localStyles.menuItemField}>
            <Image style={localStyles.assetLogo} source={{ uri: asset.Logo }} />
            <View style={localStyles.menuItemField__textBox}>
              <Text style={localStyles.assetLabel}>{asset.Name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.containerCenter}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {list}
          </ScrollView>
        </View>
      </View>
    )
  };
}

const mapStateToProps = (state) => ({
  assets: state.AssetReducers.assets,
});
const mapDispatchToProps = dispatch => ({
  selectAsset: asset => dispatch(selectAsset(asset)),
  getAssetDef: assetIpfsHash => dispatch(getAssetDef(assetIpfsHash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HiprAssets);

const localStyles = StyleSheet.create({
  createNew__Box: {
    flexDirection: "row",
    width: 200,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: "center",
    alignContent: "center",
    marginTop: 100,
    paddingLeft: 5,
  },
  menuItemField: {
    display: "flex",
    flexDirection: "row",
    width: 240,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 15,
    paddingLeft: 3,
  },
  assetLogo: {
    height: 25,
    width: 25,
    marginLeft: 2,
    borderRadius: 25 / 2,
    alignSelf: "center"
  },
  assetLabel: {
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
    margin: 2,
    fontFamily: "dinPro"
  },
  menuItemField__textBox: {
    flex: 1
  },
});
