<template>
  <div class="home">
    <v-main>
      <v-container>
        <carrousel/>
        <cards-list></cards-list>
        <cart-modal></cart-modal>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Carrousel from '../components/Carrousel'
import CardsList from '../components/CardsList'
import CartModal from '../components/CartModal'

export default {
  name: 'Home',
  components: {
    Carrousel,
    CardsList,
    CartModal
  },
  created(){
    this.$store.dispatch('getDolls')
  }
}
</script>
