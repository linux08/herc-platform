        import * as Account from './AccountActionNames';
        import store from "../../store";
import firebase from "../../constants/Firebase";
const rootRef = firebase.database().ref();
const INITIAL_STATE = {
  UserFirstTimeLogin: false
}

const AccountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case Account.Action.AuthToken:
            let token = action.token;
            // console.log('Token captured in reducer', token);
            return Object.assign({}, state, {
                ...state,
                auth_token: token
            })

        case Account.Action.GetAccount:
                let account = action.account;
                return Object.assign({}, state, {
                    ...state,
                    account
                })

        case Account.Action.GetUserName:
            let edge_account = action.edge_account;
            return Object.assign({}, state, {
                ...state,
                edge_account: edge_account
            })

        case Account.Action.UserFirstTimeLogin:
            let userFirstTimeLogin = action.UserFirstTimeLogin;
            return Object.assign({}, state, {
                ...state,
                userFirstTimeLogin: userFirstTimeLogin
            })


        case Account.Action.GotOrganization:
            let organizationName = action.organizationName;
            return Object.assign({}, state, {
                ...state,
                organizationName: organizationName
            })
            default:
            return state
    }
}

export default AccountReducer;
