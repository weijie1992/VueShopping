<template>
  <v-form @submit.prevent="submitForm">
    <v-card class="mx-auto" max-width="344" title="User Registration">
      <v-container>
        <v-alert v-if="errorMessage" type="error" class="mb-3">{{
          errorMessage
        }}</v-alert>
        <v-text-field
          v-model.trim="formData.fullName.value"
          label="full name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model.trim="formData.email.value"
          type="email"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model.trim="formData.password.value"
          type="password"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn type="submit" color="success">
          Complete Registration

          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import routes from '../../constants/routes.js'
import { mapActions } from 'vuex'
import errorHelper from '../../helpers/error-helper'
import factories from '../../factories/inputState'
import commonMixins from '../../mixins/common'
export default {
  data() {
    return {
      formData: {
        errorMessage: '',
        fullName: {
          value: '',
          _inputState: {
            ...factories.createInputState('fullName'),
          },
        },
        email: {
          value: '',
          _inputState: {
            ...factories.createInputState('email'),
          },
        },
        password: {
          value: '',
          _inputState: {
            ...factories.createInputState('password'),
          },
        },
      },
    }
  },
  mixins: [commonMixins],
  computed: {
    fullName() {
      return this.formData.fullName.value
    },
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
  watch: {
    fullName(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.resetFormErrorMessage(this.formData)
      }
    },
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
  methods: {
    ...mapActions('auth', ['registerUser']),
    ...mapActions('layout', ['setOverlaySpinner']),
    async submitForm() {
      try {
        this.setOverlaySpinner(true)
        await this.registerUser({
          fullName: this.fullName,
          email: this.email,
          password: this.password,
        })
        this.$router.push({ name: routes.LANDING })
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
