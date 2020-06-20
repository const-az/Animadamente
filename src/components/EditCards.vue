<template>
  <v-row>
  <!-- PRODUCT CARDS: -->
    <!-- Creates a card for every product registered  -->
    <v-col cols="6" sm="6" md="2" v-for="item in computedProductList" :key="item.id">
      <!-- Card -->
      <v-card outlined class="rounded-xl">
        <!-- Product image -->
        <v-img class="align-center justify-center" height="150px" :src="item.data.img">
          <!-- Edit product -->
          <v-btn icon x-large color="white" @click="editDoll(item.id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <!-- Delete product -->
          <v-btn icon x-large color="white" @click="deleteConfirmation(item.id, item.data.name)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['editDoll','deleteConfirmation']),
  },
  computed: {
    ...mapState(['dolls', 'currentDoll',]),
    // Returns data
    computedProductList(){
      return this.dolls
    }
  },
  created(){
    this.$store.dispatch('getDolls')
  }
}
</script>