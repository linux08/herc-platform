import { combineReducers } from 'redux';
// import Assets from './Assets';
// import Web3Reducers from '../oldFiles/Web3Reducers';
// import AssetReducers from './AssetReducers';
import RegAssetReducers from '../features/RegisterAssetFlow/RegAssetReducers';
import AssetReducers from '../features/SupplyChainFlow/Assets/AssetReducers';
import TransactionReducers from '../features/SupplyChainFlow/Transactions/TransactionReducers';
import WalletReducers from '../features/WalletFlow/WalletReducers'
import AccountReducers from '../features/AccountFlow/AccountReducers'
import EDIT from '../constants/Edi-T-Sets';
import CamSourceModalReducer from "../features/CamSourceModal/CamSourceModalReducers"

const rootReducer = combineReducers({
  AssetReducers,
  // Assets,
  // TransactionDataReducers,
  RegAssetReducers,
  CamSourceModalReducer,
  TransactionReducers,
  AccountReducers,
  // Web3Reducers,
  WalletReducers,
  EDIT
})

export default rootReducer
