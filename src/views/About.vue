<template>
  <v-main>
    <v-card flat>
      <v-container>
        <v-row class="pa-5">
          <v-col cols="12" md="4" lg="4" class="pa-8">
            <v-img class="mx-auto" :src="url" max-width="300px"></v-img>
          </v-col>
          <v-col cols="12" md="8" lg="8" class="px-8 text-body-2">
            <p class="text-h6">Hola!</p>
            <p class="text-caption">Mi nombre es <b>Constanza Seves Vera</b>, pero todos me dicen Cony y soy la creadora de Animadamente. Soy Diseñadora Gráfica de profesión y Diseñadora Textil de corazón. 💕</p>
            <p class="text-caption">Comencé con Animadamente a mediados del 1015 luego de que mi abuela me enseñara a coser a máquina y durante una largo paro de mi universidad. 😬 Soy bastante activa por lo que durante ese periodo me dije a mi misma que no podía pasar tanto tiempo sin hacer nada. 😅</p>
            <p class="text-caption">Mi mayor interés durante la carrera fue diseñar para un público infantil y crear personajes, aunque no dibujaba tan bien. Así me lancé a hacer ilustraciones con tela y muñecas, ya que a través del textil podía representar mucho mejor mis ideas y darle vida a mis personajes. Comencé con telas mal elegidas y varias pruebas fallidas, porque estaba decidida a crear mis propios moldes y no sacarlos de internet. 💪🏻</p>
            <p class="text-caption">Finalmente logré crear mis primeros muñecos, un poco distintos a lo que son hoy en día 👀, y ese mismo año encontré en internet una convocatoria para una feria de juguetes en el Centro Cultural de La Moneda y sin pensarlo mucho, postulé. 🙊</p>
            <p class="text-caption">Quedé seleccionada y me fue tan bien que terminada la feria lloré de emoción y fue en ese preciso y precioso momento donde me di cuenta que esto era lo que quería hacer con mi vida 😍 hacer lo que me gusta y trabajar por mí y por mis sueños. ✨</p> 
            <p class="text-caption">He pasado por altos y bajos, muchas veces las cosas no me han resultado como he querido y ha sido frustrante; sin embargo, la satisfacción que siento al ver terminado un objeto que yo misma creé desde su génesis y recibir lindos comentarios, me llena todito el corazón y me impulsa a seguir con toda la fuerza del mundo. 🌟</p>
            <p class="text-caption">Me gusta estar creando cosas nuevas todo el tiempo para no caer en la rutina, por eso aunque comencé solo con muñecos, hoy en día tengo diversos productos de decoración textil como alfileteros, móviles, guirnaldas y cuadros entre otras cosas. 🎀</p>
            <p class="text-caption">Ahora comienza un nuevo camino lleno de incertidumbres para convertir esto que comenzó como un hobbie en mi trabajo y mi vida. 💕</p>
            <p class="text-caption">Un abrazo grande. 🤗</p>
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
      url: 'https://firebasestorage.googleapis.com/v0/b/animadamente-73568.appspot.com/o/About%2Fabout.png?alt=media&token=56379b6c-c0df-429a-91f6-b16015e9b601'
    }
  }
}
</script>
