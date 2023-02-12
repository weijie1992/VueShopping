<template>
  <v-app style="z-index: 0">
    <v-overlay v-model="shouldShowOverlay" class="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>

    <!-- <v-app-bar color="pink-lighten-2"></v-app-bar> -->
    <the-header v-if="!$route.meta.hideHeader"></the-header>
    <v-main>
      <v-container class="mt-8">
        <v-snackbar v-model="shouldShowSnackbar" location="top">
          {{ getSnackbarText }}

          <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="closeSnackbar">
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <router-view v-if="isTryingToLogin"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import errorHelper from './helpers/error-helper'
import { mapGetters, mapActions } from 'vuex'
import routes from './constants/routes'
export default {
  components: { TheHeader },
  name: 'App',
  data() {
    return {
      isTryingToLogin: false,
    }
  },
  async created() {
    try {
      this.isTryingToLogin = false
      await this.tryLogin()
      this.isTryingToLogin = true
    } catch (err) {
      const errorPage = errorHelper.handleLoginError(err)
      this.$router.push(errorPage)
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    shouldShowOverlay() {
      return this.$store.getters['layout/shouldShowOverlay']
    },
    shouldShowSnackbar() {
      return this.$store.getters['layout/shouldShowSnackbar']
    },
    getSnackbarText() {
      return this.$store.getters['layout/getSnackbarText']
    },
  },
  methods: {
    ...mapActions('auth', ['tryLogin']),
    ...mapActions('layout', ['setSnackbar']),
    closeSnackbar() {
      this.setSnackbar({ show: false, text: '' })
    },
  },
}
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
