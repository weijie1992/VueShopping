<template>
  <v-content>
    <v-container>
      <div class="block text-center notFound">
        <h2>Page not found</h2>
        <i class="fas fa-exclamation-triangle red--text"></i>
        <p>We're sorry, the page you requested could not be found</p>
        {{ homepage }}
        <router-link :to="{ name: landing }">Back to Homepage</router-link>
      </div>
    </v-container>
  </v-content>
</template>
<script>
import routes from '../constants/routes'
export default {
  data() {
    return {
      landing: routes.LANDING,
    }
  },
}
</script>
