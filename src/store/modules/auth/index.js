import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state() {
    return {
      email: '',
      role: '',
      username: '',
      token: '',
      redrect: '',
      autoLogout: '', //use to handle auto logout of JWT token, depends if want to implement
    }
  },
  getters,
  mutations,
  actions,
}
