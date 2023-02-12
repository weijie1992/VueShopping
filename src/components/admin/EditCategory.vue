<template>
  <v-container>
    <v-alert type="success" v-if="!!deleteActions.successMessage">{{
      deleteActions.successMessage
    }}</v-alert>
    <v-alert type="error" v-if="!!deleteActions.errorMessage">{{
      deleteActions.errorMessage
    }}</v-alert>
    <v-alert type="error" v-if="!!gettingCategory.errorMessage">{{
      gettingCategory.errorMessage
    }}</v-alert>
    <v-alert type="success" v-if="!!editActions.successMessage">{{
      editActions.successMessage
    }}</v-alert>
    <v-alert type="error" v-if="!!editActions.errorMessage">{{
      editActions.errorMessage
    }}</v-alert>
    <v-text-field
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      label="Search"
      single-line
      clearable
    ></v-text-field>

    <div class="text-center">
      <v-dialog v-model="gettingCategory.showDialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Update {{ gettingCategory.defaultValue }}
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="gettingCategory.value"
              single-line
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="
                updateCategory(
                  gettingCategory._id,
                  gettingCategory.value,
                  gettingCategory.defaultValue
                )
              "
            >
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-list dense>
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
import errorHelper from '../../helpers/error-helper'
import constants from '../../constants/constants'
import factories from '../../factories/inputState'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      categories: {
        value: [],
        errorMessage: null,
      },
      deleteActions: {
        ...factories.createDefaultActions(),
      },
      gettingCategory: {
        _id: null,
        defaultValue: null,
        value: null,
        showDialog: false,
        errorMessage: null,
      },
      editActions: {
        ...factories.createDefaultActions(),
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
  mixins: [commonMixins],
  async mounted() {
    await this.getCategories()
  },
  methods: {
    ...mapActions('layout', ['setOverlaySpinner']),
    async getCategories() {
      try {
        this.categories.value = await productApi.getCategories()
      } catch (err) {
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.categories, error)
      }
    },
    async getCategory(id) {
      try {
        this.setOverlaySpinner(true)
        const res = await productApi.getCategory(id)
        const { _id, name } = res
        this.gettingCategory._id = _id
        this.gettingCategory.defaultValue = name
        this.gettingCategory.value = name
        this.gettingCategory.showDialog = true
      } catch (err) {
        this.gettingCategory.showDialog = false
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
        if (res._id === id) {
          this.setFormSuccessMessage(
            this.deleteActions,
            `${res.name} ${constants.SUCESSFULLYDELETED}`
          )
          this.categories.value = this.categories.value.filter(
            (category) => category._id !== res._id
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

        if (res._id === id) {
          this.setFormSuccessMessage(
            this.editActions,
            `${defaultName} ${constants.SUCESSFULLYUPDATED} ${res.name}`
          )
          this.gettingCategory.showDialog = false
        }
      } catch (err) {
        this.gettingCategory.showDialog = false
        const error = errorHelper.handleSamePageError(err)
        this.setFormErrorMessage(this.editActions, error)
      } finally {
        await this.getCategories()
        this.setOverlaySpinner(false)
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
