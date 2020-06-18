<template>
  <v-row class="mt-8">
    <!-- Creates cards for every toy -->
    <v-col cols="12" sm="6" md="4" v-for="item in computedProductList" :key="item.id">
      <!-- Card -->
      <v-card outlined class="rounded-xl">
        <!-- Product image -->
        <v-img class="white--text align-end" height="200px" :src="item.data.img">
          <v-card-title>{{item.data.name}}</v-card-title>
        </v-img>
        <!-- Product price -->
        <v-card-subtitle>$ {{item.data.price * item.qty}}</v-card-subtitle>
        <!-- Product description -->
        <v-card-text class="text--primary">
          {{item.data.text}}
        </v-card-text>
        <!-- Action buttons -->
        <v-card-actions>
        <!-- Counter -->
          <!-- Minus -->
          <v-btn icon color="deep-orange" @click="decrQty(item.id)" :disabled="item.qty === 1">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <!-- Quantity -->
          <span>{{ item.qty }}</span>
          <!-- Plus -->
          <v-btn icon color="deep-orange" @click="incrQty(item.id)" :disabled="item.qty == item.data.stock">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        <!-- Add to cart -->
          <v-btn class="ma-2 align-right" outlined large color="teal" icon @click="addToCart(item)">
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
      let idx = this.toys.map(p => p.id).indexOf(id)
      if(this.toys[idx].qty < this.toys[idx].data.stock) {
        this.toys[idx].qty++
      }
    },
    // Decreases quantity of every product
    decrQty(id) {
      let idx = this.toys.map(p => p.id).indexOf(id)
      if(this.toys[idx].qty > 1) {
        this.toys[idx].qty--
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
    ...mapState(['toys']),
    // Returns data
    computedProductList(){
      return this.toys.filter(p => {
        return p.data.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created(){
    this.$store.dispatch('getToys')
  }
}
</script>