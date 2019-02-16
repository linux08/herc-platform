import * as Asset from './AssetActionNames';
import axios from 'axios';
import store from "../../../store";
import firebase from '../../../constants/Firebase';
const rootRef = firebase.database().ref();


const INITIAL_STATE = {
    selectedAsset: {},
    assets: []
}

const AssetReducers = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case Asset.Action.ClearState:
            return INITIAL_STATE

        case Asset.Action.GotHeaders:
            console.log("getHeader reducer", action)
            let assetHeaders = action.assets;
            return Object.assign({}, state, {
                ...state,
                assets: assetHeaders
            })

        case Asset.Action.GettingAssetIpfsDefinfition:
            return {
                assetDefFetching: true
            }

        case Asset.Action.GotAssetIpfsDefinition:
            return Object.assign({}, state, {
                ...state,
                selectedAsset: {
                    ...state.selectedAsset,
                    ipfsDef: action.ipfsDef
                }
            })

        case Asset.Action.Error:
            return Object.assign({}, {
                ...state,
                Error: {
                    error: action.Error,
                    type: action.type
                }
            })

        case Asset.Action.SelectedAsset:

            return Object.assign({}, state, {
                ...state,
                assetFetched: true,
                selectedAsset: action.selectAsset
            })

        default:
            return {
                ...state
            }
    }
};

export default AssetReducers;