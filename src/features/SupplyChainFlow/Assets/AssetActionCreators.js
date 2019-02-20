import * as Asset from './AssetActionNames';

import {
    WEB_SERVER_API_IPFS_GET,
    WEB_SERVER_API_IPFS_ADD,
    WEB_SERVER_API_FACTOM_CHAIN_ADD,
    WEB_SERVER_API_FACTOM_ENTRY_ADD,
    WEB_SERVER_API_STORJ_UPLOAD,
    WEB_SERVER_API_CSV,
    WEB_SERVER_API_UPLOAD_DOCUMENT,
    TOKEN_ADDRESS,
    DEVELOPERS
  } from '../../../components/settings';

import axios from 'axios';
import store from "../../../store";
import firebase from "../../../constants/Firebase";
const rootRef = firebase.database().ref();
const assetRef = rootRef.child("assets");


export function ShowAssetPasswordModal(isViz) {
    return {
        type: Asset.Action.ShowAssetPasswordModal,
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
    return (
        {
            type: Asset.Action.SelectedAsset,
            selectAsset: asset
        }
    )
}

export function GettingAssetIpfsDefintion(ipfsHash) {
    getAssetDef(ipfsHash);
    return {
        type: Asset.Action.GettingAssetIpfsDefintion
    }
}


async function getAssetDef(ipfsHash) {
    try {
        let response = await axios.get(WEB_SERVER_API_IPFS_GET, { params: ipfsHash });
        let assetDef = response.data[0];

        store.dispatch(GotAssetIpfsDefinition(assetDef))

    } catch (error) {
        store.dispatch(Error(error)),
            console.log(error)
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
