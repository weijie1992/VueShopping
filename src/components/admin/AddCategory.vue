<template>
  <v-form @submit.prevent="submitCategory">
    <v-card class="mx-auto" title="Add Category">
      <v-container>
        <v-alert type="success" v-if="!!successMessage">{{
          successMessage
        }}</v-alert>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-text-field
          label="Category"
          variant="underlined"
          v-model="formData.category.value"
        ></v-text-field
      ></v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn type="submit" color="success">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import factories from '../../factories/inputState'
import { mapActions } from 'vuex'
import productApi from '../../api/product-api'
import errorHelper from '../../helpers/error-helper'
import commonMixins from '../../mixins/common'
export default {
  data() {
    return {
      formData: {
        successMessage: null,
        errorMessage: null,
        category: {
          value: null,
          _inputState: {
            ...factories.createInputState('category'),
          },
        },
      },
    }
  },
  mixins: [commonMixins],
  watch: {
    category(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.resetFormSuccessMessage(this.formData)
        this.resetFormErrorMessage(this.formData)
      }
    },
  },
  computed: {
    category() {
      return this.formData.category.value
    },
    errorMessage() {
      return this.formData.errorMessage
    },
    successMessage() {
      return this.formData.successMessage
    },
  },
  methods: {
    ...mapActions('layout', ['setOverlaySpinner']),
    async submitCategory() {
      try {
        await this.setOverlaySpinner(true)
        const res = await productApi.addCategory(this.category)
        this.setFormSuccessMessage(this.formData, res)
        this.formData.category.value = null
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
