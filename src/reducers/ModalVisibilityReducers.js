import {toggleCamSourceModal} from "../actions/ModalVisibilityActions";

const INITIAL_STATE = {
    showCamSourceModal: false,
}

export default function ModalVisibilityReducers(state = INITIAL_STATE, action) {
    console.log(action, "action in modalVizRedux");
    switch (action.type) {

        case "toggleCamSourceModal":
            return {
                showCamSourceModal: action.visible
            }
        // case CLEAR_STATE:
        //     return initialState

        default:
            return state
    }


}