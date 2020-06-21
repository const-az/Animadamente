<template>
  <v-main>
    <!-- Carrousel -->
    <v-carousel hide-delimiters cycle height="300" class="rounded-xl justify-center" show-arrows-on-hover>
      <!-- Search bar -->
      <v-toolbar absolute flat height="300px" width="100%" color="transparent" rounded="xl">
        <v-spacer></v-spacer>
        <v-text-field :value="search" @input="updateSearch" hide-details color="pink lighten-2" class="px-2 my-3" prepend-icon="mdi-magnify" single-line></v-text-field>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- Carrousel images -->
      <v-carousel-item v-for="(img, i) in img" :key="i" :src="url+img" gradient="to top, rgba(255,255,255,0), rgba(0,0,0,.1), rgba(255,255,255,0)">
      </v-carousel-item>
    </v-carousel>
  </v-main>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  data () {
    return {
      url: 'https://firebasestorage.googleapis.com/v0/b/animadamente-73568.appspot.com/o/Carrousel%2F',
      img: [
        'carrousel-01.jpg?alt=media&token=5c753e27-6168-4af6-b981-399dbef4aaef',
        'carrousel-02.jpg?alt=media&token=018ace0b-165e-4e24-ab63-e5e24289034d',
        'carrousel-03.jpg?alt=media&token=4d0e9cc5-9609-419e-b59b-7659f04b488a',
        'carrousel-04.jpg?alt=media&token=936cb7cb-f105-45a5-a22e-18aed0c6b3d8',
        'carrousel-05.jpg?alt=media&token=e05feca1-1761-4576-8dd2-b448750474e1',
      ],
    }
  },
  methods: mapActions(['updateSearch']),
  computed: mapState(['search'])
}
</script>