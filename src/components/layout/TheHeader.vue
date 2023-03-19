<template>
  <!-- <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  > -->
  <v-app-bar color="white-lighten-1">
    <!-- <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template> -->

    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->
    <!-- style="max-width: 1200px"  -->
    <v-container class="d-flex pa-0 width-style">
      <v-app-bar-title>Carousell</v-app-bar-title>

      <v-spacer></v-spacer>

      <div v-if="!isLoggedIn">
        <router-link :to="{ name: registerRoute }"
          ><v-btn variant="text">Register</v-btn></router-link
        >
        <router-link :to="{ name: loginRoute }" v-if="!isLoggedIn">
          <v-btn variant="text">Login</v-btn></router-link
        >
      </div>
      <div v-else>
        <router-link :to="{ name: loginRoute }" v-if="isLoggedIn">
          <v-btn variant="text" @click="logout">Logout</v-btn>
        </router-link>
      </div>
    </v-container>
  </v-app-bar>
</template>
<script>
import routes from '../../constants/routes'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      registerRoute: routes.REGISTER,
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    loginRoute() {
      return routes.LOGIN
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),
  },
}
</script>
<style scoped>
@import '@/assets/the-header.css';
</style>
