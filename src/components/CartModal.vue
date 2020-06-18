<template>
  <!-- Shopping cart detail -->
  <v-dialog :value="showModal" max-width="500px" persistent>
    <v-card class="pa-3">
      <!-- Header -->
      <v-card-title>
        <!-- Modal title: depending on if cart is empty or not -->
        <span class="headline">{{ $store.getters.shoppingCart.list!='' ? 'Éstos son tus productos:' : 'Tu carrito de compras está vacío.' }}</span>
        <v-spacer></v-spacer>
        <!-- Close button -->
        <v-btn icon small color="pink" @click="showModal=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <!-- Input to update data -->
      <v-card-text v-if="$store.getters.shoppingCart.list!=''">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <!-- Fills shopping cart -->
              <tr v-for="item in $store.getters.shoppingCart.list" :key="item.id">
                <!-- Product image -->
                <td>
                  <v-img height="48px" width="48px" :src="item.data.img"></v-img>
                </td>
                <!-- Product name -->
                <td>{{ item.data.name }}</td>
                <!-- Product price -->
                <td>{{ item.data.price * item.qty }}</td>
                <!-- Product price detail -->
                <td>{{ item.data.price }} x {{ item.qty }}</td>
                <!-- Delete product -->
                <td>
                  <v-btn icon color="pink" @click="$store.dispatch('removeFromCart', item.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!-- Totals -->
        <v-row>
          <v-col>
            <p>Total: $ {{ $store.getters.shoppingCart.total }}</p>
          </v-col>
          <v-col>
            <v-btn color="cyan darken-2" outlined data-testId='clearcart' @click="$store.dispatch('clearCart')">Vaciar carrito</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- Buttons to save product or close form -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cyan darken-2" outlined @click="showModal=false">Volver</v-btn>
        <v-btn color="cyan darken-2" depressed dark v-if="$store.getters.shoppingCart.list!=''">Finalizar compra</v-btn>
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