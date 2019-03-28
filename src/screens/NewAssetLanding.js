import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Alert, YellowBox } from 'react-native';
import logo from "../assets/round.png";
import begin from "../components/buttons/beginBtn.png"; // todo: turn into vector
import info from "../components/buttons/infoBtn.png" // todo: turn into vector
import styles from "../assets/styles";

export default class NewAssetLanding extends Component {

  static navigationOptions = ({ navigation }) => {
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

              <Image
                style={headerStyles.assetHeaderLogo}
                source={logo}
              />
            </View>
            <View style={headerStyles.header__text__box}>
              <Text style={headerStyles.headerText}>Register</Text>
            </View>
          </View>
        </View>
      )
    }
  }
  state = {
    info: false
  }

  _toggleShow = () => {
    this.setState({
      info: !this.state.info
    })
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 59 }]}>
          <Text style={localStyles.copy}>
            Create a New Asset by defining its Name, up to 8 Metrics,
            and choosing a photo. This asset can be unique to either an
            individual part or a batch of a specific item. Be as succinct
            as possible as these asset metrics cannot be redefined later.
          </Text>
          <View style={{paddingTop: "20%"}}>
          <TouchableHighlight onPress={() => navigate('NewAssetForm')}>
            <Image source={begin} style={localStyles.menuButton} />
          </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  };
}


const localStyles = StyleSheet.create({
  menuButton: {
    width: 200,
    height: 45,
    marginBottom: 25,
    resizeMode: "contain",
    borderRadius: 2,
  },
  copyContainer: {},
  copy: {
    fontFamily: "dinPro",
    textAlign: "center",
    fontSize: 18,
    color: "silver",
    textAlign: "center"
  }
})
