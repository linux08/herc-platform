import TOGGLE_CAM_SOURCE_MODAL from "../actions/ModalVisibilityActions";

const INITIAL_STATE = {
    showCamSourceModal: false,

}

export default function ModalVisibilityReducers(state = INITIAL_STATE, action) {
    switch (action.type) {

        case TOGGLE_CAM_SOURCE_MODAL:
            return {
                showCamSourceModal: action.visibile
            }
        // case CLEAR_STATE:
        //     return initialState

        default:
            return state
    }


}