<template>
  <v-dialog overlay-color="pink lighten-5" overlay-opacity="0.5" :value="showModal" max-width="500px" persistent>
    <v-card class="pa-3">
      <v-card-actions>
        <v-btn icon small fab color="pink lighten-4" @click="showModal=false">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn small depressed icon color="cyan lighten-2" 
          data-testId='clearcart' @click="$store.dispatch('clearCart')"
          v-if="$store.getters.shoppingCart.list!=''">
          <v-icon>mdi-cart-off</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-title class="justify-center pt-0">
        <span class="mb-4">{{ $store.getters.shoppingCart.list!='' ? 'Tus productos:' : 'Carrito vacío.' }}</span>
      </v-card-title>
      <v-card-text data-testId="shopping-cart-item" class="pb-0" v-if="$store.getters.shoppingCart.list!=''">
        <v-divider class="mb-5"></v-divider>
        <div v-for="item in $store.getters.shoppingCart.list" :key="item.id">
          <v-row dense align="center" class="text-center">
            <v-col cols="2" sm="6" md="2">
              <v-btn icon small color="pink lighten-3" @click="$store.dispatch('removeFromCart', item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="10" sm="4" md="2">
              <v-img :src="item.data.img"></v-img>
            </v-col>
            <v-col cols="2" sm="2" md="2">
              <span>{{ item.qty }}x</span>
            </v-col>
            <v-col cols="6" sm="6" md="4">
              <span>{{ item.data.name }}</span>
            </v-col>
            <v-col cols="4" sm="6" md="2">
              <span>$ {{ item.data.price * item.qty}}</span>
            </v-col>
          </v-row>
          <v-divider class="my-5"></v-divider>
        </div>
        <p class="text-h6 text-right"><span class="text-subtitle-1 mr-2">Total:</span> $ {{ $store.getters.shoppingCart.total }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cyan lighten-1" small rounded outlined @click="showModal=false">Volver</v-btn>
        <v-btn color="cyan lighten-1" small rounded depressed dark v-if="$store.getters.shoppingCart.list!=''">Finalizar compra</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    showModal: {
    get(){ return this.$store.getters.showCart },
    set(val){ this.$store.dispatch('updateShowCart', val) }
    },
  }
}
</script>