<template>
  <v-row class="mt-8">
    <v-col data-testId='product-card' cols="12" sm="6" md="4" v-for="item in computedProductList" :key="item.id">
      <v-card outlined class="rounded-xl">
        <v-img class="white--text align-end" height="250px" :src="item.data.img" gradient="to top, rgba(0,0,0,.2), rgba(255,255,255,0)">
          <v-card-title class="mb-0 text-h5 font-weight-bold">{{item.data.name}}</v-card-title>
          <v-card-subtitle class="white--text text-h6 font-weight-bold">$ {{ item.data.price }}</v-card-subtitle>
        </v-img>
        <v-card-text class="text--primary text-caption">
          {{item.data.text}}
        </v-card-text>
        <v-card-actions>
          <v-btn icon color="pink lighten-2" @click="decrQty(item.id)" :disabled="item.qty === 1">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <span>{{ item.qty }}</span>
          <v-btn icon color="pink lighten-2" @click="incrQty(item.id)" :disabled="item.qty == item.data.stock">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <span v-if="item.qty!=1" class="text-body-2"><span class="text-caption">Total:</span> $ {{ item.data.price * item.qty }}</span>
          <v-btn data-testId="add-to-cart" class="ma-2 align-right" outlined large color="cyan lighten-2" icon @click="addToCart(item)">
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
  methods: {
    incrQty(id) {
      let idx = this.dolls.map(p => p.id).indexOf(id)
      if(this.dolls[idx].qty < this.dolls[idx].data.stock) {
        this.dolls[idx].qty++
      }
    },
    decrQty(id) {
      let idx = this.dolls.map(p => p.id).indexOf(id)
      if(this.dolls[idx].qty > 1) {
        this.dolls[idx].qty--
      }
    },
    addToCart(product) {
      let p = JSON.parse(JSON.stringify(product))
      this.$store.dispatch('addToCart', p)
      product.qty = 1
    },
  },
  computed: {
    ...mapState(['dolls', 'search']),
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