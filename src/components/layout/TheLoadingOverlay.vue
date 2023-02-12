<template>
  <section class="center">
    <p>Successful, Redirecting in {{ counter }}</p>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </section>
</template>
<script>
import routes from '../../constants/routes'
import { mapActions } from 'vuex'
export default {
  props: ['text'],
  data() {
    return {
      counter: 3,
      interval: null,
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.counter--
    }, 1000)
  },
  updated() {
    if (this.counter === 0) {
      clearInterval(this.interval)
      this.setSnackbar({ show: true, text: 'Account Successfully Activated!' })
      this.$router.push({ name: routes.LANDING })
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions('layout', ['setSnackbar']),
  },
}
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
