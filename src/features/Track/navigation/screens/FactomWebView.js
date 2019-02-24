import React, { Component } from 'react';
import { Platform, WebView, Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class FactomWebView extends Component {

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
    if (data.factomChain) {
      url = "https://explorer.factom.com/chains/" + data.factomChain + "/entries/" + data.factomEntry
    }
    return (
      <WebView
        source={{ uri: url }}
        style={{ margin: 0, padding: 0, flex: 1, width: '100%' }}
      />
    )
  }
}