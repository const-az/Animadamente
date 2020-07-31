<template>
  <v-main align="center">
    <v-container>
      <card-form></card-form>
      <v-divider class="mb-5"></v-divider>
      <edit-cards></edit-cards>
    </v-container>
    <v-overlay :value="loading" color="pink lighten-5" opacity="0.3">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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