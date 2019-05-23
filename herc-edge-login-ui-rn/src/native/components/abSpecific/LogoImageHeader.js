// @flow

import React, { Component } from 'react'
import { Image, View, StyleSheet } from 'react-native'

import * as Assets from '../../assets/'

type Props = {
  small?: boolean,
  style: Object
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    width: '80%',
    height: '40%'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: "30%",
    // borderWidth: 3,
    // borderColor: 'green'
  },
});

class LogoImageHeader extends Component<Props> {
  render () {
    let src = Assets.LOGO_BIG
    // let src = Assets.LOGO_BIG
    if (this.props.small) {
      src = Assets.LOGO_SMALL
    }
    return (
      <View style={styles.container}>
        <Image
          source={src}
          style={styles.logo}
        />
      </View>
    )
  }
}
export { LogoImageHeader }
