<template>
  <v-row class="mt-8">
    <v-col cols="12" sm="4" v-for="item in toys" :key="item.id">
      <v-card outlined class="rounded-xl">
        <v-img class="white--text align-end" height="200px" :src="item.data.img">
          <v-card-title>{{item.data.name}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">$ {{item.data.price}}</v-card-subtitle>

        <v-card-text class="text--primary">
          {{item.data.text}}
        </v-card-text>

        <v-card-actions>
        <v-btn
            color="orange"
            text
        >
            Share
        </v-btn>

        <v-btn
            color="orange"
            text
        >
            Explore
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['toys']),
}
</script>