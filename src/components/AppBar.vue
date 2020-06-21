<template>
  <div>
    <!-- AppBar -->
    <v-app-bar color="white" dense flat>
      <!-- Brand redirects to home -->
      <router-link to="/" class="text-decoration-none grey--text text--darken-2">
        <v-toolbar-title>
          Animadamente
          <v-icon x-small class="mr-1" color="pink lighten-3">mdi-brightness-1</v-icon>
          <v-icon x-small class="mr-1" color="cyan lighten-3">mdi-brightness-1</v-icon>
          <v-icon x-small class="mr-1" color="yellow lighten-1">mdi-brightness-1</v-icon>
          <v-icon x-small color="light-green lighten-2">mdi-brightness-1</v-icon>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- Shopping cart -->
      <v-btn class="d-none d-md-block" depressed fab color="white" data-testId='cart' @click="showCart">
        <!-- Shopping cart icon -->
        <v-badge :content="$store.getters.shoppingCart.list.length"
          :value="$store.getters.shoppingCart.list.length > 0 ? $store.getters.shoppingCart.list.length : ''"
          color="cyan lighten-3" overlap>
          <v-icon medium class="mr-3" color="grey darken-2">mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <!-- Dropdown menu -->
      <v-menu rounded open-on-hover close-on-content-click close-on-click> 
        <!-- Button activator  -->
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="grey--text text--darken-2" icon v-bind="attrs" v-on="on" depressed>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <!-- Dropdown list items -->
        <v-list flat elevation="0">
          <!-- Shopping cart on small devices -->
          <v-list-item  @click="showCart" class="d-md-none">
            <v-list-item-title>
              Ver carrito
                <v-badge data-testId='cart' :content="$store.getters.shoppingCart.list.length"
                  :value="$store.getters.shoppingCart.list.length > 0 ? $store.getters.shoppingCart.list.length : ''"
                  color="cyan lighten-3" overlap>
                  <v-icon medium class="mx-1" color="grey darken-2">mdi-cart</v-icon>
                </v-badge>
            </v-list-item-title>
          </v-list-item>
          <!-- About -->
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
            <!-- Add products -->
            <v-list-item link to="/agregarproductos">
              <v-list-item-title>
                Añadir productos
              </v-list-item-title>
            </v-list-item>
            <!-- Logout -->
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
        this.$router.push('/')
        this.$store.dispatch('updateUser', false)
        this.displayMenu = false
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