import {
  WEB_SERVER_API_IPFS_GET,
  WEB_SERVER_API_IPFS_ADD,
  WEB_SERVER_API_FACTOM_CHAIN_ADD,
  WEB_SERVER_API_FACTOM_ENTRY_ADD,
  WEB_SERVER_API_STORJ_UPLOAD_IMAGE,
  WEB_SERVER_API_STORJ_UPLOAD_DOCUMENT,
  TOKEN_ADDRESS,
  DEVELOPERS
} from "../../../components/settings";

const BigNumber = require("bignumber.js");
import * as Trans from "./TransactionActionNames";
import axios from "axios";
import store from "../../../store";
import firebase from "../../../constants/Firebase";
const rootRef = firebase.database().ref();
const assetRef = rootRef.child("assets");

export function Error(error) {
  return {
    type: Trans.Action.Error,
    Error: error
  };
}

export function ClearState() {
  return {
    type: Trans.Action.ClearState
  };
}

export function ClearEdiT() {
  return {
    type: Trans.Action.ClearEdiT
  };
}
export function ClearImages() {
  return {
    type: Trans.Action.ClearImages
  };
}
export function ClearDocuments() {
  return {
    type: Trans.Action.ClearDocuments
  };
}
export function ClearMetrics() {
  return {
    type: Trans.Action.ClearMetrics
  };
}

export function ShowMetricModal() {
  return {
    type: Trans.Action.ShowMetricModal
  };
}
// export function ShowCamSourceModal() {
//   return {
//     type: Trans.Action.ShowCamSourceModal
//   }
// }

export function ShowPasswordModal() {
  return {
    type: Trans.Action.ShowPasswordModal
  };
}

export function ShowEditModal() {
  return {
    type: Trans.Action.ShowEditModal
  };
}

export function SetNewOriginTransPassword(password) {
  console.log("settingNewOGPass");
  return {
    type: Trans.Action.SetNewOriginTransPassword,
    password
  };
}
export function StartTransaction(place) {
  // if (place === "Recipient") {
  //   getOriginTrans(pw);
  // }

  let asset = store.getState().AssetReducers.selectedAsset;
  trans = {
    header: {
      tXSide: place,
      hercId: asset.hercId,
      // password: this.state.password,
      name: asset.Name,
      tXLocation: place,
      price: 0.000125, //this is the bare starter price i'm going with which is (128b / 1024) x 0.001
      dTime: new Date().toDateString()
      // ogEntry: this.state.originalTransInfo.entryHash,
    },
    data: {
      // Julie removed below - debugging non-zero price at TX start
      // images: {},
      // documents: {}
    }
  };

  return {
    type: Trans.Action.StartTransaction,
    trans
  };
}

// TODO: breakdown into 2 functions one to find the correct TX
//  should check for both password and "Originator", and then
//  another to build the OriginTransInfo object and call SetOriginTransInfo
// GetOriginTrans = password => {
//   return dispatch => {
//     let transactions = store.getState().AssetReducers.selectedAsset
//       .transactions;
//     for (const key of Object.keys(transactions)) {
//       if (transactions[key].header.password === password) {
//         console.log("password found", transactions[key].header);
//         if (transactions[key].header.password === password) {
//           let OgHeader = transactions[key].header;
//           let OriginTransInfo = {
//             OrigTxEntryHash: OgHeader.factomEntry,
//             hercId: OgHeader.hercId,
//             OgTxKey: key,
//             OgTxTime: OgHeader.dTime
//           };

//           dispatch(SetOriginTransInfo(OriginTransInfo));
//         }
//       }
//     }
//   };
// };

export function SetOriginTransInfo(info) {
  // store.dispatch(StartTransaction('Recipient'));
  return {
    type: Trans.Action.SetOriginTransInfo,
    ogTrans: info
  };
}

export function AddMetrics(newMetrics) {
  return {
    type: Trans.Action.AddMetrics,
    data: newMetrics
  };
}

export function AddPhoto(imgObj) {
  let imgSize = imgObj.size;
  let imgPrice = this._calculateStorjPrice(imgSize);
  return {
    type: Trans.Action.AddPhoto,
    images: {
      name: imgObj.name,
      data: imgObj.imageString,
      size: imgObj.size,
      uri: imgObj.uri,
      price: imgPrice
    }
  };
}

