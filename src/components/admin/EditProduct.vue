<template>
  <v-container>
    <v-alert type="error" v-if="!!products.errorMessage">{{
      products.errorMessage
    }}</v-alert>

    <v-alert type="error" v-if="!!getActions.errorMessage">{{
      getActions.errorMessage
    }}</v-alert>

    <v-alert type="success" v-if="!!deleteActions.successMessage">{{
      deleteActions.successMessage
    }}</v-alert>
    <v-alert type="error" v-if="!!deleteActions.errorMessage">{{
      deleteActions.errorMessage
    }}</v-alert>

    <v-alert type="success" v-if="!!editActions.successMessage">{{
      editActions.successMessage
    }}</v-alert>
    <v-alert type="error" v-if="!!editActions.errorMessage">{{
      editActions.errorMessage
    }}</v-alert>

    <v-text-field
      v-model.trim="search"
      prepend-inner-icon="mdi-magnify"
      label="Search"
      clearable
      single-line
    ></v-text-field>

    <EditProductDialog
      :selectedProduct="selectedProduct"
      :updateProduct="updateProduct"
      :comboBox="comboBox"
    />

    <v-list>
      <v-list-item
        v-for="product in filteredProducts"
        :key="product._id"
        class="v-list-item"
      >
        <span class="v-list-item-content">{{ product.name }}</span>
        <template v-slot:append>
          <v-icon @click="getProduct(product._id)">mdi-pencil</v-icon>
          <v-icon @click="deleteProduct(product._id)">mdi-trash-can</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import productApi from '../../api/product-api'
import { mapActions } from 'vuex'
import errorHelper from '../../helpers/error-helper'
import commonMixins from '../../mixins/common'
import actionsMixins from '../../mixins/actionsMixins'
import constants from '../../constants/constants'
import EditProductDialog from './EditProductDialog.vue'
import productMapper from '../../mapper/productMapper'
export default {
  components: {
    EditProductDialog,
  },
  data() {
    return {
      comboBox: {
        categories: [],
        shippingProviders: [],
      },
      products: {
        value: [],
        errorMessage: '',
      },
      selectedProduct: {
        _id: '',
        defaultValue: {},
        value: {},
        showDialog: false,
        errorMessage: '',
      },
      search: '',
    }
  },
  mixins: [commonMixins, actionsMixins],
  async mounted() {
    try {
      this.setOverlaySpinner(true)
      this.products.value = (await productApi.getProducts()).results
      this.comboBox.categories = (await productApi.getCategories()).results
      this.comboBox.shippingProviders = (
        await productApi.getShippingProviders()
      ).results
    } catch (err) {
      const error = errorHelper.handleSamePageError(err)
      this.setFormErrorMessage(this.products, error)
    } finally {
      this.setOverlaySpinner(false)
    }
  },
  computed: {
    filteredProducts() {
      return this.products.value.filter((p) => p.name.includes(this.search))
    },
  },
  methods: {
    ...mapActions('layout', ['setOverlaySpinner']),
    handleLessThan0() {
      if (this.selectedProduct.value.price < 0) {
        this.selectedProduct.value.price = 0
      }
      if (this.selectedProduct.value.availableQuantity < 0) {
        this.selectedProduct.value.availableQuantity = 0
      }
    },
    async deleteProduct(id) {
      try {
        this.setOverlaySpinner(true)
        const res = await productApi.deleteProduct(id)
        if (res.success && res.results._id === id) {
          this.setFormSuccessMessage(
            this.deleteActions,
            `${res.results.name} ${constants.SUCESSFULLYDELETED}`
          )
          this.products.value = this.products.value.filter((p) => p._id !== id)
        }
      } catch (err) {
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.deleteActions, error)
      } finally {
        this.setOverlaySpinner(false)
        this.selectedProduct.showDialog(false)
      }
    },
    async getProduct(id) {
      try {
        this.setOverlaySpinner(true)

        const res = await productApi.getProduct(id)
        const mappedResults = productMapper.filterProduct(res.results)
        this.selectedProduct._id = res.results._id
        this.selectedProduct.defaultValue = { ...mappedResults }
        this.selectedProduct.value = { ...mappedResults }
        this.selectedProduct.showDialog = true
      } catch (err) {
        this.selectedProduct.showDialog = false
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.getActions, error)
      } finally {
        this.setOverlaySpinner(false)
      }
    },
    async updateProduct(id, value, defaultValue) {
      try {
        this.setOverlaySpinner(true)
        const res = await productApi.updateProduct(id, value)
        if (res.success && res.results._id === id) {
          this.setFormSuccessMessage(
            this.editActions,
            `${defaultValue.name} ${constants.SUCESSFULLYUPDATED_PRODUCT}`
          )
        }
      } catch (err) {
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.editActions, error)
      } finally {
        this.products.value = (await productApi.getProducts()).results
        this.setOverlaySpinner(false)
        this.selectedProduct.showDialog = false
      }
    },
  },
}
</script>

<style scoped>
@import '@/assets/list.css';
</style>
