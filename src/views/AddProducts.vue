<template>
  <v-main align="center">
    <!-- products LIST -->
    <products-list></products-list>
    <!-- ADD NEW PRODUCT BUTTON -->
    <v-btn depressed color="cyan darken-2" class="mt-15" fab dark @click="displayToyform">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <!-- FORM -->
    <products-form></products-form>
    <!-- LOADING -->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-main>
</template>

<script>
import ProductsList from '../components/ProductsList'
import ProductsForm from '../components/ProductsForm'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ProductsList,
    ProductsForm,
  },
  computed: mapState(['loading']),
  methods: mapActions(['displayToyform']),
}
</script>