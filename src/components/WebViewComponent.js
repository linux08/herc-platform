import React, { Component } from 'react';
import { Platform, WebView, Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import hiprLogo from "../assets/hiprLogo.png";


export default class WebViewComponent extends Component {
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
      headerText: {
        fontFamily: "dinPro",
        fontSize: 26,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginTop: 2,
      },
    })

    return {
      headerTitle:(
        <View style={headerStyles.header__container}>
          <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => navigation.navigate("MenuOptions")}>
            <View style={headerStyles.header__container__centeredBox}>
              <View style={headerStyles.header__text__box}>
                <Text style={headerStyles.headerText}>Factom Explorer</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      )}

    }

  constructor(props) {
      super(props);
      this.state = {
          // url: Object.values(this.props.url) || ["Data Loading","Please Be Patient"]
      }
  }

  render() {
    let data = this.props.navigation.getParam('data')
    console.log('Data passed into a WebView Component:', data)
    let url;
    if (data.factomChain){
      url = "https://explorer.factom.com/chains/" + data.factomChain +"/entries/" + data.factomEntry
    }
    return (
      <WebView
        source={{ uri: url }}
        style={{ margin: 0, padding: 0, flex: 1, width: '100%' }}
      />
    )
  }
}
