<template>
  <v-container>
    <v-alert type="success" v-if="!!deleteActions.successMessage">{{
      deleteActions.successMessage
    }}</v-alert>
    <v-alert type="error" v-if="!!deleteActions.errorMessage">{{
      deleteActions.errorMessage
    }}</v-alert>
    <v-alert type="error" v-if="!!selectedCategory.errorMessage">{{
      selectedCategory.errorMessage
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
      single-line
      clearable
    ></v-text-field>

    <EditCategoryDialog
      :selectedCategory="selectedCategory"
      :updateCategory="updateCategory"
    />
    <v-list>
      <v-list-item
        v-for="category in filterCategories"
        :key="category.title"
        class="v-list-item"
      >
        <span class="v-list-item-content">{{ category.name }}</span>
        <template v-slot:append>
          <v-icon @click="getCategory(category._id)">mdi-pencil</v-icon>
          <v-icon @click="deleteCategory(category._id)">mdi-trash-can</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import productApi from '../../api/product-api'
import commonMixins from '../../mixins/common'
import actionsMixins from '../../mixins/actionsMixins'
import errorHelper from '../../helpers/error-helper'
import constants from '../../constants/constants'
import { mapActions } from 'vuex'
import EditCategoryDialog from './EditCategoryDialog.vue'
export default {
  components: {
    EditCategoryDialog,
  },
  data() {
    return {
      categories: {
        value: [],
        errorMessage: '',
      },
      selectedCategory: {
        _id: '',
        defaultValue: '',
        value: '',
        showDialog: false,
        errorMessage: '',
      },
      search: '',
    }
  },
  computed: {
    filterCategories() {
      return this.categories.value.filter((c) => {
        return c.name.includes(this.search)
      })
    },
  },
  mixins: [commonMixins, actionsMixins],
  async mounted() {
    await this.getCategories()
  },
  methods: {
    ...mapActions('layout', ['setOverlaySpinner']),
    async getCategories() {
      try {
        this.categories.value = (await productApi.getCategories()).results
      } catch (err) {
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.categories, error)
      }
    },
    async getCategory(id) {
      try {
        this.setOverlaySpinner(true)
        const res = await productApi.getCategory(id)
        const { _id, name } = res.results
        this.selectedCategory._id = _id
        this.selectedCategory.defaultValue = name
        this.selectedCategory.value = name
        this.selectedCategory.showDialog = true
      } catch (err) {
        this.selectedCategory.showDialog = false
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.deleteActions, error)
      } finally {
        this.setOverlaySpinner(false)
      }
    },
    async deleteCategory(id) {
      try {
        this.setOverlaySpinner(true)
        const res = await productApi.deleteCategory(id)
        if (res.success && res.results._id === id) {
          this.setFormSuccessMessage(
            this.deleteActions,
            `${res.results.name} ${constants.SUCESSFULLYDELETED}`
          )
          this.categories.value = this.categories.value.filter(
            (category) => category._id !== res.results._id
          )
        }
      } catch (err) {
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.deleteActions, error)
      } finally {
        this.setOverlaySpinner(false)
      }
    },
    async updateCategory(id, name, defaultName) {
      try {
        this.setOverlaySpinner(true)
        const res = await productApi.updateCategory(id, name)
        if (res.success && res.results._id === id) {
          this.setFormSuccessMessage(
            this.editActions,
            `${defaultName} ${constants.SUCESSFULLYUPDATED_CATEGORY} ${res.results.name}`
          )
        }
      } catch (err) {
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.editActions, error)
      } finally {
        await this.getCategories()
        this.setOverlaySpinner(false)
        this.selectedCategory.showDialog = false
      }
    },
  },
}
</script>
<style scoped>
.v-list-item {
  transition: all 0.2s ease-in-out;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.v-list-item-content {
  font-size: 18px;
  font-weight: 500;
  padding-right: 24px;
}
</style>
