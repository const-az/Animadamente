<template>
  <v-container>
    <!-- DOLLS LIST -->
    <v-card flat>
      <!-- HEADER -->
      <v-card-title>
        Lista de juguetes
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Búsqueda" single-line hide-details></v-text-field>
      </v-card-title>
      <!-- CONTENT -->
      <v-data-table :headers="headers" :items="dolls" :search="search" no-results-text="No existen productos registrados con esas características." no-data-text="No hay productos disponibles..." hide-default-footer>
        <!-- ACTION -->
        <template v-slot:item.image="{ item }">
          <v-img :src="item.data.img" aspect-ratio="1.7"></v-img>
        </template>
        <!-- ACTION -->
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editDoll(item.id)">mdi-pencil</v-icon>
          <v-icon small @click="deleteConfirmation(item.id, item.data.name)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Dolls',
  data() {
      return {
        search: '',
        headers: [
          {
            text: 'Nombre',
            align: 'start',
            sortable: true,
            value: 'data.name',
          },
          { text: 'Stock', value: 'data.stock'},
          { text: 'Precio', value: 'data.price'},
          { text: 'Descripción', value: 'data.text'},
          { text: 'Imagen', value: 'image'},
          { text: 'Acciones', value: 'actions'},
        ],
      }
    },
    methods: mapActions(['updateEdit', 'editDoll','deleteConfirmation']),
    computed: mapState(['dolls','edit']),
    mounted(){
      this.$store.dispatch('getDolls')
    },
  }
</script>