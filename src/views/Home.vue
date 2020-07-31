<template>
  <div class="home">
    <v-main>
      <v-container>
        <carousel/>
        <cards-list></cards-list>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Carousel from '../components/Carousel'
import CardsList from '../components/CardsList'

export default {
  name: 'Home',
  components: {
    Carousel,
    CardsList,
  },
  created(){
    this.$store.dispatch('getDolls')
  }
}
</script>
