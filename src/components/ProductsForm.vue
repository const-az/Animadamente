<template>
    <v-dialog :value="showForm" max-width="500px" persistent>
      <v-card class="pa-5">
        <v-card-title>
          <span class="headline">{{ !!currentToy.id ? 'Editar producto' : 'Agregar producto' }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field :value="currentToy.data.name" label="Nombre" @input="updateName"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field :value="currentToy.data.stock" label="Stock" @input="updateStock" suffix="unidades"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field :value="currentToy.data.price" label="Precio" @input="updatePrice" prefix="$"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field :value="currentToy.data.text" label="Descripción" @input="updateText"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                    <v-text-field :value="currentToy.data.img" label="Imagen" @input="updateImage"></v-text-field>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="cyan darken-2" outlined @click="hideEmptyToyform">Cancelar</v-btn>
          <v-btn color="cyan darken-2" depressed dark @click="saveToy">{{ !!currentToy.id ? 'Actualizar' : 'Crear'}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['hideToyform', 'updateName', 'updateStock', 'updatePrice', 'updateText', 'updateImage', 'postToy','hideEmptyToyform']),
    saveToy(){
      this.hideToyform()
      this.postToy()
    }
  },
  computed: mapState(['showForm', 'currentToy']),
}
</script>