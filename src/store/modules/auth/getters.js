export default {
  isLoggedIn(state) {
    return !!state.token
  },
  isAdminRole(state) {
    return state.role === 'admin'
  },
}
