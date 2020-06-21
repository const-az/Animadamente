<template>
  <v-footer light padless class="mt-5 transparent text-center">
      <v-card-text>
        <v-btn depressed text small color="pink lighten-3" v-for="(icon, index) in social" :key="index" :href="icon.link">
          <v-icon small>{{icon.icon}}</v-icon>
          <span class="custom-transform-class text-none grey--text text--darken-3 caption ml-2">{{icon.info}}</span>
        </v-btn>
      </v-card-text>
      <v-card-text class="pt-0">
        <strong class="grey--text text--darken-3">Animadamente.</strong><span class="caption mx-2">- {{ new Date().getFullYear() }}</span>
      </v-card-text>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      social: [
        {
          icon:'mdi-instagram',
          info: 'animadamente',
          link: 'https://www.instagram.com/animadamente/'
        },
        {
          icon:'mdi-whatsapp',
          info: '+56 9 4217 2026',
          link: 'https://web.whatsapp.com/'
        },
        {
          icon:'mdi-facebook',
          info: 'Animadamente',
          link: 'https://www.facebook.com/animadamente/'
        },
        {
          icon:'mdi-gmail',
          info: 'hola.animada@gmail.com',
          link: 'https://www.google.com/intl/es-419/gmail/about/#'
        }
      ],
    }),
  }
</script>