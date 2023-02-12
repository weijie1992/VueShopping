const getLocalStorageToken = () => {
  return localStorage.getItem('token') || null
}
export default {
  getLocalStorageToken
}
