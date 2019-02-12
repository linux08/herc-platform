import {
    ADD_ASSET,
    SETTING_HEADER,
    SETTING_HEADER_COMPLETE,
    SETTING_HEADER_ERROR,
    CLEAR_STATE,
    REG_ASSET_T0_IPFS,
    REG_IPFS_COMPLETE,
    REG_ASSET_IPFS_TO_FACTOM,
    REG_ASSET_FACTOM_COMPLETE,
    CONFIRM_ASSET_COMPLETE,
    INC_HERC_ID,

} from '../actions/RegisterAssetActions';

const INITIAL_STATE = {

    confirmStarted: false,
    headerComplete: false,

    ipfsStarted: false,
    ipfsComplete: false,

    factomStarted: false,
    factomComplete: false,

    ipfsHash: "",
    chainId: "",

    confirmAssetComplete: false,
    percentage: 0
}




const RegisterAssetReducers = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case INC_HERC_ID:
            let hercID = action.hercIdplus1;
            rootRef.child("hercID").set(hercID);
            return Object.assign({}, state, {
                ...state,
                hercId
            });

        case ADD_ASSET:
        console.log(action, "addassetredux");
            const newAsset = action.newAsset;
            return Object.assign({}, state, {
                ...state,
                newAsset
            })



        case SETTING_HEADER:
            
        return Object.assign({}, state, {
                ...state,
                confirmStarted: true
            }
            )

        case SETTING_HEADER_COMPLETE:
            return Object.assign({}, state, {
                ...state,
                headerComplete: true,

                percentage: '15'
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

        case REG_ASSET_T0_IPFS:
            return {
                ...state,
                ipfsStarted: true,
                percentage: '24'

            }


        case REG_IPFS_COMPLETE:
            return {
                ...state,
                ipfsComplete: true,
                ipfsHash: action.ipfsHash,
                percentage: '35'
            }


        case REG_ASSET_IPFS_TO_FACTOM:
            return {
                ...state,
                factomStarted: true,
                percentage: '55'
            }

        case REG_ASSET_FACTOM_COMPLETE:
            return {
                ...state,
                factomComplete: true,
                chainId: action.chainId,
                percentage: '83'
            }

        case CONFIRM_ASSET_COMPLETE:
            return {
                ...state,
                confirmAssetComplete: true,
                percentage: '100'
            }

        case CLEAR_STATE:
            return {
                INITIAL_STATE
            }

        default: return state;

    };
}

export default RegisterAssetReducers;