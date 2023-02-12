import routes from '../constants/routes'
import store from '../store/index'
const handleSamePageError = (error) => {
  return (error.response && error.response.data) || error.message
}

const handleLoginError = (error) => {
  if (error && error.response && error.response.data) {
    store.dispatch('auth/logout')
    switch (error.response.data) {
      case 'jwt expired':
        return { name: routes.LOGIN }

      default:
        return { name: routes.LANDING }
    }
  }
}
export default { handleSamePageError, handleLoginError }
