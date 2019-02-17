import * as Trans from './TransactionActionNames'
const INITIAL_STATE = {
    metricModal: false,
    camSourceModal: false,
    editModal: false,
    trans: {},

}


const TransactionReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        
        case Trans.Action.ShowMetricModal:
            return {
                ...state,
                metricModal: !state.metricModal
            }
        case Trans.Action.ShowCamSourcModal:
            return {
                ...state,
                camSourceModal: !state.camSourceModal
            }
        case Trans.Action.ShowEdiTModal:
            return {
                ...state,
                editModal: !state.editModal
            }


        case Trans.Action.StartTransaction:

            return  Object.assign({}, {
                ...state,
                trans: action.trans
                 })
            

        case Trans.Action.SetOriginTransInfo:
            return Object.assign({},{
                ...state,
                gotOgTransInfo: true,
                trans: {
                    ...state.trans,
                    header: {
                        ...state.trans.header,
                    OgTransInfo: action.ogTrans 
                    }
                }

            })

        case Trans.Action.TransactionComplete:
            // let trans = action.data;
            return Object.assign({}, state, {
                ...state,
                transDataFlags: {
                    ...state.transDataFlags,
                    confTransComplete: true,
                },

                trans: {
                    ...state.trans,
                }
            }
            )

        case Trans.Action.AddPhoto:
            let images = {
                image: action.data,
                size: action.size,
                uri: action.uri
            };

            // let images = [...state.selectedAsset.trans.data.images, image];
            return Object.assign({}, state, {
                ...state,


                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        images
                    }
                }
            })


        case Trans.Action.AddDoc:
            let documents = action.document;
            // let documents = [...state.selectedAsset.trans.data.documents, doc];
            return Object.assign({}, state, {
                ...state,
                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        documents
                    }
                }
            })

        case Trans.Action.AddMetrics:
            const properties = action.data;
            return Object.assign({}, state, {
                ...state,

                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        properties
                    }

                }
            })

        case Trans.Action.AddEdiT:
            const ediT = action.item
            return Object.assign({}, state, {
                ...state,
                ...state.trans,
                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        ediT
                    }
                }

            })



        default:
            return state;
    }
}


export default TransactionReducers;
