export default {
  SET_OVERLAY_SPINNER(state, payload) {
    state.overlaySpinner = payload
  },
  SET_SNACKBAR(state, payload) {
    state.snackbar.show = payload.show
    state.snackbar.text = payload.text
  },
}
