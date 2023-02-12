<template>
  <v-form @submit.prevent="submitForm">
    <v-card class="mx-auto" max-width="344" title="User Login">
      <v-container>
        <v-alert v-if="errorMessage" type="error" class="mb-3">{{
          errorMessage
        }}</v-alert>
        <v-text-field
          v-model="formData.email.value"
          type="email"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="formData.password.value"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
          type="password"
        ></v-text-field>

        <v-checkbox
          v-model="formData.savePW.value"
          label="Save login for 7 days"
        ></v-checkbox>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" type="submit">
          Login
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import factories from '../../factories/inputState'
import routes from '../../constants/routes.js'
import { mapActions } from 'vuex'
import commonMixins from '../../mixins/common'
import errorHelper from '../../helpers/error-helper'
export default {
  data() {
    return {
      formData: {
        errorMessage: null,
        email: {
          value: null,
          _inputState: {
            ...factories.createInputState('email'),
          },
        },
        password: {
          value: null,
          _inputState: {
            ...factories.createInputState('password'),
          },
        },
        savePW: {
          value: true,
        },
      },
    }
  },
  mixins: [commonMixins],
  watch: {
    email(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.resetFormErrorMessage(this.formData)
      }
    },
    password(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.resetFormErrorMessage(this.formData)
      }
    },
  },
  computed: {
    email() {
      return this.formData.email.value
    },
    password() {
      return this.formData.password.value
    },
    errorMessage() {
      return this.formData.errorMessage
    },
  },
  methods: {
    ...mapActions('layout', ['setOverlaySpinner']),
    ...mapActions('auth', ['loginByEmail']),
    async submitForm() {
      try {
        this.setOverlaySpinner(true)
        const redirect = await this.loginByEmail({
          email: this.email,
          password: this.password,
        })
        this.$router.push({
          name: redirect === 'admin' ? routes.ADMINDASHBOARD : routes.LANDING,
        })
      } catch (err) {
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.formData, error)
      } finally {
        this.setOverlaySpinner(false)
      }
    },
  },
}
</script>
