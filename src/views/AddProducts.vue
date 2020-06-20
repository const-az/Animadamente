<template>
  <v-main align="center">
    <!-- products LIST -->
    <v-container>
      <card-form></card-form>
      <v-divider class="mb-5"></v-divider>
      <edit-cards></edit-cards>
    </v-container>
    <!-- LOADING -->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-main>
</template>

<script>
import CardForm from '../components/CardForm'
import EditCards from '../components/EditCards'

import { mapState } from 'vuex'

export default {
  components: {
    CardForm,
    EditCards
  },
  computed: mapState(['loading']),
}
</script>