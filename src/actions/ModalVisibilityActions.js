import TOGGLE_CAM_SOURCE_MODAL from "./types";

export function toggleCamSourceModal(toggle) {
    return (
        {
            type: TOGGLE_CAM_SOURCE_MODAL,
            visible: toggle
        }
    )
}