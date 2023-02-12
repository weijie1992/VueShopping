const createInputState = (...keys) => {
  const inputState = {}
  keys.forEach((k) => {
    inputState[k] = { errorMsg: '' }
  })
  return inputState
}

const createLoadingState = (isLoading = false) => {
  isLoading = isLoading
}

const createDefaultActions = () => {
  return {
    successMessage: null,
    errorMessage: null,
    successTimeout: null,
    errorTimeout: null,
  }
}

export default { createInputState, createLoadingState, createDefaultActions }