// _calculateImgPrice = imgObj => {
//   let dynamicHercValue = store.getState().TransactionReducers.hercValue;
//   let imgSize = imgObj.size;
//   let imgPrice = (
//     (imgSize / 1024) *
//     (0.0000000477 * (1 / dynamicHercValue))
//   ).toFixed(18);

//   return imgPrice;
// };

export function AddDoc(doc) {
  let docSize = doc.size;
  let docPrice = _calculateStorjPrice(docSize);

  console.log(docPrice, "this is the doc price");
  let document = Object.assign({}, doc, {
    ...doc,
    price: docPrice
  });

  return {
    type: Trans.Action.AddDoc,
    document
  };
}

_calculateStorjPrice = (size) => {
  let dynamicHercValue = store.getState().TransactionReducers.hercValue;
  let storjPrice = (
    (size / 1024) *
    (0.0000000477 * (1 / dynamicHercValue))
  ).toFixed(18);

  let convertingPrice = new BigNumber(storjPrice);
  let newDocPrice = convertingPrice.toFixed(18);
  return newDocPrice;
};

export function AddEdiT(item) {
  return {
    type: Trans.Action.AddEdiT,
    item
  };
}

getNetworkFee = currentHercPrice => {
  //Security Fee should be $ 0.000032 worth of hercs. The response should be in hercs.
  //Per Use Fee should be $ 0.000032 worth of hercs. The response should be in Hercs.
  //Network Fee is the combined value of security fee and per use fee. The response should be in Hercs.

  let dynamicHercValue = currentHercPrice;
  console.log("this is the dynamic herc value", dynamicHercValue)
  let securityFeeInHercs = 0.000032 / dynamicHercValue;
  let perUseFeeInHercs = 0.000032 / dynamicHercValue;
  let networkFee = securityFeeInHercs + perUseFeeInHercs;
  let convertingNetworkFee = new BigNumber(networkFee);
  let newNetworkFee = convertingNetworkFee.toFixed(18);
  store.dispatch(GotNetworkFee(newNetworkFee));
};

GotNetworkFee = fee => {
  return {
    type: Trans.Action.GotNetworkFee,
    fee
  };
};

export function GetCurrentHercValue() {
  getDynamicHercValue();
  return {
    type: Trans.Action.GetCurrentHercValue
  };
}

getDynamicHercValue = async () => {
  try {
    let response = await fetch(
      "https://chart.anthemgold.com/service-1.0-SNAPSHOT/PRICE?symbol=HERCUSDV&range=MINUTE_5"
    );

    let highPrice = await response.json();
    console.log(highPrice, "dynamic herc price, what format? looking for 'h'");
    store.dispatch(GotDynamicHercValue(highPrice.h));
  } catch (error) {
    store.dispatch(Error(error));
  }
};

GotDynamicHercValue = hercValue => {
  getNetworkFee(hercValue);
  return {
    type: Trans.Action.GotDynamicHercValue,
    hercValue
  };
};

// _getDynamicHercValue = async () => {
//     return fetch(
//       "https://chart.anthemgold.com/service-1.0-SNAPSHOT/PRICE?symbol=HERCCOMMERCIAL&range=MINUTE_5",
//       {
//         method: "GET"
//       }
//     )
//       .then(response => response.json())
//       .then(responseJson => {
//         let responseObject = responseJson;
//         let highPrice = responseObject.h;
//         return highPrice;
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

