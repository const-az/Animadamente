<template>
  <v-main align="center">
    <!-- Products -->
    <v-container>
      <!-- Form -->
      <card-form></card-form>
      <v-divider class="mb-5"></v-divider>
      <!-- Cards -->
      <edit-cards></edit-cards>
    </v-container>
    <!-- Loading -->
    <v-overlay :value="loading" color="pink lighten-5" opacity="0.5">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- Delete confirmation dialog -->
    <confirmation-modal></confirmation-modal>
  </v-main>
</template>

<script>
import CardForm from '../components/CardForm'
import EditCards from '../components/EditCards'
import ConfirmationModal from '../components/ConfirmationModal'

import { mapState } from 'vuex'

export default {
  components: {
    CardForm,
    EditCards,
    ConfirmationModal
  },
  computed: mapState(['loading']),
}
</script>