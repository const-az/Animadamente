<template>
  <v-container>
    <v-row class="mt-8">
      <!-- CARD FORM: -->
      <!-- To add or edit a product -->
      <v-col cols="12" sm="6" md="4">
        <v-card outlined class="rounded-xl">
          <!-- Product image preview -->
          <v-img class="white--text align-end" height="250px" :src="!!currentDoll.id ? currentDoll.data.img : '' ">
            <!-- Title: describes if you're adding or editing a product -->
            <v-card-title class="mb-0 text-h5 font-weight-b">{{ !!currentDoll.id ? 'Editar producto' : 'Agregar producto' }}</v-card-title>
          </v-img>
          <!-- Product description -->
          <v-card-text class="text--primary pa-5">
            <v-row>
              <!-- Product name -->
              <v-col cols="12" sm="6">
                <v-text-field :value="currentDoll.data.name" label="Nombre" @input="updateName"></v-text-field>
              </v-col>
              <!-- Product stock -->
              <v-col cols="12" sm="6">
                <v-text-field :value="currentDoll.data.stock" label="Stock" @input="updateStock" suffix="unidades"></v-text-field>
              </v-col>
              <!-- Product price -->
              <v-col cols="12" sm="6">
                <v-text-field :value="currentDoll.data.price" label="Precio" @input="updatePrice" prefix="$"></v-text-field>
              </v-col>
              <!-- Product description -->
              <v-col cols="12" sm="6">
                <v-text-field :value="currentDoll.data.text" label="Descripción" @input="updateText"></v-text-field>
              </v-col>
              <!-- Product image -->
              <v-col cols="12" sm="12">
                <v-text-field :value="currentDoll.data.img" label="Imagen" @input="updateImage"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- Action buttons -->
          <v-card-actions class="pa-5">
            <v-spacer></v-spacer>
            <v-btn color="cyan darken-2" small outlined rounded @click="emptyDollform">Cancelar</v-btn>
            <v-btn color="cyan darken-2" small depressed rounded dark @click="postDoll">{{ !!currentDoll.id ? 'Actualizar' : 'Crear'}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- PRODUCT CARDS: -->
      <!-- Creates a card for every product registered  -->
      <v-col cols="12" sm="6" md="4" v-for="item in computedProductList" :key="item.id">
        <!-- Card -->
        <v-card outlined class="rounded-xl">
          <!-- Product image -->
          <v-img class="white--text align-end" height="250px" :src="item.data.img">
            <!-- Product name -->
            <v-card-title class="mb-0 text-h5 font-weight-b">{{item.data.name}}</v-card-title>
            <!-- Product price -->
            <v-card-subtitle class="white--text text-h6 font-weight-bold">$ {{ item.data.price }}</v-card-subtitle>
          </v-img>
          <!-- Product description -->
          <v-card-text class="text--primary">
            {{item.data.text}}
          </v-card-text>
          <!-- Action buttons -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Edit product -->
            <v-btn icon color="pink lighten-2" small @click="editDoll(item.id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <!-- Delete product -->
            <v-btn icon color="pink lighten-2" small @click="deleteConfirmation(item.id, item.data.name)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: mapActions(['updateEdit', 'editDoll','deleteConfirmation','updateName', 'updateStock', 'updatePrice', 'updateText', 'updateImage', 'postDoll','emptyDollform']),
  computed: {
    ...mapState(['dolls','edit','currentDoll']),
    // Returns data
    computedProductList(){
      return this.dolls
    }
  },
  created(){
    this.$store.dispatch('getDolls')
  }
}
</script>