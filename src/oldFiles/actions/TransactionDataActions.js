import {
    FETCHING_IPFS,
    IPFS_IS_FETCHED,
    IPFS_ERROR,
    FETCHING_FACT,
    FACT_IS_FETCHED,
    FACT_ERROR
  } from '../actions/TransactionDataTypes';


  export function fetchingIpfs(){
      return {
          type: FETCHING_IPFS,
        }
  }

  export function ipfsIsFetched(ipfsHash){
    let hash = ipfsHash;
    return {
        type: IPFS_IS_FETCHED,
        ipfsHash: hash
      }
}

export function fetchingFact(){
    return {
        type: FETCHING_FACT,
      }
}

export function factIsFetched(factHash)
{   let hash = factHash;
    return {
        type: FACT_IS_FETCHED,
        factData: hash
    }
}
export function factError(error){
    return {
        type: FACT_ERROR,
        error: error
      }
}