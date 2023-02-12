<template>
  <TheLoadingOverlay
    v-if="displayLoadingOverlay"
    text="Successfully Registered"
  />
  <RegistrationError
    v-if="displayRegistrationError"
    :errorMessage="errorMessage"
  />
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import auth from '../../api/auth-api.js'
import TheLoadingOverlay from '../../components/layout/TheLoadingOverlay.vue'
import RegistrationError from '../../components/layout/RegistrationError.vue'
import errorHelper from '../../helpers/error-helper'
export default {
  components: {
    TheLoadingOverlay,
    RegistrationError,
  },
  props: ['base64Token'],
  data() {
    return {
      displayLoadingOverlay: false,
      displayRegistrationError: false,
      errorMessage: null,
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('layout', ['shouldShowOverlay']),
  },
  watch: {
    isLoggedIn: {
      async handler() {
        try {
          this.setOverlaySpinner(true)
          const token = window.atob(this.base64Token)
          if (!token) {
            throw new Error('Token not provided')
          }
          const response = await auth.emailActivation(token)
          if (response.success) this.displayLoadingOverlay = true
        } catch (err) {
          const error = errorHelper.handleSamePageError(err)
          this.displayRegistrationError = true
          this.errorMessage = error
        } finally {
          this.setOverlaySpinner(false)
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('layout', ['setOverlaySpinner']),
  },
}
</script>
