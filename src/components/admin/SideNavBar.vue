<template>
  <v-card class="mx-auto" tile>
    <v-list density="compact">
      <v-list-item :to="{ name: addCategory }">Add Category</v-list-item>
      <v-list-item :to="{ name: editCategory }">Edit Category</v-list-item>
      <v-list-item :to="{ name: addProduct }">Add Product</v-list-item>
      <v-list-item :to="{ name: editProduct }">Edit Product</v-list-item>
      <v-list-item :to="{ name: viewOrders }">View Orders</v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import routes from '../../constants/routes'
export default {
  data() {
    return {
      addCategory: routes.ADDCATEGORY,
      editCategory: routes.EDITCATEGORY,
      addProduct: routes.ADDPRODUCT,
      editProduct: routes.EDITPRODUCT,
      viewOrders: routes.VIEWORDERS,
    }
  },
}
</script>
