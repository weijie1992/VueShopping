<template>
  <div class="text-center">
    <v-dialog
      v-model="selectedCategory.showDialog"
      width="500"
      @keydown.enter="
        updateCategory(
          selectedCategory._id,
          selectedCategory.value,
          selectedCategory.defaultValue
        )
      "
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Update {{ selectedCategory.defaultValue }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model.trim="selectedCategory.value"
            single-line
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            tabindex="0"
            type="submit"
            @click="
              updateCategory(
                selectedCategory._id,
                selectedCategory.value,
                selectedCategory.defaultValue
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
  props: ['selectedCategory', 'updateCategory'],
}
</script>
