<template>
  <v-content>
    <v-container>
      <div class="block text-center notFound">
        <h2>Something went wrong</h2>
        <p>{{ errorMessage }}</p>
        <p>We're sorry, the page you requested could not be found</p>
        {{ homepage }}
        <router-link :to="{ name: landing }">Back to Homepage</router-link>
      </div>
    </v-container>
  </v-content>
</template>
<script>
import routes from '../../constants/routes'
export default {
  props: ['errorMessage'],
  data() {
    return {
      landing: routes.LANDING,
    }
  },
}
</script>
