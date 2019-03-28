import React, {Component} from 'react';
import { StyleSheet, Button, Text, TextInput, ScrollView, ActivityIndicator, Modal, View, Image, TouchableHighlight, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../assets/styles';
import hiprLogo from "../assets/hiprLogo.png";

export default class HiprTransactions extends Component {
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

  componentDidMount() {}

  _onPress(transaction){
    const { navigate } = this.props.navigation;
    navigate('Hipr', { transaction: transaction });
  }

  render(){
    let assets = this.props.navigation.getParam('asset') // TODO: add error handling for empty param
    let transactions = assets.transactions

    let list = Object.keys(transactions).map((transaction, index) => {
      return (
        <TouchableHighlight style={{ borderRadius: 2 }} key={index} onPress={() => this._onPress(transactions[transaction])}>
          <View style={localStyles.menuItemField}>
            <View style={localStyles.menuItemField__textBox}>
              <Text style={localStyles.assetLabel}>{transactions[transaction].header.dTime}</Text>
              <Text style={localStyles.assetLabel}>{transactions[transaction].header.tXLocation}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });

    return(
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

const localStyles = StyleSheet.create({
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
    flex: 1,
  },
});
