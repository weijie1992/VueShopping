<template>
  <v-form @submit.prevent="submitProduct">
    <v-card class="mx-auto" title="Add Product">
      <v-container>
        <v-alert type="success" v-if="successMessage">{{
          successMessage
        }}</v-alert>
        <v-alert v-if="errorMessage" type="error"> {{ errorMessage }}</v-alert>
        <v-text-field
          label="name"
          v-model.trim="formData.product.name"
          variant="underlined"
        ></v-text-field>
        <v-textarea
          label="description"
          v-model.trim="formData.product.description"
          variant="underlined"
        ></v-textarea>
        <v-text-field
          type="number"
          v-model.trim="formData.product.price"
          variant="underlined"
          label="price"
          :prefix="'$'"
          @input="handleLessThan0"
          class="inputPrice"
          :style="{ 'max-width': '150px' }"
        ></v-text-field>
        <v-combobox
          label="Category"
          v-model="formData.product.category"
          :items="comboBox.categories"
          item-value="_id"
          item-title="name"
          variant="underlined"
          :style="{ 'max-width': '300px' }"
        ></v-combobox>
        <v-text-field
          type="number"
          label="availableQuantity"
          variant="underlined"
          max-width="300"
          @input="handleLessThan0"
          v-model.trim="formData.product.availableQuantity"
          min="0"
          :style="{ 'max-width': '150px' }"
        ></v-text-field>
        <v-combobox
          v-model="formData.product.shippingProviders"
          :items="comboBox.shippingProviders"
          item-value="_id"
          item-title="name"
          label="Shipping Providers"
          variant="underlined"
          multiple
        ></v-combobox>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn type="submit" color="success">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import { mapActions } from 'vuex'
import errorHelper from '../../helpers/error-helper'
import productApi from '../../api/product-api'
import commonMixins from '../../mixins/common'
import { createWatchObject } from '../../mapper/watcher'
import constants from '../../constants/constants'
export default {
  data() {
    return {
      comboBox: {
        categories: [],
        shippingProviders: [],
      },
      formData: {
        successMessage: '',
        errorMessage: '',
        product: { ...constants.defaultProductState },
      },
    }
  },
  computed: {
    errorMessage() {
      return this.formData.errorMessage
    },
    successMessage() {
      return this.formData.successMessage
    },
  },
  mixins: [commonMixins],

  async mounted() {
    try {
      this.setOverlaySpinner(true)
      this.comboBox.categories = (await productApi.getCategories()).results
      this.comboBox.shippingProviders = (
        await productApi.getShippingProviders()
      ).results
    } catch (err) {
      const error = errorHelper.handleSamePageError(err)
      this.formData.errorMessage = error
    } finally {
      this.setOverlaySpinner(false)
    }
  },
  methods: {
    ...mapActions('layout', ['setOverlaySpinner']),
    handleLessThan0() {
      if (this.formData.product.price < 0) {
        this.formData.product.price = 0
      }
      if (this.formData.product.availableQuantity < 0) {
        this.formData.product.availableQuantity = 0
      }
    },
    async submitProduct() {
      try {
        this.setOverlaySpinner(true)
        const res = await productApi.addProduct(this.formData.product)
        this.setFormSuccessMessage(this.formData, res.sucess)
        this.formData.product = { ...constants.defaultProductState }
      } catch (err) {
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.formData, error)
      } finally {
        this.setOverlaySpinner(false)
      }
    },
  },
  watch: {
    ...createWatchObject(
      [
        'formData.product.name',
        'formData.product.description',
        'formData.product.price',
        'formData.product.category.name',
        'formData.product.availableQuantity',
        'formData.product.shippingProviders._id',
      ],
      function (newVal, oldVal) {
        if (newVal !== oldVal && this.formData.errorMessage) {
          this.resetFormErrorMessage(this.formData)
        }
        if (newVal && this.formData.successMessage) {
          this.resetFormSuccessMessage(this.formData)
        }
      }
    ),
  },
}
</script>

<style scoped>
@import '@/assets/no-up-down-num-textfield.css';
</style>
