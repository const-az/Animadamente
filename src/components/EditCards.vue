<template>
  <v-row>
    <v-col cols="6" sm="6" md="2" v-for="item in dolls" :key="item.id">
      <v-card outlined class="rounded-xl">
        <v-img class="align-center justify-center" height="150px" :src="item.data.img" gradient="to top, rgba(0,0,0,.2), rgba(255,255,255,0)">
          <v-btn icon x-large color="white" @click="editDoll(item.id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon x-large color="white" @click="deleteConfirmation(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['editDoll','deleteConfirmation']),
  },
  computed: {
    ...mapState(['dolls', 'currentDoll',]),
  },
  created(){
    this.$store.dispatch('getDolls')
  }
}
</script>