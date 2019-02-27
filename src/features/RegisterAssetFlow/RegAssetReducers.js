import * as Reg from './RegAssetActionNames';

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

        case Reg.Action.Error:
            return Object.assign({}, {
                ...state,
                Error: {
                    error: action.Error,
                    type: action.type
                }
            })

        case Reg.Action.GetHercId:
            return Object.assign({}, {
                ...state,
                flags: {
                    hercIdGetting: true,
                }
            })

        case Reg.Action.GotHercId:
            console.log("gotHercIDreducers", action);
            let hercId = action.hercId;
            return Object.assign({}, {
                HercId: hercId,
                newAsset: {
                    ...INITIAL_STATE.newAsset,
                    hercId: hercId
                },
                flags: {
                    ...state.flags,
                    gotHercId: true
                },
                percentage: 0
            })

        case Reg.Action.IncreaseHercId:

            return Object.assign({}, {
                ...state,
                HercId: action.hercId
            });

        case Reg.Action.ClearState:
            return {
                INITIAL_STATE
            }


        case Reg.Action.AddAsset:
            console.log(action, "addassetredux");
            const newAsset = action.newAsset;
            return Object.assign({}, {
                ...state,
                newAsset: newAsset
            })



        case Reg.Action.SettingHeaderInFirebase:

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

        case Reg.Action.SettingHeaderComplete:
            return Object.assign({}, state, {
                ...state,
                flags: {
                    headerComplete: true,
                },
                percentage: state.percentage + 5
            })



        case Reg.Action.RegAssetToIpfsStarted:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    ipfsStarted: true,
                },
                percentage: state.percentage + 15,
                content: "Your Asset Is Being Written To The IPFS"
            }


        case Reg.Action.RegAssetToIpfsComplete:
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


        case Reg.Action.RegAssetIpfsHashToFactomStarted:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    factomStarted: true,
                },
                percentage: state.percentage + 15
            }

        case Reg.Action.RegAssetIpfsHashToFactomComplete:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    factomComplete: true,
                },
                chainId: action.chainId,
                percentage: state.percentage + 15
            }



        case Reg.Action.ConfirmAssetComplete:

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
