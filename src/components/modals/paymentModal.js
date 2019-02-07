import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal
} from 'react-native';

const PaymentModal = props => {
  const {
    loading,
    ...attributes
  } = props;

return (
  <Modal
    transparent={false}
    animationType={'none'}
    visible={loading}
    onRequestClose={() => {console.log("modal closed")}}
    >
    <View style={styles.modalBackground}>
       <View style={styles.activityIndicatorWrapper}>
         <ActivityIndicator
           animating={loading} size="large" color="#091141"/>
       </View>
     </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

const mapStateToProps = (state) => ({
    account: state.WalletActReducers.account,
    ethereumAddress: state.WalletActReducers.ethereumAddress,
    wallet: state.WalletActReducers.wallet
});

const mapDispatchToProps = (dispatch) => ({
    getEthAddress: (ethereumAddress) =>
      dispatch(getEthAddress(ethereumAddress)),
    getWallet: (wallet) =>
      dispatch(getWallet(wallet)),
    getAccount: (account) =>
      dispatch(getAccount(account))
})
export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
