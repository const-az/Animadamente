<template>
  <v-dialog overlay-color="pink lighten-5" overlay-opacity="0.5" :value="messageModal" max-width="500px" persistent>
    <v-card outlined class="pa-4">
      <v-card-text>
        <v-card-title class="text-subtitle-1">{{ !edit ? `¿Segura que deseas borrar ${deletingDoll.name}?` : 'Producto borrado exitosamente.'}}</v-card-title>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink lighten-3" outlined small rounded @click="closeMessage">{{ !edit ? 'No' : 'Cerrar'}}</v-btn>
        <v-btn color="pink lighten-3" rounded small depressed dark @click="deleteDoll" v-if="!edit">Sí</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: mapActions(['deleteDoll', 'closeMessage']),
  computed: mapState(['deletingDoll', 'edit', 'messageModal']),
}
</script>