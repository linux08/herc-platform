import { toggleCamSourceModal, toggleCameraModal } from "../actions/ModalVisibilityActions";

const INITIAL_STATE = {
    showCamSourceModal: false,
    showCameraModal: false
}

export default function ModalVisibilityReducers(state = INITIAL_STATE, action) {
    // console.log(action, "action in modalVizRedux", "state: ", state);
    switch (action.type) {

        case "toggleCamSourceModal":
            return {
                ...state,
                showCamSourceModal: action.visible
            }
      
        // case CLEAR_STATE:
        //     return initialState

        default:
            return state
    }


}