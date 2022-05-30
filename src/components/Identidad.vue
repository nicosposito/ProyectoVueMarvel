<template>
  <!-- Fondo -->

  <b-container>
    <h1>Descubre tu identidad secreta</h1>
    <div v-if="!pedirPj">
      <b-carousel
        ref="Personajes"
        img-width="200"
        img-height="350"
        :interval="3000"
      >
        <b-carousel-slide
          v-for="personaje in listaPersonajes"
          :key="personaje.nombre"
          :img-src="personaje.img"
          :class="personaje.class"
        >
        </b-carousel-slide>
      </b-carousel>
      <div>
        <b-button @click="obtenerPersonajeRandom"> Revelar identidad </b-button>
      </div>
    </div>
    <div v-if="pedirPj">
      <b-img
        :src="personajeObtenido.img"
        fluid
        img-width="200"
        img-height="350"
      >
      </b-img>
      <b-button>Ver comics</b-button>
      <b-button>Ver información</b-button>
    </div>

    <!--
      -Carrousel pasando las img de los personajes rapido
      -Boton go y stop
      -loading screen
      -aparezca img personaje con botones de buscar comics y/o info del personaje
      -->
  </b-container>
</template>
<script>
import { publicKey } from "../marvel";
import axios from "axios";
export default {
  name: "identidadSecreta",
  data() {
    return {
      listaPersonajes: [],
      isLoading: true,
      personajeObtenido: "",
      pedirPj: false,
    };
  },
  mounted() {
    this.getPersonajes();
  },

  methods: {
    getPersonajes() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?orderBy=name&limit=100&apikey=${publicKey}`
        )
        .then((result) => {
          var tipo = "active";
          result.data.data.results.forEach((item) => {
            const pimg = {
              img: item.thumbnail.path + "." + item.thumbnail.extension,
              nombre: item.name,
              class: tipo,
            };
            this.listaPersonajes.push(pimg);
            if (tipo == "active") {
              tipo = "";
            }
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    obtenerPersonajeRandom() {
      const random = Math.floor(Math.random() * this.listaPersonajes.length);
      this.personajeObtenido = random;
      this.pedirPj = true;
    },
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: url(../assets/fondo2.jpg) no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1.1);
}
</style>