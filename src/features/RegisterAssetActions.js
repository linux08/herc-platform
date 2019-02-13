import {
  GOT_HERC_ID,
  ADD_ASSET,
  SETTING_HEADER,
  SETTING_HEADER_COMPLETE,
  SETTING_HEADER_ERROR,
  IPFS_ERROR,
  REG_ASSET_T0_IPFS_STARTED,
  REG_IPFS_COMPLETE,
  REG_ASSET_IPFS_TO_FACTOM_STARTED,
  REG_ASSET_FACTOM_COMPLETE,
  FACTOM_ERROR,
  CONFIRM_ASSET_COMPLETE,
  INC_HERC_ID,
  CLEAR_STATE,
  GETTING_HERC_ID,
  FIREBASE_HASHES_ERROR,
} from './registerAssetActionTypes';

import firebase from "../constants/Firebase";
import store from '../store';
import axios from 'axios';
// const edgeAccount = store.getState().WalletActReducers.edge_account
const rootRef = firebase.database().ref();
const assetRef = rootRef.child("assets");

import {
  WEB_SERVER_API_IPFS_ADD,
  WEB_SERVER_API_FACTOM_CHAIN_ADD,
} from '../components/settings'

export function getHercId() {
  console.log('getting hercID');
  grabHercId();
  return {
    type: GETTING_HERC_ID
  }
}

async function grabHercId() {
  const snapshot = await rootRef
    .child("hercID")
    .once("value");

  console.log(snapshot.toJSON(), "snapshot to json");
  store.dispatch(gotHercId(snapshot.toJSON()));
}



export function gotHercId(hercId) {
  console.log('GotHercId: ', hercId)
  return {
    type: GOT_HERC_ID,
    hercId: hercId
  };
}

export function incHercId() {
  let hercIdPlus1 = store.getState().RegisterAssetReducers.hercId + 1;
  rootRef.child("hercID").set(hercIdPlus1);
  return {
    type: INC_HERC_ID,
    hercId: hercIdPlus1
  }
}

// Adding the new, yet to be confirmed, Asset to redux, will map on Confirm
export function addAsset(newTempAsset) {
  console.log(newTempAsset, "in regAsstActions")
  let newAsset = newTempAsset;
  return {
    type: ADD_ASSET,
    newAsset: newAsset
  };
}

export function clearState() {
  return {
    type: CLEAR_STATE
  };
}
// payment trigger in actions too? after reg complete?
// fire the payment?

//  rearranging the redux a little, trying to simplify
//  assetForFirebase will be Name, hercID, Logo, Password 

// this is the start of it 
export function settingHeader() {
  fetchLocalUri();
  return {
    type: SETTING_HEADER
  }
}


async function fetchLocalUri() {

  console.log("should error");
  let newAsset = store.getState().RegisterAssetReducers.newAsset;
  let uri = newAsset.LogoUri;
  console.log(uri, "right before fetch")
  const response = await fetch(uri);
  setLogoLocation(response);

}


async function setLogoLocation(fetchUri) {
  const edgeAccount = 'hercstack'; // hardcoding for now, to escape login while testing.
  // const edgeAccount = store.getState().WalletActReducers.edge_account;
  let newAsset = store.getState().RegisterAssetReducers.newAsset;

  let logoLocation = firebase.storage().ref('assets')
    .child(edgeAccount)
    .child(newAsset.Name)
    .child("Logo");

  try {
    const blob = await fetchUri.blob();
    const snapshot = await logoLocation.put(blob);

    makeAndSetHeader(snapshot.downloadURL);
    createIpfsAsset(newAsset);
  }
  catch (error) {
    store.dispatch(settingHeaderError(error))
  }

}

function createIpfsAsset(newAsset) {
  const ipfsAsset = Object.assign({}, {
    Name: newAsset.Name,
    CoreProps: newAsset.CoreProps,
    hercId: newAsset.hercId,
  });

  newAssetToIpfs(ipfsAsset);

}


