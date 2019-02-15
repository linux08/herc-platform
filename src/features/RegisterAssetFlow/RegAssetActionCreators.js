
import * as Reg from './RegAssetActionCreators';

import firebase from "../../constants/Firebase";
import store from '../../store';
import axios from 'axios';
// const edgeAccount = store.getState().WalletActReducers.edge_account
const rootRef = firebase.database().ref();
const assetRef = rootRef.child("assets");

import {
  WEB_SERVER_API_IPFS_ADD,
  WEB_SERVER_API_FACTOM_CHAIN_ADD,
} from '../../components/settings';

// One size fits all error handling
export function Error(error) {
  console.log("general purpose error", error)
  return {
    type: Reg.Error,
    Error: error
  }
}

export function ClearState() {
  return {
    type: Reg.ClearState,
  }
}

export function GetHercId() {
  console.log('getting hercID');
  return (dispatch) => {
    return (
      rootRef
        .child("hercID")
        .once("value")
        .then((snapshot) =>
          dispatch(Reg.GotHercId(snapshot.toJSON())))
        .catch((error) => {
          dispatch(Reg.Error(error))
        }
        )
    )
  }
}

export function GotHercId(hercId) {
  console.log('GotHercId: ', hercId)
  return {
    type: Reg.GotHercId,
    hercId: hercId
  };
}

export function IncreaseHercId() {
  let hercIdPlus1 = store.getState().RegAssetReducers.hercId + 1;
  rootRef.child("hercID").set(hercIdPlus1);
  return {
    type: Reg.IncreaseHercId,
    hercId: hercIdPlus1
  }
}

// Adding the new, yet to be confirmed, Asset to redux, will map on Confirm
export function AddAsset(newTempAsset) {
  console.log(newTempAsset, "in regAsstActions")
  let newAsset = newTempAsset;
  return {
    type: Reg.AddAsset,
    newAsset
  };
}

// payment trigger in actions too? after reg complete?
// fire the payment?

//  rearranging the redux a little, trying to simplify
//  assetForFirebase will be Name, hercID, Logo, Password 

export function SettingHeaderInFirebase() {

  // this is the start of registering an asset, this sets 
  // settingHeaderinFirebase and Confirm Started to true.
  fetchLocalUri();
  return {
    type: Reg.SettingHeaderInFirebase

  }
}


async function fetchLocalUri() {
  let newAsset = store.getState().RegAssetReducers.newAsset;
  let uri = newAsset.LogoUri;
  const response = await fetch(uri);

  setLogoLocation(response);

}


async function setLogoLocation(fetchUri) {
  const edgeAccount = 'hercstack'; // hardcoding for now, to escape login while testing.
  // const edgeAccount = store.getState().WalletActReducers.edge_account;
  let newAsset = store.getState().RegAssetReducers.newAsset;

  let logoLocation = firebase.storage().ref('assets')
    .child(edgeAccount)
    .child(newAsset.Name)
    .child("Logo");

  try {
    const blob = await fetchUri.blob();
    const snapshot = await logoLocation.put(blob);
    makeAndSetHeader(snapshot.downloadURL);
    createAndSendIpfsAsset(newAsset);
  }
  catch (error) {
    store.dispatch(Reg.Error(error))
  }

}


function createAndSendIpfsAsset(newAsset) {
  const ipfsAsset = Object.assign({}, {
    Name: newAsset.Name,
    CoreProps: newAsset.CoreProps,
    hercId: newAsset.hercId,
  });

  newAssetToIpfs(ipfsAsset);

}


function makeAndSetHeader(logoUrl) {
  return (dispatch) => {
    let newAsset = store.getState().RegAssetReducers.newAsset;

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
          dispatch(Reg.SettingHeaderComplete()),
          dispatch(Reg.IncreaseHercId())
        );
    }
    catch (error) {
      dispatch(Reg.Error(error))
    }


  }
}


export function SettingHeaderComplete() {
  return {
    type: Reg.SettingHeaderComplete
  }
}




export function RegAssetToIpfsStarted() {
  return {
    type: REG_ASSET_T0_IPFS_STARTED,
  }
}



async function newAssetToIpfs(assetForIPFS) {

  store.dispatch(Reg.RegAssetToIpfsStarted());
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

    store.dispatch(Reg.RegAssetToIpfsComplete(ipfsHash))
  }
  catch (error) {
    store.dispatch(Reg.Error(error))
  }

}


export function RegAssetToIpfsComplete(hash) {
  return {
    type: Reg.RegAssetToIpfsComplete,
    ipfsHash: hash
  }

}

export function RegAssetIpfsHashToFactomStarted() {
  return {
    type: Reg.RegAssetIpfsHashToFactomStarted
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
  let newAssetName = store.getState().RegAssetReducers.newAsset.Name;
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



export function RegAssetIpfsHashToFactomComplete(hash) {
  return {
    type: REG_ASSET_FACTOM_COMPLETE,
    chainId: hash
  }

}

export function ConfirmAssetComplete() {
  // store.dispatch(getAssets());
  return {
    type: Reg.ConfirmAssetComplete
  }
}

