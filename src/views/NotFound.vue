<template>
  <v-main>
    <v-card flat>
      <v-container>
        <v-row class="mt-5" align="center" justify="center">
          <v-col cols="12" md="6" lg="6">
            <v-img class="mx-auto" :src="url" max-width="500px"></v-img>
          </v-col>
          <v-col cols="12 text-center" md="6 text-md-left" lg="6" class="px-8 text-body-2">
            <p class="text-h2 mb-2 font-weight-medium cyan--text text--lighten-3">Ups!</p>
            <p>La página que buscas no existe.</p>
            <v-btn class="mt-10" color="pink lighten-2" small outlined rounded to="/">Volver al inicio</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>

<script>
export default {
  data(){
    return {
      url: 'https://firebasestorage.googleapis.com/v0/b/animadamente-73568.appspot.com/o/NotFound%2Fnotfound.png?alt=media&token=fd03f008-e9af-4c3b-9a02-995f457555a7'
    }
  }
}
</script>
