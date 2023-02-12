export default {
  shouldShowOverlay(state) {
    return state.overlaySpinner
  },
  shouldShowSnackbar(state) {
    return state.snackbar.show
  },
  getSnackbarText(state) {
    return state.snackbar.text
  },
}
