import {
  FETCHING_IPFS,
  IPFS_IS_FETCHED,
  IPFS_ERROR,
  FETCHING_FACT,
  FACT_IS_FETCHED,
  FACT_ERROR
} from '../actions/TransactionDataTypes';

const INITIAL_STATE = {
  transResponseData: [],
  ipfsIsFetching: false,
  ipfsIsFetched: false,
  ipfsError: false,
  factIsFetching: false,
  factIsFetched: false,
  factError: false,
  transError: ""
}

export default function TransactionDataReducers(state = INITIAL_STATE, action) {
  switch (action.type) {

    case FETCHING_IPFS:
      return {
        ...state,
        ipfsIsFetching: true
      }
    case IPFS_IS_FETCHED:
      let ipfsData = { ipfs: action.ipfsHash }
      // state.transResponseData.push()
      return {
        ...state,
        ipfsIsFetched: true,
        ipfsIsFetching: false,
        ...state.transResponseData.push(ipfsData)
      }
    case IPFS_ERROR:
      return {
        ...state,
        ipfsError: true,
        transError: action.error
      }

    case FETCHING_FACT:
      return {
        ...state,
        factIsFetching: true
      }

    case FACT_IS_FETCHED:
      let factHash = { factHash: action.factData }

      return {
        ...state,
        factIsFetched: true,
        factIsFetching: false,
        transResponseData: transResponseData.push(factHash)
      }
    case FACT_ERROR:
      return {
        ...state,
        factError: true,
        transError: action.error
      }

      case CLEAR_STATE:
      return initialState

    default:
      return state
  }
}
