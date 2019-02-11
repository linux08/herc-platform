import {
 ADD_ASSET,
 SETTING_HEADER,
 SETTING_HEADER_COMPLETE,
 SETTING_HEADER_ERROR,
 CONFIRM_STARTED,
 CONFIRM_AT_IPFS,
 CONFIRM_AT_FACTOM,
 CONFIRM_ASSET_COMPLETE,
} from './types';

import store from '../store';

export function addAsset(newAsset) {
  return {
    type: ADD_ASSET,
    newAsset
  };
}

export function settingHeader(assetHeader) { //assetForFirebase will be Name, hercID, Logo Optional
  return dispatch => {
     
      let newAsset = store.getState().AssetReducers.newAsset;
      
      const response = await fetch(uri);
      const blob = await response.blob();

      let logoLocation = firebase.storage().ref('assets')
          .child(this.props.edgeAccount)
          .child(newAsset.Name)
          .child("Logo");

      let assetLocation = firebase.database().ref('assets')
          .child(this.props.edgeAccount);

      const snapshot = await logoLocation.put(blob);
      let downloadURL = snapshot.downloadURL;
      let fbAsset, ipfsAsset;


      ipfsAsset = Object.assign({}, {
          Name: newAsset.Name,
          CoreProps: newAsset.CoreProps,
          hercId: this.props.hercId,
      });

      fbAsset = {
          hercId: this.props.hercId,
          Name: newAsset.Name,
          Logo: downloadURL,
          Password: newAsset.Password
      }

      console.log("Right before sending to send_trans: jm", ipfsAsset, fbAsset)

      this.props.settingHeader(fbAsset);
      this.props.confirmAssetStarted(ipfsAsset);
      this.props.incHercId(this.props.hercId);
  

    // let account = store.getState().WalletActReducers;
    // let edgeAccount = account.edge_account;
    // console.log(account, "variable");

    assetRef.child(assetHeader.Name).set(assetHeader);
    dispatch({ type: SETTING_HEADER })
  }
}

export function settingHeaderError(error) {
  return {
    type: SETTING_HEADER_ERROR,
    error
  }
}



export function confirmAssetStarted(assetForIPFS) {
  return dispatch => {
    dispatch({ type: CONFIRM_STARTED })
    let asset = assetForIPFS;
    let username = store.getState().WalletActReducers.edge_account

    var dataObject = { key: 'asset', data: asset }
    axios.post(WEB_SERVER_API_IPFS_ADD, JSON.stringify(dataObject))
      .then(response => {
        console.log("1/3 ipfsHash: ", response)
        var ipfsHash = response.data.hash
        return ipfsHash
      })
      .then(ipfsHash => {
        var dataObject = JSON.stringify({ ipfsHash: ipfsHash })
        /* This part creates a new factom chain */
        axios.post(WEB_SERVER_API_FACTOM_CHAIN_ADD, dataObject)
          .then(response => {
            console.log("2/3 web server factom response: ", response)
            var chainId = response.data
            return chainId
          })
          .then(chainId => {
            let dataObject = Object.assign({}, { chainId: chainId, ipfsHash: ipfsHash, organizationName: 'H3RCUL3S' }) // organizationName hard-coded for 0.9.5 in preparation for igvc.eth platform
            // if (asset.Logo) {
            //     dataObject = Object.assign(dataObject, { Logo: asset.Logo })
            // }
            console.log("3/3 going into firebase: ", dataObject)
            rootRef.child('assets').child(asset.Name).child('hashes').set(dataObject);
            // rootRef.child('assets').child(asset.Name).child('chainId').set(dataObject.chainId);

            dispatch({ type: CONFIRM_ASSET_COMPLETE });
            dispatch(getAssets())
          }).catch(error => dispatch(factomError(error)))

      })
      .catch(err =>
        dispatch(ipfsError(err)))
  }
}

export function confirmAssetComplete() {
  return {
    type: CONFIRM_ASSET_COMPLETE
  }
}
