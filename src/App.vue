<template>
  <v-app>
    <app-bar/>
    <router-view/>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'

export default {
  components: {
    AppBar
  }
}
</script>
