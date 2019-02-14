import {
    GETTING_HERC_ID,
    GOT_HERC_ID,
    ADD_ASSET,
    SETTING_HEADER,
    SETTING_HEADER_COMPLETE,
    SETTING_HEADER_ERROR,
    CLEAR_STATE,
    REG_ASSET_T0_IPFS_STARTED,
    REG_IPFS_COMPLETE,
    REG_ASSET_IPFS_TO_FACTOM_STARTED,
    REG_ASSET_FACTOM_COMPLETE,
    FACTOM_ERROR,
    CONFIRM_ASSET_COMPLETE,
    INC_HERC_ID,
    IPFS_ERROR,
    FIREBASE_HASHES_ERROR,

} from './registerAssetActionTypes';

const INITIAL_STATE = {
    newAsset: {},
    hercId: "",

    confirmStarted: false,
    headerComplete: false,

    ipfsStarted: false,
    ipfsComplete: false,

    factomStarted: false,
    factomComplete: false,

    ipfsHash: "",
    chainId: "",

    confirmAssetComplete: false,
    percentage: 0,
    content: "Your Asset is Being Created"
}

const RegisterAssetReducers = (state = INITIAL_STATE, action) => {
    console.log(action, "in regReducers")
    switch (action.type) {
        case GETTING_HERC_ID:
            return Object.assign({}, {
                ...state,
                hercIdGetting: true
            })

        case GOT_HERC_ID:
            console.log("gotHercIDreducers", action);
            let hercId = action.hercId;
            return Object.assign({}, state, {
                ...state,
                hercId: hercId


            })

        case INC_HERC_ID:

            return Object.assign({}, state, {
                ...state,
                hercId: action.hercId
            });


        case ADD_ASSET:
            console.log(action, "addassetredux");
            const newAsset = action.newAsset;
            return Object.assign({}, state, {
                ...state,
                newAsset: newAsset
            })



        case SETTING_HEADER:

            return Object.assign({}, state, {
                ...state,
                confirmStarted: true,
                percentage: 5

            }
            )

        case SETTING_HEADER_COMPLETE:
            return Object.assign({}, state, {
                ...state,
                headerComplete: true,

                percentage: state.percentage + 15
            }
            )

        case SETTING_HEADER_ERROR:
            return Object.assign({}, state, {
                ...state,

                error: {
                    type: action.type,
                    error: action.error
                }
            }
            )

        case REG_ASSET_T0_IPFS_STARTED:
            return {
                ...state,
                ipfsStarted: true,
                percentage: state.percentage + 15,
                content: "Your Asset Info Is Being Written To The IPFS"
            }

        case IPFS_ERROR:
            return {
                ipfsError: action.error
            }

        case REG_IPFS_COMPLETE:
            return {
                ...state,
                ipfsComplete: true,
                ipfsHash: action.ipfsHash,
                percentage: state.percentage + 25,
                content: "Your Asset is On The IPFS And The Location Is Being Written To Factom"
            }


        case REG_ASSET_IPFS_TO_FACTOM_STARTED:
            return {
                ...state,
                factomStarted: true,
                percentage: state.percentage + 15
            }

        case REG_ASSET_FACTOM_COMPLETE:
            return {
                ...state,
                factomComplete: true,
                chainId: action.chainId,
                percentage: state.percentage + 15
            }

        case FACTOM_ERROR:
            return {
                ...state,
                error: {
                    error: action.error,
                    type: action.type
                }
            }

        case CONFIRM_ASSET_COMPLETE:

            return {
                ...state,
                confirmAssetComplete: true,
                percentage: 100,
                content: "You're Asset Has Been Succesfully Created"
            }

        case FIREBASE_HASHES_ERROR:
            return {
                ...state,
                error: {
                    type: action.type,
                    error: action.error
                }
            }

        case CLEAR_STATE:
            return {
                INITIAL_STATE
            }

        default: return state;

    };
}

export default RegisterAssetReducers;