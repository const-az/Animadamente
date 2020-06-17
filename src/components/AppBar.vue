<template>
  <div>
    <v-app-bar color="white" dense flat class="mx-8">
      <router-link to="/" class="text-decoration-none grey--text text--darken-2">
        <v-toolbar-title>Animadamente</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- SHOPPING CART -->
      <v-badge
        v-if="$store.getters.shoppingCart.list.length > 0"
        :content="$store.getters.shoppingCart.list.length"
        :value="$store.getters.shoppingCart.list.length"
        color="pink"
        overlap
        @click="showCart"
      >
        <v-icon medium class="mr-3">mdi-cart</v-icon>
      </v-badge>
      <!-- MENU -->
      <v-menu
      rounded
      flat
      open-on-hover
      > 
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              class="grey--text text--darken-2"
              icon
                v-bind="attrs"
                v-on="on"
                depressed
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <!-- IF LOG IN -->
          <v-list>
            <v-list-item link>
              <router-link to="/acerca">
                <v-list-item-title>
                  Sobre mí
                </v-list-item-title>
              </router-link>
            </v-list-item>
            <!-- IF ISNT LOG IN -->
            <div v-if="!isLoggedIn">
              <v-list-item link>
                <router-link to="/login">
                  <v-list-item-title>
                    Iniciar sesión
                  </v-list-item-title>
                </router-link>
              </v-list-item>
            </div>
            <!-- IF IS LOGGED IN -->
            <div v-else>
              <v-list-item link>
                <router-link to="/agregarproductos">
                  <v-list-item-title>
                    Añadir productos
                  </v-list-item-title>
                </router-link>
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
    showCart(event) {
      event.preventDefault();
      this.$store.dispatch('updateShowCart', true)
    },
    logout() {
      Firebase.auth().signOut().then( () => {
        this.$router.push('/home')
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