function makeAndSetHeader(logoUrl) {
  let newAsset = store.getState().RegisterAssetReducers.newAsset;

  const fbAsset = {
    hercId: newAsset.hercId,
    Name: newAsset.Name,
    Logo: logoUrl,
    Password: newAsset.Password
  }
  console.log("making and setting header", newAsset)
  try {
    assetRef.child(newAsset.Name).set(fbAsset)
      .then(() =>
        store.dispatch(settingHeaderComplete()))
  }
  catch (error) {
    store.dispatch(settingHeaderError(error))
  }


}


export function settingHeaderComplete() {
  store.dispatch(incHercId());
  return {
    type: SETTING_HEADER_COMPLETE,
  }
}


export function settingHeaderError(error) {
  return {
    type: SETTING_HEADER_ERROR,
    error
  }
}

export function regAssetToIpfsStarted() {
  return {
    type: REG_ASSET_T0_IPFS_STARTED,
  }
}



export async function newAssetToIpfs(assetForIPFS) {
  store.dispatch(regAssetToIpfsStarted())
  let asset = assetForIPFS;
  console.log(asset, "trying to send to IPFS")
  // let username = store.getState().WalletActReducers.edge_account
  var dataObject = { key: 'asset', data: asset }
  console.log(dataObject, "this is whats going")
  try {
    let response = await axios.post(WEB_SERVER_API_IPFS_ADD, JSON.stringify(dataObject))
    console.log("1/3 ipfsHash: ", response)
    let ipfsHash = response.data.hash;
    ipfsToFactom(ipfsHash);

    store.dispatch(regIpfsComplete(ipfsHash))
    // return ipfsHash
  }
  catch (error) {
    store.dispatch(ipfsError(error))
  }

}

export function ipfsError(error) {
  return {
    type: IPFS_ERROR,
    error: error
  }

}

export function regIpfsComplete(hash) {
  return {
    type: REG_IPFS_COMPLETE,
    ipfsHash: hash
  }

}

export function regAssetIpfsToFactomStarted() {
  return {
    type: REG_ASSET_IPFS_TO_FACTOM_STARTED
  }

}

async function ipfsToFactom(hash) {
  store.dispatch(regAssetIpfsToFactomStarted())
  var dataObject = JSON.stringify({ ipfsHash: hash })
  /* This part creates a new factom chain */
  try {
    const response = await axios.post(WEB_SERVER_API_FACTOM_CHAIN_ADD, dataObject)
    console.log("2/3 web server factom response: ", response)
    var fctChainId = response.data;
    store.dispatch(regAssetFactomComplete(fctChainId));

    var hashesForFirebase = {
      chainId: fctChainId,
      ipfsHash: hash
    }

    console.log(hashesForFirebase, "hash check");
    hashesToFirebase(hashesForFirebase);

  } catch (error) {
    store.dispatch(factomError(error))
  }

}

export function hashesToFirebase(hashes) {
  let newAssetName = store.getState().RegisterAssetReducers.newAsset.Name;
  let dataObject = Object.assign({}, {
    chainId: hashes.chainId,
    ipfsHash: hashes.ipfsHash,
    organizationName: 'H3RCUL3S'

  }) // organizationName hard-coded for 0.9.5 in preparation for igvc.eth platform

  console.log("3/3 going into firebase: ", dataObject, "name: ", newAssetName);
  try {
    rootRef.child('assets')
      .child(newAssetName)
      .child('hashes')
      .set(dataObject)
      .then(() =>
      store.dispatch(confirmAssetComplete()));

  } catch (error) {
    store.dispatch(firebaseHashesError(error))

  }
}
// Charge them now? make the payment?
// store.dispatch(getAssets());



export function regAssetFactomComplete(hash) {
  return {
    type: REG_ASSET_FACTOM_COMPLETE,
    chainId: hash
  }

}

export function factomError(err) {
  return {
    type: FACTOM_ERROR,
    error: err
  }
}


export function firebaseHashesError(error) {
  return {
    type: FIREBASE_HASHES_ERROR,
    err: error
  }
}
export function confirmAssetComplete() {
  // store.dispatch(getAssets());
  return {
    type: CONFIRM_ASSET_COMPLETE
  }
}

