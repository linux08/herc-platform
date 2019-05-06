import * as Account from './AccountActionNames';

import store from "../../store";
import firebase from "../../constants/Firebase";
const rootRef = firebase.database().ref();


export function AuthToken(token) {
    return {
        type: Account.Action.AuthToken,
        token
    };
}

export function GetAccount(account) {
  return {
    type: Account.Action.GetAccount,
    account
  };
}

export function GetUsername(edge_account) {
  return {
    type: Account.Action.GetUserName,
    edge_account
  };
}

export function GetOrganization() {
    return dispatch => {
      let username = store.getState().AccountReducers.edge_account;
      let organizationName;
      rootRef.child('idology').child(username).once('value').then(snapshot => {
        organizationName = snapshot.val().organizationName;
        dispatch(GotOrganization(organizationName))
      })
    }
  }

export function GotOrganization(organizationName){
    return {
        type: Account.Action.GotOrganization,
        organizationName
    }
  }

  export function UserFirstTimeLogin(userFirstTimeLogin){
      return {
          type: Account.Action.UserFirstTimeLogin,
          userFirstTimeLogin
      }
    }
