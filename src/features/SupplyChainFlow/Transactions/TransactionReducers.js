import * as Trans from './TransactionActionNames'


const INITIAL_STATE = {
    modals: {
        metricModal: false,
        camSourceModal: false,
        editModal: false,
        passwordModal: false,

    },
    flags: {

    },
    trans: {
        header: {},
        data: {
            metrics:{},
            images: {},
            documents: {},
            ediT: {},
        }
    },

}


const TransactionReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case Trans.Action.ClearState:
            return INITIAL_STATE


        case Trans.Action.Error:
            return Object.assign({}, {
                ...state,
                Error: {
                    type: action.type,
                    error: action.error
                }
            })

        // Modal State
        case Trans.Action.ShowMetricModal:
            return Object.assing({}, {
                ...state,
                modals: {
                    ...state.modals,
                    metricModal: !state.modals.metricModal
                }
            })

        case Trans.Action.ShowCamSourcModal:
            return Object.assing({}, {
                ...state,
                modals: {
                    ...state.modals,
                    camSourceModal: !state.modals.camSourceModal
                }
            })

        case Trans.Action.ShowEdiTModal:
            return Object.assing({}, {
                ...state,
                modals: {
                    ...state.modals,
                    editModal: !state.modals.editModal
                }
            })
        case Trans.Action.ShowPasswordModal:
            console.log(action, 'assetpassword modal')
            return Object.assign({}, {
                ...state,
                modals: {
                    ...state.modals,
                    passwordModal: !state.modals.passwordModal
                }

            }
            )

        //  Transactions

        case Trans.Action.SetNewOriginTransPassword:
            return Object.assign({}, {
                ...state,
                trans: {
                    ...state.trans,
                    header: {
                        ...state.trans.header,
                        password: action.password
                    }
                }
            })

        case Trans.Action.StartTransaction:
            let tRans = action.trans;
            return Object.assign({}, {
                ...state,
                flags: {
                    transactionStarted: true,
                },
                trans: {
                    ...state.trans,
                    header: {
                        ...state.trans.header,
                        txSide: tRans.header.tXSide,
                        hercId: tRans.header.hercId,
                        name: tRans.header.name,
                        price: tRans.header.price,
                        dTime: tRans.header.dTime
                    }
                },
            })


        case Trans.Action.SetOriginTransInfo:
            return Object.assign({}, {
                ...state,
                flags: {
                    ...state.flags,
                    gotOgTransInfo: true,
                },
                trans: {
                    ...state.trans,
                    header: {
                        ...state.trans.header,
                        OgTransInfo: action.ogTrans
                    }
                }

            })

        case Trans.Action.GetCurrentHercValue:
            return Object.assign({}, state, {
                ...state,
                flags: {
                    gettingHercValue: true
                }
            })

        case Trans.Action.GotDynamicHercValue:
            return Object.assign({}, state, {
                ...state,
                hercValue: action.hercValue
            })

        case Trans.Action.GotNetworkFee:
            return Object.assign({}, state, {
                ...state,
                networkFee: action.fee

            })

        case Trans.Action.TransactionComplete:
            // let trans = action.data;
            return Object.assign({}, state, {
                ...state,
                confTransComplete: true,
            })

        case Trans.Action.AddPhoto:

            return Object.assign({}, state, {
                ...state,
                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        images: action.images
                    }
                }
            })


        case Trans.Action.AddDoc:
            return Object.assign({}, state, {
                ...state,
                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        documents: action.document
                    }
                }
            })

        case Trans.Action.AddMetrics:
            return Object.assign({}, state, {
                ...state,
                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        metrics: action.data
                    }

                }
            })

        case Trans.Action.AddEdiT:

            return Object.assign({}, state, {
                ...state,

                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        ediT: action.item
                    }
                }

            })



        default:
            return state;

    }
}


export default TransactionReducers;
