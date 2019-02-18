import {
  WEB_SERVER_API_IPFS_GET,
  WEB_SERVER_API_IPFS_ADD,
  WEB_SERVER_API_FACTOM_CHAIN_ADD,
  WEB_SERVER_API_FACTOM_ENTRY_ADD,
  WEB_SERVER_API_STORJ_UPLOAD,
  WEB_SERVER_API_CSV,
  WEB_SERVER_API_UPLOAD_DOCUMENT
} from "../../../components/settings";
import * as Trans from "./TransactionActionNames";
import axios from "axios";
import store from "../../../store";
import firebase from "../../../constants/Firebase";
const rootRef = firebase.database().ref();
const assetRef = rootRef.child("assets");
import { TOKEN_ADDRESS, DEVELOPERS } from "../components/settings";

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

export function ShowMetricModal() {
 return {
  type: Trans.Action.ShowMetricModal
}
}
export function ShowCamSourceModal() {
  return{
  type: Trans.Action.ShowCamSourceModal
}
}

export function ShowEditModal() {
  return {
  type: Trans.Action.ShowEditModal
}
}

export function SetNewOriginTransPassword(password) {
  return {
    type: Trans.Action.SetOriginTransPassword,
    password
  }


}
export function StartTransaction(place) {
  // if (place === "Recipient") {
  //   getOriginTrans(pw);
  // }

  let asset = store.getState().AssetReducers.selectedAsset;
  trans = {
    header: {
      hercId: asset.hercId,
      password: this.state.password,
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
  let dynamicHercValue = store.getState().TransactionReducers.hercValue;
  let imgPrice = (
    ((imgObj.size / 1024) * 0.00000002) /
    dynamicHercValue
  ).toFixed(18);
  return {
    type: Trans.Action.AddPhoto,
    image: {
      data: imgObj.image,
      size: imgObj.size,
      uri: imgObj.uri,
      price: imgPrice
    }
  };
}

//   getImgPrice = () => {
// as of 12/30/18 Image Fee (storj .000000002/kB)
// let transDat = this.props.transDat;
// let dynamicHercValue = this.state.hercValue;

// if (transDat.images) {
//       console.log(
//         "made it into the transdat images and here is the dynamic herc value from state",
//         dynamicHercValue
//       );
//       let imgPrice =
//         ((transDat.images.size / 1024) * 0.00000002) / dynamicHercValue;
//       let newImgPrice = imgPrice.toFixed(18);
//       console.log(newImgPrice, "this is the new img price on line 285");
//       return newImgPrice;
//     } else {
//       let imgPrice = 0;
//       console.log(
//         "this is in the else statement imgPrice should be 0",
//         imgPrice
//       );
//       return imgPrice;
//     }
//   };

export function AddDoc(doc) {
  let docPrice = getDocPrice();
  let document = Object.assign({}, doc, {
    ...doc,
    price: docPrice
  });

  return {
    type: Trans.Action.AddDoc,
    document
  };
}

getDocPrice = () => {
  let dynamicHercValue = store.getState().TransactionReducers.hercValue;
  let docPrice = 0.000032 / dynamicHercValue;
  let convertingPrice = new BigNumber(docPrice);
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

GetCurrentHercValue = () => {
  getDynamicHercValue();
  return {
    type: Trans.Action.GetCurrentHercValue
  };
};

getDynamicHercValue = async () => {
  try {
    let response = await fetch(
      "https://chart.anthemgold.com/service-1.0-SNAPSHOT/PRICE?symbol=HERCCOMMERCIAL&range=MINUTE_5"
    );

    let highPrice = response.json();
    store.dispatch(GotDynamicHercValue(highPrice.h));
    console.log(highPrice, "dynamic herc price, what format? looking for 'h'");
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
  return async dispatch => {
    console.log("jm makePaymentObject", makePaymentObject);
    if (DEVELOPERS.includes(store.getState().AccountReducers.edge_account)) {
      store.dispatch(
        storeTransactionIds({
          burnTransaction: "madeUpBurnTransactionID",
          dataFeeTransaction: "madeUpdataFeeTransactionID"
        })
      );
      dispatch({ type: Trans.Action.TransactionComplete });
    } else {
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
            nativeAmount: makePaymentObject.networkFee
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
            nativeAmount: makePaymentObject.dataFee
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
          store.dispatch(
            storeTransactionIds({
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

export function SendTransaction(sendTransObj) {
  return dispatch => {
    dispatch({ type: SEND_TRANS });

    let dTime = Date.now();
    let transObject = store.getState().AssetReducers.trans;
    // let organizationName = store.getState().WalletActReducers.organizationName

    // let transObject = state.AssetReducers.selectedAsset.trans;
    let header = Object.assign({}, transObject.header, {
      ...transObject.header,
      price: sendTransObj.totalBN
    }); //tXlocation, hercId, price, name
    delete sendTransObj.totalBN;

    let data = transObject.data; //documents, images, properties, dTime
    let keys = Object.keys(data); //[ 'dTime', 'documents', 'images', 'properties' ]
    let promiseArray = [];

    //Checks if documents, metrics, images and EDIT was added
    keys.forEach(key => {
      if (data[key].image) {
        var base64 = data[key].image;
        var dataObject = Object.assign(
          {},
          { key: key },
          { data: encodeURIComponent(base64) }
        );
        promiseArray.push(
          axios
            .post(WEB_SERVER_API_STORJ_UPLOAD, JSON.stringify(dataObject))
            .then(response => {
              return response;
            }) // {key: 'images', hash: 'QmU1D1eAeSLC5Dt4wVRR'}
            .catch(error => {
              console.log(error);
            })
        );
      } else if (data[key].content) {
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
            .post(WEB_SERVER_API_UPLOAD_DOCUMENT, JSON.stringify(dataObject))
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
              .child(dTime)
              .set({ data: dataObject, header: firebaseHeader });
            console.log("2/2 ....finished writing to firebase. jm");
            console.log("jm mutated sendTransObj", sendTransObj);
            dispatch(MakePayment(sendTransObj));
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
