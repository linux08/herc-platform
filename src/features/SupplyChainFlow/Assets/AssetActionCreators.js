import * as Asset from './AssetActionNames';

import axios from 'axios';
import store from "../../../store";
import firebase from "../../../constants/Firebase";
const rootRef = firebase.database().ref();
const assetRef = rootRef.child("assets");


export function ShowPasswordModal(isViz) {
    return {
        type: Asset.Action.ShowPasswordModal,
        isVisible: isViz
    }
}

export function GetHeaders(userName) {
    console.log('gettingHeaders,')
    return dispatch => {
        let assetHeaders = [];
        assetRef.once("value")
            .then(snapshot => {
                snapshot.forEach(asset => {
                    assetHeaders.push(
                        asset.toJSON()
                        // ipfsHash: asset.toJSON().ipfsHash,
                        // chainId: asset.toJSON().chainID
                    );
                })
            }).then(() => {
                dispatch(GotHeaders(assetHeaders))
            })
    }
}

function GotHeaders(assetList) {
    return (
        {
            type: Asset.Action.GotHeaders,
            assets: assetList
        }
    )
}
 

export function SelectedAsset(asset) {
    return {
        type: Asset.Action.SelectedAsset,
        selectAsset: asset
    }
}

export function GettingAssetIpfsDefintion(ipfsHash) {
    getAssetDef(ipfsHash);
    return {
        type: Asset.Action.GettingAssetIpfsDefintion
    }
}


function getAssetDef(ipfsHash) {
    return dispatch => {
        let singleHash = ipfsHash;
        axios.get(WEB_SERVER_API_IPFS_GET, { params: singleHash })
            .then(response => {
                let assetDef = response.data[0];
                dispatch(GotAssetDef(assetDef))
            })
            .catch(error => {
                dispatch(Error(error)),
                    console.log(err)
            })
    }
}

export function GotAssetIpfsDefinition(assetDef) {
    return {
        type: Asset.Action.GotAssetIpfsDefinition,
        ipfsDef: assetDef
    };
}

export function Error(error) {
    return {
        type: Asset.Action.Error,
        Error: error
    };
}