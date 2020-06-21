<template>
  <v-app>
    <app-bar/>
    <cart-modal></cart-modal>
    <router-view/>
    <Footer></Footer>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
import CartModal from './components/CartModal'
import Footer from './components/Footer'

export default {
  components: {
    AppBar,
    CartModal,
    Footer
  }
}
</script>
