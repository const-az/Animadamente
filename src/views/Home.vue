<template>
  <div class="home">
    <v-main>
      <v-container>
        <carrousel/>
        <cards-list></cards-list>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Carrousel from '../components/Carrousel'
import CardsList from '../components/CardsList'

export default {
  name: 'Home',
  components: {
    Carrousel,
    CardsList
  },
  created(){
    this.$store.dispatch('getToys')
  }
}
</script>
