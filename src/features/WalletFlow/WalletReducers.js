import * as Wallet from "./WalletActionNames";

const INITIAL_STATE = {
  transactionIdStore: null
};

export default WalletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case Wallet.Action.UpdateBalances:
      console.log("UPDATEBALANCES: chance getting balance", action.newBalances);
      return {
        ...state,
        watchBalance: action.newBalances
      };

    case Wallet.Action.GetEthAddress:
      let ethereumAddress = action.ethereumAddress;
      return Object.assign({}, state, {
        ...state,
        ethereumAddress: ethereumAddress
      });

    case Wallet.Action.GetWallet:
      let wallet = action.wallet;
      return Object.assign({}, state, {
        ...state,
        wallet
      });

    case  Wallet.Action.GetBalance:
      console.log("GET_BALANCE: getting balance", state);
      return {
        ...state
      };

    case Wallet.Action.ClearTransactionStore:
      console.log("jm clearing transactionstore 2/2");
      return {
        ...state,
        transactionIdStore: null
      };

    case Wallet.Action.SwitchWallet:
      console.log("getting balance", state);
      return {
        ...state,
        currentWallet: action.data.coin,
        balance: action.data.balance
      };

    default:
      return state;
  }
};


//   Not using this....YET
    // case Wallet.Action.DeleteWallet:
    //   console.log("getting balance", state, action, "state actions");
    //   let trimmedWallet = delete state.wallets[action.data.walletName];
    //   console.log(trimmedWallet, "trimmedWallet");
    //   return {
    //     ...state,
    //     wallets: trimmedWallet
    //   };

    // case Wallet.Action.AddWallet:
    //   console.log("adding Wallet", action);
    //   let coinName = action.data.currency;
    //   let balance = 0.0;
    //   return {
    //     ...state,
    //     wallets: {
    //       ...state.wallets,
    //       [coinName]: {
    //         balance: balance
    //       }
    //     }
    //   };

     // case DEBIT_TRANS:
    //   console.log("DEBIT_TRANS: updating balance", action.hercAmount);
    //   let newBalance = state.currentBalance - action.hercAmount;
    //   console.log(newBalance, "newBalance");
    //   return {
    //     ...state,
    //     currentBalance: newBalance,
    //     balance: newBalance
    //   };