export function MakePayment(makePaymentObject) {
  console.log(makePaymentObject, "this is the make payment object")

  let docImgFeePrepped = new BigNumber(makePaymentObject.dataFee).multipliedBy(1000000000000000000).toFixed(0);
  let networkFeePrepped = new BigNumber(makePaymentObject.networkFee).multipliedBy(1000000000000000000).toFixed(0);
  


  return async dispatch => {
    console.log("jm makePaymentObject", makePaymentObject);
    if (DEVELOPERS.includes(store.getState().AccountReducers.edge_account)) {
      dispatch(
        StoreTransactionIds({
          burnTransaction: "madeUpBurnTransactionID",
          dataFeeTransaction: "madeUpdataFeeTransactionID"
        })
      );
      dispatch({ type: Trans.Action.TransactionComplete });
    } else {
      console.log("jm makePaymentObject networkFee", makePaymentObject);
      const burnSpendInfo = {
        networkFeeOption: "standard",
        currencyCode: "HERC",
        metadata: {
          name: "Transfer From Herc Wallet",
          category: "Transfer:Wallet:Network Fee"
        },
        spendTargets: [
          {
            publicAddress: TOKEN_ADDRESS,
            nativeAmount: networkFeePrepped
          }
        ]
      };
      const dataFeeSpendInfo = {
        networkFeeOption: "standard",
        currencyCode: "HERC",
        metadata: {
          name: "Transfer From Herc Wallet",
          category: "Transfer:Wallet:Data Fee"
        },
        spendTargets: [
          {
            publicAddress: "0x1a2a618f83e89efbd9c9c120ab38c1c2ec9c4e76",
            nativeAmount: docImgFeePrepped
          }
        ]
      };
      // catch error for "ErrorInsufficientFunds"
      // catch error for "ErrorInsufficientFundsMoreEth"
      let wallet = store.getState().WalletReducers.wallet;
      try {
        let burnTransaction = await wallet.makeSpend(burnSpendInfo);
        await wallet.signTx(burnTransaction);
        await wallet.broadcastTx(burnTransaction);
        await wallet.saveTx(burnTransaction);
        console.log(
          "jm Sent burn transaction with ID = " + burnTransaction.txid
        );

        let dataFeeTransaction = await wallet.makeSpend(dataFeeSpendInfo);
        await wallet.signTx(dataFeeTransaction);
        await wallet.broadcastTx(dataFeeTransaction);
        await wallet.saveTx(dataFeeTransaction);
        console.log(
          "jm Sent dataFee transaction with ID = " + dataFeeTransaction.txid
        );

        if (burnTransaction.txid && dataFeeTransaction.txid) {
          dispatch(
            StoreTransactionIds({
              burnTransaction: burnTransaction.txid,
              dataFeeTransaction: dataFeeTransaction.txid
            })
          );
          dispatch({ type: Trans.Action.TransactionComplete });
        }
      } catch (e) {
        console.log("jm error", e);
      }
    }
  };
}

export function TransactionStarted() {
  return {
    type: Trans.Action.TransactionStarted
  };
}

export function TransactionInstantiating() {
  return {
    type: Trans.Action.TransactionInstantiating
  };
}

export function TransactionFactomEntryCompleted(factomEntry) {
  return {
    type: Trans.Action.TransactionFactomEntryCompleted,
    factomEntry: factomEntry
  };
}

export function TransactionWriteToFirebaseCompleted() {
  return {
    type: Trans.Action.TransactionWriteToFirebaseCompleted
  };
}

export function TransactionComplete() {
  return {
    type: Trans.Action.TransactionComplete
  };
}

