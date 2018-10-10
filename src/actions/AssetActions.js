import {
  ADD_ASSET,
  GET_ASSETS,
  GET_TRANS,
  SELECT_ASSET,
  START_TRANS,
  SEND_TRANS,
  ADD_PHOTO,
  ADD_DOC,
  ADD_PROPS,
  INC_HERC_ID,
  GET_ACCOUNT,
  GET_ORGANIZATION,
  GET_HERC_ID,
  GOT_HERC_ID,
  CONFIRM_ASSET,
  SET_SET,
  DELETE_ASSET,
  GOT_ASSET_TRANS,
  AUTH_TOKEN,
  GET_QR_DATA,
  GET_ORIGIN_TRANS,


} from "./types";

import firebase from "../constants/Firebase";
const rootRef = firebase.database().ref();
export function getHercId() {
  return dispatch => {
    let hercId;
    rootRef
      .child("hercID")
      .once("value")
      .then(snapshot => {
        console.log(snapshot.val(), " in getHercId action");
        hercId = snapshot.toJSON();
      })
      .then(() => dispatch(gotHercId(hercId)));
  };
}

export function gotHercId(hercId) {
  let id = hercId;
  console.log(id, "gotHercId");
  return {
    type: GOT_HERC_ID,
    hercId: id
  };
}

export function incHercId(hercid) {
  console.log(hercid, "hercid");
  let hercIdplus1 = parseInt(hercid) + 1;
  console.log(hercIdplus1, 'transformed hopefully plus one')
  return {
    type: INC_HERC_ID,
    hercIdplus1
  };
}

// export function incHercId(hercid) {
//   if (hercid){
//     console.log(hercid, "hercid");
//     let hercIdStr = (Number(hercid) + 1).toString();
//     console.log(hercIdStr, "transformed to string");
//     let hercId = "00" + hercIdStr; //adding leading 0's for fun
//     console.log(hercId, "after refact");
//     return {
//       type: INC_HERC_ID,
//       hercId
//     };
//   } else {
//     console.log("Error hercid is not valid, hercid: ", hercid )
//     console.log("it's a NaNNaNNaN batman")
//   }
// }


export function authToken(token) {
  return {
    type: AUTH_TOKEN,
    token
  };
}


export function getAccount(edge_account) {
  // console.log("Account in Action: ", edge_account);
  return {
    type: GET_ACCOUNT,
    edge_account
  };
}

export function getOrganization(organizationName) {
  console.log("Organization Name in Actions: ", organizationName)
  return {
    type: GET_ORGANIZATION,
    organizationName
  }
}

// export function getAssetHashes(user) {
//   let assets = [];
//   rootRef
//     .child("/assets/" + user + "/ipfs")
//     .once("value")
//     .then(snapshot => {
//       snapshot.forEach(asset => {
//         console.log(" assetobject in get hash!");
//        assets.push({
//           data: trans.toJSON().data
//         });
//       });
//     })

//   return dispatch => {
//     dispatch({
//       type: GET_ASSETS
//     });

//     console.log("getTrans action");
//     let assetTrans = [];
    
//       .then(() => dispatch(gotAssetTrans(assetTrans)));
//   };
// }

// export function gotAssetTrans(assetTrans) {
//   let transactions = assetTrans;
//   console.log("got the transactions list");
//   return {
//     type: GOT_ASSET_TRANS,
//     transactions
//   };
// }

export function selectAsset(asset) {
  let assetRef = rootRef.child("assets/" + asset.key);
  let selectedAsset = {};
  assetRef.on("value", snapshot => {
    selectedAsset = snapshot.val();
  });
  selectedAsset = Object.assign({}, selectedAsset, {
    ...selectedAsset,
    key: asset.key
  });
  console.log("asset selection in action");
  return {
    type: SELECT_ASSET,
    selectedAsset
  };
}

export function addAsset(newAsset) {
  return {
    type: ADD_ASSET,
    newAsset
  };
}

export function confirmAsset(confirmedAsset) {
  let newAsset = confirmedAsset;
  console.log("confirming asset", newAsset);
  return {
    type: CONFIRM_ASSET,
    newAsset
  };
}

export function deleteAsset(key) {
  let delKey = key;
  console.log(delKey, "deletekey");
  return {
    type: DELETE_ASSET,
    delKey
  };
}

export function startTrans(trans) {
  let newtrans = trans;

  return {
    type: START_TRANS,
    data: newtrans
  };
}

export function sendTrans(trans) {
  console.log("inside set Location action");
  return {
    type: SEND_TRANS,
    data: trans
  };
}

export function addProps(newProps) {
  return {
    type: ADD_PROPS,
    data: newProps
  };
}

export function addPhoto(imgObj) {
  return {
    type: ADD_PHOTO,
    data: imgObj.image,
    size: imgObj.size
  };
}

export function addDoc(doc) {
  let document = doc;
  return {
    type: ADD_DOC,
    document
  };
}

export function setSet(item) {
  return {
    type: SET_SET,
    item
  };
}

export function getTrans(assetKey) {
  return dispatch => {
    dispatch({
      type: GET_TRANS
    });

    console.log("getTrans action");
    let assetTrans = [];
    rootRef
      .child("assets/" + assetKey + "/transactions")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(trans => {
          console.log("object in getTrans!");
          assetTrans.push({
            data: trans.toJSON().data
          });
        });
      })
      .then(() => dispatch(gotAssetTrans(assetTrans)));
  };
}

export function gotAssetTrans(assetTrans) {
  let transactions = assetTrans;
  console.log("got the transactions list");
  return {
    type: GOT_ASSET_TRANS,
    transactions
  };
}

export function getOriginTrans(trans) {
  console.log(trans, "INSIDE get Origin");
  return (
    {
      type: GET_ORIGIN_TRANS,
      trans
    }
  )
}

export function getQRData(data) {
  console.log(data, "this is actions getQRData");
  return {
    type: GET_QR_DATA,
    data
  }
}
