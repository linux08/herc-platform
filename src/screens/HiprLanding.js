import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Alert, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import styles from '../assets/styles';
// import leaderBrd from '../assets/leaderBrdBtn.png';
import info from "../components/buttons/infoBtn.png"; // todo: turn into vector
import begin from "../components/buttons/beginBtn.png"; // todo: turn into vector
import hiprLogo from "../assets/hiprLogo.png";
import hiprText from "../assets/hiprText";

export default class HiprLanding extends Component {

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
                source={hiprLogo}
              />
            </View>
            <View style={headerStyles.header__text__box}>
              <Text style={headerStyles.headerText}>Validate</Text>
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
    this.setState({ info: !this.state.info })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={[styles.containerCenter, { paddingTop: 59 }]}>

          <View style={localStyles.copyContainer}>
            <Text style={localStyles.copy}>{[hiprText]}</Text>
          </View>

          {/* <TouchableHighlight onPress={() => this._toggleShow()}>
            <Image source={info} style={localStyles.menuButton} />
          </TouchableHighlight> */}

          <View style={{ paddingTop: "20%" }}>

            <TouchableHighlight onPress={() => navigate('HiprAssets')}>
              <Image source={begin} style={localStyles.menuButton} />
            </TouchableHighlight>
          </View>

        </View>
      </View>

    )
  };
}


const localStyles = StyleSheet.create({
  headerField: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-around",
    alignItems: "center"
  },
  hercLogoHeader: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 3,
  },
  registerHeaderText: {
    fontFamily: "dinPro",
    height: 50,
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "normal",
    color: "black",
    textAlign: "center"
  },
  menuButton: {
    width: 200,
    height: 45,
    marginBottom: 25,
    resizeMode: "contain",
    borderRadius: 2,
  },
  copyContainer: {
    width: '90%',
  },
  copy: {
    fontFamily: "dinPro",
    textAlign: "center",
    fontSize: 18,
    color: "silver",
    textAlign: "center"
  }
})
