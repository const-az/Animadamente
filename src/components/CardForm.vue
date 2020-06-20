<template>
  <v-main>
  <!-- CARD FORM: -->
  <!-- To add or edit a product -->
    <v-card flat class="mt-5">
      <!-- Title: describes if you're adding or editing a product -->
      <v-card-title class="mb-0 text-h5 justify-center font-weight-b">{{ !!currentDoll.id ? 'Edita tu producto' : 'Agrega tu producto' }}</v-card-title>
      <v-divider class="mb-5"></v-divider>
      <v-row>
        <!-- Product image preview -->
        <v-col cols="12" md="4" lg="4">
          <v-img class="rounded-xl align-center mt-5" aspect-ratio="1" :src="temporaryUrl!='' ? temporaryUrl : currentDoll.data.img">
            <!-- Product image -->
            <input type="file" ref="searchImage" class="d-none" @change="selectImage($event)">
            <v-btn :color="temporaryUrl!='' || !!currentDoll.data.img ? 'white' : 'pink lighten-3'" small outlined rounded @click="$refs.searchImage.click()">Buscar imagen</v-btn>
          </v-img>
        </v-col>
        <!-- Form starts here -->
        <v-col cols="12" md="8" lg="8">
          <!-- Product description -->
          <v-card-text class="text--primary pa-5">
            <v-row>
              <!-- Product SKU -->
              <v-col cols="12" sm="6">
                <!-- Disabled when editing / Prevent using spacebar / Required / Min characters / Show error if sku code already exists -->
                <v-text-field label="SKU" :disabled="!!currentDoll.id" color="pink lighten-2"
                  :value="currentDoll.data.sku" @input="updateSKU" @keydown.space.prevent
                  :rules="[rules.max]" hint="No uses caracteres especiales ni espacios." :error-messages="inputError"
                >
                </v-text-field>
              </v-col>
              <!-- Product name -->
              <v-col cols="12" sm="6">
                <!-- Required / Max 20 characters / Show error if it's only numbers -->
                <v-text-field label="Nombre" color="cyan"
                  :value="currentDoll.data.name" @input="updateName"
                  :rules="[rules.string, rules.nameMax]" hint="Cuida las mayúsculas y minúsculas."
                ></v-text-field>
              </v-col>
              <!-- Product stock -->
              <v-col cols="12" sm="6">
                <!-- Prevent using spacebar / Required / Show error if NaN -->
                <v-text-field label="Stock" color="yellow darken-2" 
                  :value="currentDoll.data.stock" @input="updateStock" @keydown.space.prevent
                  hint="No uses puntos ni comas, sólo números."
                ></v-text-field>
              </v-col>
              <!-- Product price -->
              <v-col cols="12" sm="6">
                <!-- Prevent using spacebar / Required / Show error if NaN -->
                <v-text-field label="Precio" color="light-green" prefix="$"
                  :value="currentDoll.data.price" @input="updatePrice" @keydown.space.prevent
                  hint="No uses puntos ni comas, sólo números." 
                ></v-text-field>
              </v-col>
              <!-- Product description -->
              <v-col cols="12">
                <v-textarea label="Descripción" color="pink lighten-2"
                  auto-grow rows="1" row-height="15" counter
                  :value="currentDoll.data.text" @input="updateText"
                  :rules="[rules.textMax, rules.string]" hint="No uses más de 150 caracteres." 
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- Action buttons -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="cyan lighten-1" outlined rounded @click="cancelForm">Cancelar</v-btn>
            <v-btn color="cyan lighten-1" depressed rounded dark @click="validationAlert">{{ !!currentDoll.id ? 'Actualizar' : 'Crear'}}</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <!-- ALERT:  -->
    <!-- On errors -->
    <v-snackbar elevation="0" top color="pink lighten-3" v-model="alert.state" timeout="3000">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <!-- To close alert -->
        <v-btn icon small color="white" v-bind="attrs" @click="alert.state = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!--  -->
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
      // Updates data from inputs into state
      'updateSKU', 'updateName', 'updateStock', 'updatePrice', 'updateText', 'updateImage','updateTemporaryImageFile',
      // Uploads file to storage
      'uploadImage', 'postDoll',
      // Empties doll form on cancel
      'emptyDollform',
    ]),
    cancelForm(){
      this.emptyDollform()
      this.file = null,
      this.temporaryUrl = ''
    },
    // Selects image from local storage and saves it 
    selectImage(event){
      this.file = event.target.files[0]
      // If image is selected
      if(this.file){
        const reader = new FileReader()
        reader.readAsDataURL(this.file)
        // Sets temporary file on state
        reader.onload = (e) => {
          this.temporaryUrl = e.target.result
          this.updateTemporaryImageFile(this.file)
        }
      }
    },
    // Validates form before sending
    validationAlert(){
      // If fields are filled
      if(this.currentDoll.data.sku!="" && this.currentDoll.data.name!="" && this.currentDoll.data.stock!=null && this.currentDoll.data.price!=null && this.currentDoll.data.text!=""){
        // If image is uploaded
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
    // Send form uploading image first
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
    // Current doll information is saved here / Shows error if SKU is already taken
    ...mapState(['currentDoll','inputError'])
  }

}
</script>