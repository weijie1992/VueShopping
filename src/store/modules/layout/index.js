import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state() {
    return {
      overlaySpinner: false,
      snackbar: {
        show: false,
        text: '',
      },
    }
  },
  getters,
  mutations,
  actions,
}
