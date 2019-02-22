import React, { Component } from 'react';
import { Platform, WebView, Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
// import hiprLogo from "../assets/hiprLogo.png";


export default class WebViewComponent extends Component {
  
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


export function CardCostDisplay(props) {

    return (
        <View style={[localStyles.textFieldContainer, { backgroundColor: ColorConstants.MainBlue }]}>
            <Text style={localStyles.labelText}>Amount</Text>

            <View style={localStyles.flexRow}>
                <Text style={[localStyles.costFieldAmount, { color: 'white'}]}>{props.amount}</Text>
                <Image source={hercpngIcon} style={{ height: 20, width: 20, borderRadius: 20, resizeMode: 'contain' }} />
            </View>
        </View>

    )

}