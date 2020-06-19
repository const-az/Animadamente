<template>
  <v-row class="mt-8">
    <!-- Creates cards for every doll -->
    <v-col cols="12" sm="6" md="4" v-for="item in computedProductList" :key="item.id">
      <!-- Card -->
      <v-card outlined class="rounded-xl">
        <!-- Product image -->
        <v-img class="white--text align-end" height="250px" :src="item.data.img">
          <!-- Product name -->
          <v-card-title class="mb-0 text-h5 font-weight-b">{{item.data.name}}</v-card-title>
          <!-- Product price -->
          <v-card-subtitle class="white--text text-h6 font-weight-bold">$ {{ item.data.price }}</v-card-subtitle>
        </v-img>
        <!-- Product description -->
        <v-card-text class="text--primary">
          {{item.data.text}}
        </v-card-text>
        <!-- Action buttons -->
        <v-card-actions>
        <!-- Counter -->
          <!-- Minus -->
          <v-btn icon color="pink lighten-2" @click="decrQty(item.id)" :disabled="item.qty === 1">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <!-- Quantity -->
          <span>{{ item.qty }}</span>
          <!-- Plus -->
          <v-btn icon color="pink lighten-2" @click="incrQty(item.id)" :disabled="item.qty == item.data.stock">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        <!-- Add to cart -->
          <span v-if="item.qty!=1" class="text-caption">Subtotal: $ {{ item.data.price * item.qty }}</span>
          <v-btn class="ma-2 align-right" outlined large color="cyan lighten-2" icon @click="addToCart(item)">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data(){
    return {
      search: '',
    }
  },
  methods: {
    // Increases quantity of every product
    incrQty(id) {
      let idx = this.dolls.map(p => p.id).indexOf(id)
      if(this.dolls[idx].qty < this.dolls[idx].data.stock) {
        this.dolls[idx].qty++
      }
    },
    // Decreases quantity of every product
    decrQty(id) {
      let idx = this.dolls.map(p => p.id).indexOf(id)
      if(this.dolls[idx].qty > 1) {
        this.dolls[idx].qty--
      }
    },
    // Add product to cart
    addToCart(product) {
      // push a copy of product to cart
      let p = JSON.parse(JSON.stringify(product))
      this.$store.dispatch('addToCart', p)
      // reset qty
      product.qty = 1
    },
  },
  computed: {
    ...mapState(['dolls']),
    // Returns data
    computedProductList(){
      return this.dolls.filter(p => {
        return p.data.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created(){
    this.$store.dispatch('getDolls')
  }
}
</script>