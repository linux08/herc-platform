import * as Wallet from './WalletActionNames';

const INITIAL_STATE = {
    transactionIdStore: null
  }


  const WalletReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

  case UPDATE_BALANCES:
  console.log('UPDATEBALANCES: chance getting balance', action.newBalances);
  return {
      ...state,
      watchBalance: action.newBalances
  }

case GET_ETH_ADDRESS:
 let ethereumAddress = action.ethereumAddress;
 return Object.assign({}, state, {
     ...state,
     ethereumAddress: ethereumAddress
 })

case GET_WALLET:
 let wallet = action.wallet;
 return Object.assign({}, state, {
     ...state,
     wallet
 })

case DEBIT_TRANS:
 console.log('DEBIT_TRANS: updating balance', action.hercAmount);
 let newBalance = (state.currentBalance - action.hercAmount);
 console.log(newBalance, 'newBalance');
 return {
     ...state,
     currentBalance: newBalance,
     balance: newBalance
 }

case GET_BALANCE:
 console.log('GET_BALANCE: getting balance', state);
 return {
     ...state
 }

case ADD_WALLET:
 console.log('adding Wallet', action);
 let coinName = action.data.currency
 let balance = 0.00
 return {
     ...state,
     wallets: {
         ...state.wallets,
         [coinName]: {
             balance: balance
         }
     }
 }

case DELETE_WALLET:
 console.log('getting balance', state, action, "state actions");
 let trimmedWallet = delete state.wallets[action.data.walletName]
 console.log(trimmedWallet, "trimmedWallet")
 return {
     ...state,
     wallets: trimmedWallet
 }


case CLEAR_TRANSACTION_STORE:
console.log("jm clearing transactionstore 2/2")
return {
   ...state,
   transactionIdStore: null
}


case STORE_TRANSACTION_IDS:
console.log("jm transactionIDs in reducer", action.transactionIds)
return {
   ...state,
   transactionIdStore: action.transactionIds
}


case SWITCH_WALLET:
 console.log('getting balance', state);
 return {
     ...state,
     currentWallet: action.data.coin,
     balance: action.data.balance,
 }

 default:
 return state
}
}
