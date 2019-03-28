import * as CamSource from "./CamSourceActionNames";

const INITIAL_STATE = {
    showCamSourceModal: false,
}

export default function CamSourceModalReducers(state = INITIAL_STATE, action) {
    // console.log(action, "action in modalVizRedux", "state: ", state);
    switch (action.type) {

        case CamSource.Action.ToggleCamSourceModal:
            return {
               
                showCamSourceModal: !state.showCamSourceModal
            }
      

        default:
            return state
    }


}