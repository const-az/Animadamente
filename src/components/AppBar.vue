<template>
  <div>
    <!-- AppBar -->
    <v-app-bar color="white" dense flat data-testId='app-bar'>
      <!-- Brand redirects to home -->
      <router-link to="/home" class="text-decoration-none grey--text text--darken-2">
        <v-toolbar-title>
          <span class="d-none d-md-inline mr-2">Animadamente</span>
          <v-icon x-small class="mr-1" color="pink lighten-3">mdi-brightness-1</v-icon>
          <v-icon x-small class="mr-1" color="cyan lighten-3">mdi-brightness-1</v-icon>
          <v-icon x-small class="mr-1" color="yellow lighten-1">mdi-brightness-1</v-icon>
          <v-icon x-small color="light-green lighten-2">mdi-brightness-1</v-icon>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- Shopping cart -->
      <v-btn class="d-none d-md-block" depressed fab color="white" data-testId='cart' @click="showCart">
        <v-badge :content="$store.getters.shoppingCart.list.length"
          :value="$store.getters.shoppingCart.list.length > 0 ? $store.getters.shoppingCart.list.length : ''"
          color="cyan lighten-3" overlap>
          <v-icon medium class="mr-3" color="grey darken-2">mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <!-- Dropdown menu -->
      <v-menu rounded> 
        <template v-slot:activator="{ attrs, on }">
          <v-btn data-testId='menu-activator' class="grey--text text--darken-2" icon v-bind="attrs" v-on="on" depressed>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <!-- Dropdown list items -->
        <v-list flat elevation="0" data-testId='menu'>
          <v-list-item  @click="showCart" class="d-md-none mb-1">
            <v-list-item-title class="pr-5">
              Ver carrito
                <v-badge data-testId='cart-small-devices' :content="$store.getters.shoppingCart.list.length"
                  :value="$store.getters.shoppingCart.list.length > 0 ? $store.getters.shoppingCart.list.length : ''"
                  color="cyan lighten-3" overlap>
                  <v-icon medium class="mx-1" color="grey darken-2">mdi-cart</v-icon>
                </v-badge>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link to="/acerca">
            <v-list-item-title>
              Sobre mí
            </v-list-item-title>
          </v-list-item>
          <!-- Only if isnt logged in -->
          <div v-if="!isLoggedIn">
            <!-- Log in -->
            <v-list-item link to="/login">
              <v-list-item-title>
                Iniciar sesión
              </v-list-item-title>
            </v-list-item>
          </div>
          <!-- Only if is logged in -->
          <div v-else>
            <v-list-item link to="/agregarproductos">
              <v-list-item-title>
                Añadir productos
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
                <v-list-item-title>
                  Cerrar sesión
                </v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import Firebase from 'firebase';
import { mapState } from 'vuex'

export default {
  name: 'AppBar',
  methods: {
    showCart(event){
      event.preventDefault();
      this.$store.dispatch('updateShowCart', true)
    },
    logout() {
      Firebase.auth().signOut().then( () => {
        this.$store.dispatch('clearCart')
        this.$store.dispatch('updateUser', false)
        if(window.location.pathname != '/'){
          this.$router.push('/')
        }
      })
    }
  },
  computed: {
    ...mapState(['currentUser']),
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    getCurrentUser(){
      return Firebase.auth().currentUser ? Firebase.auth().currentUser : ''
    }
  },
}
</script>