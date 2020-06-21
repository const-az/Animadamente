<template>
  <v-app>
    <app-bar/>
    <cart-modal></cart-modal>
    <router-view/>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
import CartModal from './components/CartModal'

export default {
  components: {
    AppBar,
    CartModal
  }
}
</script>
