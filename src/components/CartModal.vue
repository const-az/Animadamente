<template>
  <!-- Shopping cart detail -->
  <v-dialog overlay-color="pink lighten-5" overlay-opacity="0.5" :value="showModal" max-width="500px" persistent>
    <v-card class="pa-3">
      <v-card-actions>
        <!-- Close button -->
        <v-btn icon small fab color="pink lighten-4" @click="showModal=false">
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <!-- Clear cart button -->
        <v-btn small depressed icon color="cyan lighten-2" 
          data-testId='clearcart' @click="$store.dispatch('clearCart')"
          v-if="$store.getters.shoppingCart.list!=''">
          <v-icon>mdi-cart-off</v-icon>
        </v-btn>
      </v-card-actions>
      <!-- Header -->
      <v-card-title class="justify-center pt-0">
        <!-- Modal title: depending on if cart is empty or not -->
        <span class="mb-4">{{ $store.getters.shoppingCart.list!='' ? 'Tus productos:' : 'Carrito vacío.' }}</span>
      </v-card-title>
      <!-- Input to update data -->
      <v-card-text data-testId="shopping-cart-item" class="pb-0" v-if="$store.getters.shoppingCart.list!=''">
        <v-divider class="mb-5"></v-divider>
        <!-- Creates row for every product on cart -->
        <div v-for="item in $store.getters.shoppingCart.list" :key="item.id">
          <v-row dense align="center" class="text-center">
            <!-- Remove specific item from shopping cart -->
            <v-col cols="2" sm="6" md="2">
              <v-btn icon small color="pink lighten-3" @click="$store.dispatch('removeFromCart', item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
            <!-- Image product -->
            <v-col cols="10" sm="4" md="2">
              <v-img :src="item.data.img"></v-img>
            </v-col>
            <!-- Quantity -->
            <v-col cols="2" sm="2" md="2">
              <span>{{ item.qty }}x</span>
            </v-col>
            <!-- Product image -->
            <v-col cols="6" sm="6" md="4">
              <span>{{ item.data.name }}</span>
            </v-col>
            <!-- Product total price -->
            <v-col cols="4" sm="6" md="2">
              <span>$ {{ item.data.price * item.qty}}</span>
            </v-col>
          </v-row>
          <v-divider class="my-5"></v-divider>
        </div>
        <!-- Total -->
        <p class="text-h6 text-right"><span class="text-subtitle-1 mr-2">Total:</span> $ {{ $store.getters.shoppingCart.total }}</p>
      </v-card-text>
      <!-- Buttons to save product or close form -->
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