export function SendTransaction() {
  console.log("jm started SendTransaction");
  return dispatch => {
    // dispatch({ type: SEND_TRANS }); //brings up MODAL
    store.dispatch(TransactionStarted());

    let transObject = store.getState().TransactionReducers.trans;
    let price = 0;
    if (transObject.data.images.price) {
      console.log("this is the transObject data images price", transObject.data.images.price)
      price =  new BigNumber(transObject.data.images.price).plus(price).toFixed(18);
    }
    if (transObject.data.documents.price) {
      console.log("this is the transObject data images price", transObject.data.documents.price)
      price = new BigNumber(transObject.data.documents.price).plus(price).toFixed(18);
    }
    let header = Object.assign({}, transObject.header, {
      ...transObject.header,
      price: price
    }); //tXlocation, hercId, price, name
    console.log("jm price", price, "\nheader:", header);

    let data = transObject.data; //documents, images, metrics, edit
    /*
    {
    metrics:{
        stuff,
        stuff1
      },
    images:{
        name,
        data,
        size,
        uri,
        price
      },
    documents:{
        uri,
        name,
        type,
        content,
        price
      },
    edit:{
      value,
      name,
      }
  }

    */
    let keys = Object.keys(data); // ["metrics", "images", "documents", "ediT"]
    let promiseArray = [];

    console.log("jm data", data, "\nkeys", keys);

    //Checks if documents, metrics, images and EDIT was added
    keys.forEach(key => {
      console.log("jm key", key);
      if (key == "images" && Object.keys(data["images"]).length !== 0) {
        console.log("jm check 1", data["images"]);
        var base64 = data[key].data;
        var dataObject = Object.assign(
          {},
          { key: key },
          { data: encodeURIComponent(base64) }
        );
        console.log("jm check image dataObject", dataObject);
        promiseArray.push(
          axios
            .post(WEB_SERVER_API_STORJ_UPLOAD_IMAGE, JSON.stringify(dataObject))
            .then(response => {
              return response;
            }) // {key: 'images', hash: 'QmU1D1eAeSLC5Dt4wVRR'}
            .catch(error => {
              console.log(error);
            })
        );
      } else if (data[key].content) {
        console.log("jm check 2", data[key].content);
        let contentTypeName = {
          content: encodeURIComponent(data[key].content),
          type: data[key].type,
          name: data[key].name
        };
        var dataObject = Object.assign(
          {},
          { key: key },
          { data: contentTypeName }
        );
        promiseArray.push(
          axios
            .post(
              WEB_SERVER_API_STORJ_UPLOAD_DOCUMENT,
              JSON.stringify(dataObject)
            )
            .then(response => {
              return response;
            })
            .catch(error => {
              console.log(error);
            })
        );
      } else if (
        Object.keys(data[key]).length != 0 &&
        data[key].constructor === Object
      ) {
        console.log("jm check 3", data[key]);
        var dataObject = Object.assign({}, { key: key }, { data: data[key] }); // {key: 'properties', data: data[key]}
        promiseArray.push(
          axios
            .post(WEB_SERVER_API_IPFS_ADD, JSON.stringify(dataObject))
            .then(response => {
              return response;
            }) // {key: 'properties', hash: 'QmU1D1eAeSLC5Dt4wVRR'}
            .catch(error => {
              console.log(error);
            })
        );
      }
    });

    let chainId = store.getState().AssetReducers.selectedAsset.hashes.chainId;

    store.dispatch(TransactionInstantiating());

    Promise.all(promiseArray)
      .then(results => {
        // sometimes results are [undefined] when Network Error
        // console.log('Results in send_trans action: jm', results)
        // results = [{key: 'properties', hash: 'QmU1D1eAeSLC5Dt4wVRR'}, {key: 'images', hash: 'QmU1D1eAeSLC5Dt4wVRR'}]
        // TODO: add error handling for undefined results
        var hashlist = results.map(result => {
          return result.data;
        });
        var factomEntry = { hash: hashlist, chainId: chainId };
        console.log("1/2 factomEntry jm", factomEntry);
        axios
          .post(WEB_SERVER_API_FACTOM_ENTRY_ADD, JSON.stringify(factomEntry))
          .then(response => {
            store.dispatch(TransactionFactomEntryCompleted(response.data));
            //response.data = entryHash
            var dataObject = {};
            hashlist.map(hash => (dataObject[hash.key] = hash.hash));
            var firebaseHeader = Object.assign({}, header, {
              factomEntry: response.data
            });
            rootRef
              .child("assets")
              .child(firebaseHeader.name)
              .child("transactions")
              .child(Date.now())
              .set({ data: dataObject, header: firebaseHeader });
            console.log("2/2 ....finished writing to firebase. jm");
            store.dispatch(TransactionWriteToFirebaseCompleted());
            let makePaymentObject = {
              dataFee: price,
              networkFee: store.getState().TransactionReducers.networkFee
            };
            dispatch(MakePayment(makePaymentObject));
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getQRData(data) {
  console.log(data, "this is actions getQRData");
  return {
    type: GET_QR_DATA,
    data
  };
}

export function StoreTransactionIds(transactionIds) {
  console.log("jm storing transaction IDs", transactionIds);
  return {
    type: Trans.Action.StoreTransactionIds,
    transactionIds
  };
}

// this is needed swiper!
// export function GetAssetTransactions(assetKey) {
//     return dispatch => {
//         dispatch({
//             type: GET_TRANS
//         });

//         console.log("getTrans action");
//         let assetTrans = [];
//         rootRef
//             .child("assets/" + assetKey + "/transactions")
//             .once("value")
//             .then(snapshot => {
//                 snapshot.forEach(trans => {
//                     console.log("object in getTrans!");
//                     assetTrans.push({
//                         data: trans.toJSON().data
//                     });
//                 });
//             })
//             .then(() => dispatch(GotAssetTransactions(assetTrans)));
//     };
// }

// export function GotAssetTransactions(assetTrans) {
//     let transactions = assetTrans;
//     console.log("got the transactions list");
//     return {
//         type: GOT_ASSET_TRANS,
//         transactions
//     };
// }
