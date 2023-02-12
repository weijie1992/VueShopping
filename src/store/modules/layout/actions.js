const setOverlaySpinner = (context, payload) => {
  context.commit('SET_OVERLAY_SPINNER', payload)
}
const setSnackbar = (context, payload) => {
  context.commit('SET_SNACKBAR', payload)
}
export default {
  setOverlaySpinner,
  setSnackbar,
}
