import factories from '../factories/inputState'
export default {
  data() {
    return {
      getActions: {
        ...factories.createDefaultActions(),
      },
      deleteActions: {
        ...factories.createDefaultActions(),
      },
      editActions: {
        ...factories.createDefaultActions(),
      },
    }
  },
  watch: {
    'deleteActions.successMessage'() {
      clearTimeout(this.deleteActions.successTimeout)
      this.deleteActions.successTimeout = setTimeout(() => {
        this.deleteActions.successMessage = null
      }, 2000)
    },
    'deleteActions.errorMessage'() {
      clearTimeout(this.deleteActions.errorTimeout)
      this.deleteActions.errorTimeout = setTimeout(() => {
        this.deleteActions.errorMessage = null
      }, 5000)
    },
    'editActions.successMessage'() {
      clearTimeout(this.editActions.successTimeout)
      this.editActions.successTimeout = setTimeout(() => {
        this.editActions.successMessage = null
      }, 2000)
    },
    'editActions.errorMessage'() {
      clearTimeout(this.editActions.errorTimeout)
      this.editActions.errorTimeout = setTimeout(() => {
        this.editActions.errorMessage = null
      }, 5000)
    },
  },
}
