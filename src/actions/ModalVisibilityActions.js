import { TOGGLE_CAM_SOURCE_MODAL, TOGGLE_CAMERA_MODAL } from "./types";

export function toggleCamSourceModal(toggle) {
    return {
        type: TOGGLE_CAM_SOURCE_MODAL,
        visible: toggle
    };

}

export function toggleCameraModal(toggle) {
    return {
        type: TOGGLE_CAMERA_MODAL,
        visible: toggle
    };

}