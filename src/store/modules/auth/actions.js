import auth from '../../../api/auth-api'

const registerUser = async (context, payload) => {
  const { fullName, email, password } = payload
  const res = await auth.emailRegistration(fullName, email, password)
  const token = res.token
  context.commit('SET_USER_TOKEN', token)
  //ensure this is from browser
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token)
  }
}
const loginByEmail = async (context, payload) => {
  const { email, password } = payload
  const { success, token, redirect } = await auth.loginByEmail(email, password)
  //ensure this is from browser
  if (success && typeof window !== 'undefined') {
    context.commit('SET_USER_TOKEN', token)
    context.commit('SET_DEFAULT_REDIRECT', redirect)
    localStorage.setItem('token', token)
    return redirect
  }
}
const tryLogin = async (context) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      context.commit('SET_USER_TOKEN', token)
    }
  }
}
const logout = (context) => {
  localStorage.removeItem('token')
  context.commit('SET_USER_TOKEN', null)
  context.commit('SET_DEFAULT_REDIRECT', null)
  //call api to backend
}
export default { registerUser, loginByEmail, tryLogin, logout }
