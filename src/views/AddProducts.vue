<template>
  <v-main align="center">
    <!-- products LIST -->
    <cards-form></cards-form>
    <!-- LOADING -->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-main>
</template>

<script>
import CardsForm from '../components/CardsForm'

import { mapState } from 'vuex'

export default {
  components: {
    CardsForm,
  },
  computed: mapState(['loading']),
}
</script>