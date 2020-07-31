<template>
  <v-main>
    <v-snackbar elevation="0" top color="pink lighten-2" v-model="alert.state" timeout="3000">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon small color="white" v-bind="attrs" @click="alert.state = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-card flat width="400" class="text-center mx-auto mt-16 pa-5">
      <v-card-text>
        <p class="text-h4 text-md-h2 mb-2 font-weight-medium cyan--text text--lighten-3">¡Bienvenido!</p>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-text-field data-testId="credentials-user" color="cyan lighten-2" label="Usuario" prepend-icon="mdi-account" v-model="credentials.email"/>
          <v-text-field data-testId="credentials-password" color="cyan lighten-2" :type="showPassword ? 'text' : 'password'" label="Contraseña" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="credentials.password"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn data-testId="send-login" depressed rounded outlined small dark class="mx-auto mt-5" color="pink lighten-2" @click="login">Iniciar sesión</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'App',
  data: () => ({
    // Form
    credentials: {
      email: '',
      password: ''
    },
    showPassword: false,
    // Alert
    alert: {
      text: '',
      state: false,
      type: ''
    }
  }),
  methods: {
    login(){
      // If all inputs are filled
      if(this.credentials.email != '' && this.credentials.password != ''){
        Firebase.auth().signInWithEmailAndPassword(this.credentials.email,this.credentials.password)
        .then(() => {
          let user = this.credentials.email
          this.$store.dispatch('updateUser', user)
          // Welcome alert
          this.alert.state = true
          this.alert.text = `Bienvenida, ${user}`
          // Redirect to adding products form
          setTimeout(() => {
            this.$router.push('/agregarproductos')
          }, 2000)
        })
        .catch(() => {
          // Error alert
          this.alert.state = true
          this.alert.text = 'Usuario o contraseña incorrectos. Intente nuevamente.'
        })
      } else{
        // If any input is empty 
        this.alert.state = true
        this.alert.text = 'Todos los campos son obligatorios.'
      }
    }
  }
};
</script>