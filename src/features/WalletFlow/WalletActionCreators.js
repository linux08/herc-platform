import * as Wallet from './WalletActionNames';

import store from "../../store";
import firebase from "../../constants/Firebase";
const rootRef = firebase.database().ref();
import DEVELOPERS from '../../components/settings';

 export function UpdateBalances(newBalances) {
      return {
        type: Wallet.Action.UpdateBalances,
        newBalances
      };
    }

export function GetEthAddress(ethereumAddress) {
    return {
      type: Wallet.Action.GetEthAddress,
      ethereumAddress
    };
  }


function CheckIfNoHercs(wallet) {
  if (!wallet.balances['HERC']){
    return {
      type: Wallet.Action.CheckIfNoHercs,
      noHercs: true
    }
  }
  else {
    return {
      type: Wallet.Action.CheckIfNoHercs,
      noHercs: false
    }
  }
}

export function GetWallet(wallet) {
  store.dispatch(CheckIfNoHercs(wallet))
  return {
      type: Wallet.Action.GetWallet,
      wallet
  }
}

export function GetBalance() {
    return {
        type: Wallet.Action.GetBalance
    }
}


export function ClearTransactionStore() {
  console.log("jm clearing transaction store.... 1/2")
  return {
    type: Wallet.Action.ClearTransactionStore
  };
}


export function SwitchWallet(walletName) {
    return {
        type: Wallet.Action.SwitchWallet,
        data: walletName
    }
}

export function AddWallet(walletObject) {
    return {
        type: Wallet.Action.AddWallet,
        data: walletObject

    }
}

export function CreditTrans(amount) {
  // this action is unlisted
    return {
        type: Wallet,
        hercAmount: amount
    }
}


export function CheckBalance(price) {
let wallet = store.getState().WalletReducers.wallet
let account = store.getState().AccountReducers.account
    console.log("Checking Balances, circumventing dev check")
    if (DEVELOPERS.includes(this.props.edgeAccount)) {
        // this is a developer
        console.log("You are a developer. jm")
    //   dispatch(godMode)
    } else {
        console.log("jm checkbalance()", this.props.wallet.balances.HERC)
        // debugger;
        // this is a non-developer
        console.log("You are NOT a developer. jm")
        let price = new BigNumber(1000)

        let weibalance = new BigNumber(this.props.wallet.balances.HERC)
        //  Balance is stored as wei, converting to HERCS for check
        let convertBalance = weibalance.times(1e-18);
        // this is the math after converting the user balance to eth from wei
        let convertMath = convertBalance.minus(price);

        console.log(
            'do you have enough?', convertMath.isPositive(),
            "convertBalance" + convertBalance,
            "convertMath:" + convertMath
        );
// return a boolean? just need confirmation that the balance is enough.

        // if (convertMath.isNegative()) {
        //     Alert.alert(
        //         'Insufficient Funds',
        //         'Current Balance: ' + convertBalance.toFixed(12) + ' HERC',
        //         [
        //             { text: 'Top Up Hercs', onPress: () => Linking.openURL("https://purchase.herc.one/"), style: 'cancel' },
        //             { text: 'Ok', onPress: () => console.log('OK Pressed') },
        //         ],
        //         { cancelable: true }
        //     )
        // } else {
        //     Alert.alert(
        //         'You Meet the Minimum Balance!',
        //         'Current Balance:' + convertBalance.toFixed(12) + ' HERC \n Do you wish to proceed?',
        //         [
        //             { text: 'Cancel', onPress: () => console.log('No Pressed'), style: 'cancel' },
        //             { text: 'Yes, Make an Asset', onPress: () => this.uploadImageAsync() },
        //         ],
        //         { cancelable: false }
        //     )
        // }
    }
}




export function MakePayment(makePaymentObject) {
    return async dispatch => {
      console.log("jm makePaymentObject", makePaymentObject)
      if (DEVELOPERS.includes(store.getState().WalletActReducers.edge_account)){

        store.dispatch(StoreTransactionIds({burnTransaction: "madeUpBurnTransactionID", dataFeeTransaction: "madeUpdataFeeTransactionID"}));
        dispatch({type:TRANS_COMPLETE})
      } else {

        const burnSpendInfo = {
          networkFeeOption: "standard",
          currencyCode: "HERC",
          metadata: {
            name: "Transfer From Herc Wallet",
            category: "Transfer:Wallet:Network Fee"
          },
          spendTargets: [
            {
              publicAddress: TOKEN_ADDRESS,
              nativeAmount: makePaymentObject.networkFee
            }
          ]
        };
        const dataFeeSpendInfo = {
          networkFeeOption: "standard",
          currencyCode: "HERC",
          metadata: {
            name: "Transfer From Herc Wallet",
            category: "Transfer:Wallet:Data Fee"
          },
          spendTargets: [
            {
              publicAddress: "0x1a2a618f83e89efbd9c9c120ab38c1c2ec9c4e76",
              nativeAmount: makePaymentObject.dataFee
            }
          ]
        };
        // catch error for "ErrorInsufficientFunds"
        // catch error for "ErrorInsufficientFundsMoreEth"
        let wallet = store.getState().WalletActReducers.wallet;
        try {
          let burnTransaction = await wallet.makeSpend(burnSpendInfo);
          await wallet.signTx(burnTransaction);
          await wallet.broadcastTx(burnTransaction);
          await wallet.saveTx(burnTransaction);
          console.log("jm Sent burn transaction with ID = " + burnTransaction.txid);

          let dataFeeTransaction = await wallet.makeSpend(dataFeeSpendInfo);
          await wallet.signTx(dataFeeTransaction);
          await wallet.broadcastTx(dataFeeTransaction);
          await wallet.saveTx(dataFeeTransaction);
          console.log(
            "jm Sent dataFee transaction with ID = " + dataFeeTransaction.txid
          );

          if (burnTransaction.txid && dataFeeTransaction.txid) {
            store.dispatch(StoreTransactionIds({burnTransaction: burnTransaction.txid, dataFeeTransaction: dataFeeTransaction.txid}));
            dispatch({type:TRANS_COMPLETE})

          }
        } catch (e) {
          console.log("jm error", e)
        }
      }
    }
  }


  //  not sure we're using this
// export function DebitTrans(amount) {
//     return {
//         type: Wallet.Action.DebitTrans,
//         hercAmount: amount
//     }
// }

//   not sure we're using this
// export function DeleteWallet(walletName) {

//     return {
//         type: Wallet.Action.DeleteWallet,
//         data: walletName

//     }
// }
