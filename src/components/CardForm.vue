<template>
  <v-main>
    <v-card flat class="mt-5">
      <v-card-title class="mb-0 text-h5 justify-center font-weight-b">{{ !!currentDoll.id ? 'Edita tu producto' : 'Agrega tu producto' }}</v-card-title>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <v-col cols="12" md="4" lg="4">
          <v-img class="rounded-xl align-center mt-5" aspect-ratio="1" :src="temporaryUrl!='' ? temporaryUrl : currentDoll.data.img">
            <input type="file" ref="searchImage" class="d-none" @change="selectImage($event)">
            <v-btn :color="temporaryUrl!='' || !!currentDoll.data.img ? 'white' : 'pink lighten-3'" small outlined rounded @click="$refs.searchImage.click()">Buscar imagen</v-btn>
          </v-img>
        </v-col>
        <v-col cols="12" md="8" lg="8">
          <v-card-text class="text--primary pa-5">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="SKU" :disabled="!!currentDoll.id" color="pink lighten-2"
                  :value="currentDoll.data.sku" @input="updateSKU" @keydown.space.prevent
                  :rules="[rules.max]" hint="No uses caracteres especiales ni espacios." :error-messages="inputError"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Nombre" color="cyan"
                  :value="currentDoll.data.name" @input="updateName"
                  :rules="[rules.string, rules.nameMax]" hint="Cuida las mayúsculas y minúsculas."
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Stock" color="yellow darken-2" 
                  :value="currentDoll.data.stock" @input="updateStock" @keydown.space.prevent
                  hint="No uses puntos ni comas, sólo números."
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Precio" color="light-green" prefix="$"
                  :value="currentDoll.data.price" @input="updatePrice" @keydown.space.prevent
                  hint="No uses puntos ni comas, sólo números." 
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Descripción" color="pink lighten-2"
                  auto-grow rows="1" row-height="15" counter
                  :value="currentDoll.data.text" @input="updateText"
                  :rules="[rules.textMax, rules.string]" hint="No uses más de 150 caracteres." 
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="cyan lighten-1" outlined rounded @click="cancelForm">Cancelar</v-btn>
            <v-btn color="cyan lighten-1" depressed rounded dark @click="validationAlert">{{ !!currentDoll.id ? 'Actualizar' : 'Crear'}}</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <!-- ALERT -->
    <v-snackbar elevation="0" top color="pink lighten-3" v-model="alert.state" timeout="3000">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon small color="white" v-bind="attrs" @click="alert.state = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data(){
    return{
      file: null,
      temporaryUrl: '',
      rules: {
        max: v => v.length <= 20 || '* Máximo 20 caracteres.',
        nameMax: v => v.length <= 30 || '* Máximo 30 caracteres.',
        textMax: v => v.length <= 150 || '* Máximo 150 caracteres.',
        string: v => !Number(v) || '* No pueden ser sólo números.',
      },
      alert: {
        text: '',
        state: false
      }
    }
  },
  methods: {
    ...mapActions([
      'updateSKU', 'updateName', 'updateStock', 'updatePrice', 'updateText', 'updateImage','updateTemporaryImageFile',
      'uploadImage', 'postDoll',
      'emptyDollform',
    ]),
    cancelForm(){
      this.emptyDollform()
      this.file = null,
      this.temporaryUrl = ''
    },
    selectImage(event){
      this.file = event.target.files[0]
      if(this.file){
        const reader = new FileReader()
        reader.readAsDataURL(this.file)
        reader.onload = (e) => {
          this.temporaryUrl = e.target.result
          this.updateTemporaryImageFile(this.file)
        }
      }
    },
    validationAlert(){
      if(this.currentDoll.data.sku!="" && this.currentDoll.data.name!="" && this.currentDoll.data.stock!=null && this.currentDoll.data.price!=null && this.currentDoll.data.text!=""){
        if (this.currentDoll.data.img!="" || this.temporaryUrl!="") {
          this.sendForm()
        } else {
          this.alert.state = true
          this.alert.text = 'Ups! La imagen es obligatoria.'
        }
      } else{
        this.alert.state = true
        this.alert.text = 'Debes llenar todos los campos.'
      }
    },
    sendForm(){
      if(this.file){
        this.uploadImage()
        this.file = null,
        this.temporaryUrl = ''
      }else{
        this.postDoll()
        this.file = null,
        this.temporaryUrl = ''
      }
    }
  },
  computed: {
    ...mapState(['currentDoll','inputError'])
  }

}
</script>