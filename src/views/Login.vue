<template>
  <v-app>
    <v-card width="400" class="mx-auto my-auto pa-5">
      <v-card-title class="h1">
        Iniciar sesión
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
            label="Usuario"
            prepend-icon="mdi-account"
            v-model="credentials.email"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña" 
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="credentials.password"
          />
          <v-text v-if="formHasErrors">
            <i class="mdi mdi-alert"></i>
                Usuario o Contraseña incorrectos.
          </v-text>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed dark color="cyan darken-2" @click="login">Iniciar sesión</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'App',
  data: () => ({
      credentials: {
        email: '',
        password: ''
      },
      formHasErrors: false,
      showPassword: false
  }),
  methods: {
    login(e) {
      e.preventDefault()
      this.formHasErrors = this.credentials.email === '' || this.credentials.password === ''
      if(!this.formHasErrors) {
        // try login
        Firebase.auth()
                .signInWithEmailAndPassword(
                  this.credentials.email,
                  this.credentials.password
                )
                .then(() => {
                  let user = this.credentials.email
                  this.$store.dispatch('updateUser', user)
                  this.$router.push('/agregarproductos')
                })
                .catch(() => {
                  console.log('Usuario no autenticado.')
                })
      }
    }
  },
};
</script>