<template>
  <v-row class="custom-breakpoint">
    <v-col class="cols-right"><SideNavBar /></v-col>
    <v-col class="cols-left"><router-view></router-view></v-col>
  </v-row>
</template>
<script>
import SideNavBar from '../../components/admin/SideNavBar.vue'
export default {
  components: {
    SideNavBar,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
/* .custom-breakpoint .v-col {
  flex-basis: 100%;
} */
.cols-right {
  flex: 0 0 25%;
  max-width: 25%;
}
.cols-left {
  flex: 0 0 75%;
  max-width: 75%;
}
@media (max-width: 500px) {
  .cols-right,
  .cols-left {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
