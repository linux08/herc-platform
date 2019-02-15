import * as RegAction from './RegAssetActionCreators';

const INITIAL_STATE = {
    newAsset: {
        Name: "",
        Logo: null,
        CoreProps: {
            Metric1: "",
        }
    },
    HercId: "",
    percentage: 0,
    content: "Your Asset is Being Created",
    flags: {}
}

const RegisterAssetReducers = (state = INITIAL_STATE, action) => {
    console.log(action, "in regReducers")
    switch (action.type) {

        case RegAction.Error:
            return Object.assign({}, {
                ...state,
                Error: {
                    error: action.Error,
                    type: action.type
                }
            })

        case RegAction.GetHercId:
            return Object.assign({}, {
                ...state,
                flags: {
                    hercIdGetting: true,
                }
            })

        case RegAction.GotHercId:
            console.log("gotHercIDreducers", action);
            let hercId = action.hercId;
            return Object.assign({}, {
                HercId: hercId,
                newAsset: {
                    ...state.INITIAL_STATE.newAsset,
                    hercId: hercId
                },
                flags: {
                    ...state.flags,
                    gotHercId: true
                },
                percentage: 0
            })

        case RegAction.IncreaseHercId:

            return Object.assign({}, {
                ...state,
                HercId: action.hercId
            });

        case RegAction.ClearState:
            return {
                INITIAL_STATE
            }


        case RegAction.AddAsset:
            console.log(action, "addassetredux");
            const newAsset = action.newAsset;
            return Object.assign({}, {
                ...state,
                newAsset: newAsset
            })



        case RegAction.SettingHeaderInFirebase:

            return Object.assign({}, {
                ...state,
                flags: {
                    ...state.flags,
                    confirmStarted: true,
                    SettingHeader: true,
                },
                percentage: state.percentage + 5,
                content: 'Your Asset Is Being Created!'

            }
            )

        case RegAction.SettingHeaderComplete:
            return Object.assign({}, state, {
                ...state,
                flags: {
                    headerComplete: true,
                },
                percentage: state.percentage + 5
            })



        case RegAction.RegAssetToIpfsStarted:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    ipfsStarted: true,
                },
                percentage: state.percentage + 15,
                content: "Your Asset Is Being Written To The IPFS"
            }


        case RegAction.RegAssetToIpfsComplete:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    ipfsComplete: true,
                },
                percentage: state.percentage + 25,
                ipfsHash: action.ipfsHash,
                content: "Your Asset is On The IPFS And The Location Is Being Written To Factom"
            }


        case RegAction.RegAssetIpfsToFactomStarted:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    factomStarted: true,
                },
                percentage: state.percentage + 15
            }

        case RegAction.regAssetFactomComplete:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    factomComplete: true,
                },
                chainId: action.chainId,
                percentage: state.percentage + 15
            }



        case RegAction.ConfirmAssetComplete:

            return {
                ...state,
                flags: {

                    confirmAssetComplete: true,
                },
                percentage: 100,
                content: "You're Asset Has Been Succesfully Created"
            }




        default: return state;

    };
}

export default RegisterAssetReducers;