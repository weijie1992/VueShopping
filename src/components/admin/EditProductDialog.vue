<template>
  <div class="text-center">
    <v-dialog
      v-model="selectedProduct.showDialog"
      width="500"
      @keydown.enter="
        () => {
          if (
            JSON.stringify(selectedProduct.value) !==
            JSON.stringify(selectedProduct.defaultValue)
          ) {
            updateProduct(
              selectedProduct._id,
              selectedProduct.value,
              selectedProduct.defaultValue
            )
          }
        }
      "
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Update {{ selectedProduct.defaultValue.name }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="name"
            v-model.trim="selectedProduct.value.name"
            variant="underlined"
          ></v-text-field>

          <v-textarea
            label="description"
            v-model.trim="selectedProduct.value.description"
            variant="underlined"
          ></v-textarea>

          <v-text-field
            type="number"
            v-model.trim="selectedProduct.value.price"
            variant="underlined"
            label="price"
            :prefix="'$'"
            @input="handleLessThan0"
            class="inputPrice"
            :style="{ 'max-width': '150px' }"
          ></v-text-field>

          <v-combobox
            label="Category"
            v-model="selectedProduct.value.category"
            :items="comboBox.categories"
            item-value="_id"
            item-title="name"
            variant="underlined"
            :style="{ 'max-width': '300px' }"
          ></v-combobox>

          <v-text-field
            type="number"
            label="availableQuantity"
            variant="underlined"
            max-width="300"
            @input="handleLessThan0"
            v-model.trim="selectedProduct.value.availableQuantity"
            min="0"
            :style="{ 'max-width': '150px' }"
          ></v-text-field>

          <v-combobox
            v-model="selectedProduct.value.shippingProviders"
            :items="comboBox.shippingProviders"
            item-value="_id"
            item-title="name"
            label="Shipping Providers"
            variant="underlined"
            multiple
          ></v-combobox>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            tabindex="0"
            type="submit"
            :disabled="
              JSON.stringify(selectedProduct.value) ===
              JSON.stringify(selectedProduct.defaultValue)
            "
            @click="
              updateProduct(
                selectedProduct._id,
                selectedProduct.value,
                selectedProduct.defaultValue
              )
            "
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['selectedProduct', 'updateProduct','comboBox'],
  methods: {
    handleLessThan0() {
      if (this.selectedProduct.value.price < 0) {
        this.selectedProduct.value.price = 0
      }
      if (this.selectedProduct.value.availableQuantity < 0) {
        this.selectedProduct.value.availableQuantity = 0
      }
    },
  },
}
</script>
