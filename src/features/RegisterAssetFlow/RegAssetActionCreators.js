
import * as Reg from './RegAssetActionNames';

import firebase from "../../constants/Firebase";
import store from '../../store';
import axios from 'axios';
// const edgeAccount = store.getState().WalletActReducers.edge_account
const rootRef = firebase.database().ref();
const assetRef = rootRef.child("assets");
import BigNumber from "bignumber.js";

// import {
//   WEB_SERVER_API_IPFS_ADD,
//   WEB_SERVER_API_FACTOM_CHAIN_ADD,
// } from '../../components/settings';

// One size fits all error handling
export function Error(error) {
  console.log("general purpose error", error)
  return {
    type: Reg.Action.Error,
    Error: error
  }
}

export function CheckWalletMeetsMinimumRequirement(wallet) {
  if (wallet.balances){
    if (wallet.balances['HERC']){
      let hercBalance = new BigNumber(wallet.balances['HERC']).times(1e-18)
      let minimumPrice = new BigNumber(1000)
      let results = hercBalance.minus(minimumPrice)
      // console.log('jm do you have enough?', results.isPositive())
      if (results.isPositive()){
        return {
          type: Reg.Action.CheckWalletMeetsMinimumRequirement,
          canRegisterAsset: true
        }
      }
      else {
        return {
          type: Reg.Action.CheckWalletMeetsMinimumRequirement,
          canRegisterAsset: false
        }
      }
    }
    else {
      // NO HERCS! maybe move to wallet reducers
      return {
        type: Reg.Action.CheckWalletMeetsMinimumRequirement,
        canRegisterAsset: false,
        noHercs: true
      }
    }
  }
  else {
    return {
      type: Reg.Action.CheckWalletMeetsMinimumRequirement,
      canRegisterAsset: false
    }
  }
}

export function ClearState() {
  return {
    type: Reg.Action.ClearState,
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
          dispatch(GotHercId(snapshot.toJSON())))
        .catch((error) => {
          dispatch(Error(error))
        }
        )
    )
  }
}

export function GotHercId(hercId) {
  console.log('GotHercId: ', hercId)
  return {
    type: Reg.Action.GotHercId,
    hercId: hercId
  };
}

export function IncreaseHercId() {
  let hercIdPlus1 = store.getState().RegAssetReducers.HercId + 1;
  rootRef.child("hercID").set(hercIdPlus1);
  return {
    type: Reg.Action.IncreaseHercId,
    hercId: hercIdPlus1
  }
}

// Adding the new, yet to be confirmed, Asset to redux, will map on Confirm
export function AddAsset(newTempAsset) {
  console.log(newTempAsset, "in regAsstActions")
  // let newAsset = Object.assign({}, newTempAsset)
  return {
    type: Reg.Action.AddAsset,
    newAsset: newTempAsset
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
    type: Reg.Action.SettingHeaderInFirebase

  }
}


async function fetchLocalUri() {
  let newAsset = store.getState().RegAssetReducers.newAsset;
  let uri = newAsset.LogoUri;
  const response = await fetch(uri);

  setLogoLocation(response);

}


async function setLogoLocation(fetchUri) {
  // const edgeAccount = 'hercstack'; // hardcoding for now, to escape login while testing.
  const edgeAccount = store.getState().AccountReducers.edge_account;
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
    store.dispatch(Error(error))
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

function GotNewAssetFirebaseId(firebaseId){
  return {
    type: Reg.Action.GotNewAssetFirebaseId,
    firebaseId: firebaseId
  };
}


function makeAndSetHeader(logoUrl) {
  let newAsset = store.getState().RegAssetReducers.newAsset;
  let createdBy = store.getState().AccountReducers.edge_account;

  const fbAsset = {
    hercId: newAsset.hercId,
    Name: newAsset.Name,
    Logo: logoUrl,
    Password: newAsset.Password,
    CreatedBy: createdBy
  }
  console.log("making and setting header", newAsset)

  try {

    var newAssetFirebaseRef = assetRef.push(fbAsset)
    store.dispatch(GotNewAssetFirebaseId(newAssetFirebaseRef.key))
    store.dispatch(SettingHeaderComplete());
    store.dispatch(IncreaseHercId());
  }
  catch (error) {
    store.dispatch(Error(error))
  }

}

export function SettingHeaderComplete() {
  return {
    type: Reg.Action.SettingHeaderComplete
  }
}

export function RegAssetToIpfsStarted() {
  return {
    type: Reg.Action.RegAssetToIpfsStarted,
  }
}

async function newAssetToIpfs(assetForIPFS) {

  store.dispatch(RegAssetToIpfsStarted());
  let asset = assetForIPFS;
  var dataObject = { key: 'asset', data: asset }
  try {
    let response = await axios.post('WEB_SERVER_API_IPFS_ADD', JSON.stringify(dataObject))
    // let response = await axios.post(WEB_SERVER_API_IPFS_ADD, JSON.stringify(dataObject))
    console.log("1/3 ipfsHash: ", response)
    let ipfsHash = response.data.hash;
    ipfsToFactom(ipfsHash);

    store.dispatch(RegAssetToIpfsComplete(ipfsHash))
  }
  catch (error) {
    store.dispatch(Error(error))
  }

}

export function RegAssetToIpfsComplete(hash) {
  return {
    type: Reg.Action.RegAssetToIpfsComplete,
    ipfsHash: hash
  }

}

export function RegAssetIpfsHashToFactomStarted() {
  return {
    type: Reg.Action.RegAssetIpfsHashToFactomStarted
  }

}

async function ipfsToFactom(hash) {
  store.dispatch(RegAssetIpfsHashToFactomStarted())
  var dataObject = JSON.stringify({ ipfsHash: hash })
  /* This part creates a new factom chain */
  try {
    const response = await axios.post('WEB_SERVER_API_FACTOM_CHAIN_ADD', dataObject)
    // const response = await axios.post(WEB_SERVER_API_FACTOM_CHAIN_ADD, dataObject)
    console.log("2/3 web server factom response: ", response)
    var fctChainId = response.data;
    store.dispatch(RegAssetIpfsHashToFactomComplete(fctChainId));

    var hashesForFirebase = {
      chainId: fctChainId,
      ipfsHash: hash
    }

    console.log(hashesForFirebase, "hash check");
    hashesToFirebase(hashesForFirebase);

  } catch (error) {
    store.dispatch(Error(error))
  }

}

export function hashesToFirebase(hashes) {
  let firebaseId = store.getState().RegAssetReducers.firebaseId
  let newAssetName = store.getState().RegAssetReducers.newAsset.Name;
  let dataObject = Object.assign({}, {
    chainId: hashes.chainId,
    ipfsHash: hashes.ipfsHash,
    organizationName: 'H3RCUL3S'

  }) // organizationName hard-coded for 0.9.5 in preparation for igvc.eth platform

  console.log("3/3 going into firebase: ", dataObject, "name: ", newAssetName);
  try {
    rootRef.child('assets')
      .child(firebaseId)
      .child('hashes')
      .set(dataObject)
      .then(() =>
        store.dispatch(ConfirmAssetComplete()));
  } catch (error) {
    store.dispatch(Error(error))
  }
}
// Charge them now? make the payment?
// store.dispatch(getAssets());



export function RegAssetIpfsHashToFactomComplete(hash) {
  return {
    type: Reg.Action.RegAssetIpfsHashToFactomComplete,
    chainId: hash
  }

}

export function ConfirmAssetComplete() {
  // store.dispatch(getAssets());
  return {
    type: Reg.Action.ConfirmAssetComplete
  }
}
