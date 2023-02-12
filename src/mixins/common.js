export default {
  methods: {
    getErrorMessage(parentObj, key) {
      return parentObj._inputState[key].errorMsg
    },
    setErrorMessage(key, error) {
      this._inputState[key].errorMsg = error
    },
    resetErrorMessage(key) {
      this._inputState[key].errorMsg = ''
    },
    setFormErrorMessage(key, error) {
      key.errorMessage = error
    },
    resetFormErrorMessage(formData) {
      formData.errorMessage = null
    },
    setFormSuccessMessage(key, message) {
      key.successMessage = typeof message === 'string' ? message : 'Success'
    },
    resetFormSuccessMessage(formData) {
      formData.successMessage = null
    },
  },
}
