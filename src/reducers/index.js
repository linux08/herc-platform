import { combineReducers } from 'redux';
// import Assets from './Assets';
import Web3Reducers from './Web3Reducers';
import AssetReducers from './AssetReducers';
import TransactionDataReducers from './TransactionDataReducers';
import WalletActReducers from './WalletActReducers';
import EDIT from '../constants/Edi-T-Sets';
import ModalVisibilityReducer from "./ModalVisibilityReducer"
const rootReducer = combineReducers({
  AssetReducers,
  // Assets,
  // TransactionDataReducers,
  ModalVisibilityReducer,
  Web3Reducers,
  WalletActReducers,
  EDIT
})

export default rootReducer
