import { combineReducers } from 'redux';
// import Assets from './Assets';
import Web3Reducers from './Web3Reducers';
import AssetReducers from './AssetReducers';
import RegAssetReducers from '../features/RegisterAssetFlow/RegAssetReducers';
import TransactionDataReducers from './TransactionDataReducers';
import WalletActReducers from './WalletActReducers';
import EDIT from '../constants/Edi-T-Sets';
import ModalVisibilityReducers from "./ModalVisibilityReducers"
const rootReducer = combineReducers({
  AssetReducers,
  // Assets,
  // TransactionDataReducers,
  RegAssetReducers,
  ModalVisibilityReducers,
  Web3Reducers,
  WalletActReducers,
  EDIT
})

export default rootReducer
