// import {
//     ADD_ASSET,
//     ADD_DOC,
//     ADD_METRICS,
//     ADD_PHOTO,
//     SETTING_HEADER,
//     SETTING_HEADER_ERROR,
//     CONFIRM_STARTED,
//     GOT_IPFS,
//     GOT_FACT,
//     CONFIRM_ASSET_COMPLETE,
//     DELETE_ASSET,
//     GET_HERC_ID,
//     GET_ORIGIN_TRANS,
//     GET_QR_DATA,
//     GET_TRANS,
//     GETTING_ASSET_DEF,
//     GOT_ASSET_DEF,
//     ASSET_DEF_ERROR,
//     GOT_ASSET_TRANS,
//     GOT_HERC_ID,
//     GOT_LIST_ASSETS,
//     INC_HERC_ID,
//     SELECT_ASSET,
//     SEND_TRANS,
//     SET_SET,
//     START_TRANS,
//     TRANS_COMPLETE,
//     CLEAR_STATE,
// } from '../actions/types';
// import axios from 'axios';
// import store from "../store";
// import firebase from '../constants/Firebase';
// const rootRef = firebase.database().ref();

// import {
//     WEB_SERVER_API_IPFS_GET,
//     WEB_SERVER_API_IPFS_ADD,
//     WEB_SERVER_API_FACTOM_CHAIN_ADD,
//     WEB_SERVER_API_FACTOM_ENTRY_ADD,
//     WEB_SERVER_API_STORJ_UPLOAD,
//     WEB_SERVER_API_CSV
// } from "../components/settings"


//synchronous
// let assets = [];
// rootRef.child('assets').on('value', (snapshot) => {
//     snapshot.forEach((obj) => {
//         console.log(obj.toJSON(), 'object in listassets');
//         assets.push({
//             name: obj.toJSON().Name,
//             key: obj.key,
//             logo: obj.toJSON().Logo,
//             // url: obj.toJSON().url
//         });

//     })

// })



// const INITIAL_STATE = {
//     dataFlags: {
//         confirmStarted: false,
//         confAssetComplete: false,
//     },
//     transDataFlags: {
//         transStarted: false,
//         confTransComplete: false,
//     }
// }


// const AssetReducers = (state = INITIAL_STATE, action) => {
//     switch (action.type) {

//         case START_TRANS:
//             let trans = action.data;

//             return Object.assign({}, state, {
//                 ...state,
//                 transDataFlags: {
//                     ...state.transDataFlags,
//                     transSet: true
//                 },
//                     trans

//             })

//         case SEND_TRANS:
//             return Object.assign({}, state, {
//                 ...state,
//                 transDataFlags: {
//                     transStarted: true
//                 },

//             })

//         case TRANS_COMPLETE:
//             // let trans = action.data;
//             return Object.assign({}, state, {
//                 ...state,
//                 transDataFlags: {
//                     ...state.transDataFlags,
//                     confTransComplete: true,
//                 },

//                     trans: {
//                         ...state.trans,
//                 }
//             }
//             )

//         case ADD_PHOTO:
//             let images = {
//                 image: action.data,
//                 size: action.size,
//                 uri: action.uri
//             };

//             // let images = [...state.selectedAsset.trans.data.images, image];
//             return Object.assign({}, state, {
//                 ...state,


//                     trans: {
//                         ...state.trans,
//                         data: {
//                             ...state.trans.data,
//                             images
//                         }
//                 }
//             })


//         case ADD_DOC:
//             let documents = action.document;
//             // let documents = [...state.selectedAsset.trans.data.documents, doc];
//             return Object.assign({}, state, {
//                 ...state,
//                   trans: {
//                       ...state.trans,
//                       data: {
//                           ...state.trans.data,
//                           documents
//                       }
//                   }
//             })

//         case ADD_METRICS:
//             const properties = action.data;
//             return Object.assign({}, state, {
//                 ...state,

//                     trans: {
//                         ...state.trans,
//                         data: {
//                             ...state.trans.data,
//                             properties
//                         }

//                 }
//             })

//         case SET_SET:
//             const ediT = action.item
//             return Object.assign({}, state, {
//                 ...state,
//              ...state.trans,
//                     trans: {
//                         ...state.trans,
//                         data: {
//                             ...state.trans.data,
//                             ediT
//                         }
//                 }

//             })

      

//         default:
//             return state;
//     }
// }


// export default AssetReducers;
