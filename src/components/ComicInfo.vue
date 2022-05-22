<template>
  <!--Fondo -->
  <span class="bg"></span>

  <!--Boton inicio-->
  <div>
    <b-nav class="nav">
      <b-button
        class="botonNav"
        squared
        variant="light"
        @click="this.$router.push('/comics')"
        >Volver a los comics
        <font-awesome-icon icon="home" />
      </b-button>
      <v-spacer></v-spacer>
      <h1>Ficha tecnica</h1>
      <v-spacer></v-spacer>
      <b-button class="botonNav" squared variant="light"
        >Volver al inicio
        <font-awesome-icon icon="home" />
      </b-button>
    </b-nav>
  </div>

  <b-container class="info" v-for="comic in infoComic" :key="comic.id">
    <h1></h1>
    <div>
      <h1>{{ comic.title }}</h1>
    </div>
    <b-row>
      <b-col>
        <b-img
          :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
          fluid
        ></b-img>
      </b-col>
      <h3>Descripcion:</h3>
      <label>{{ comic.description }}</label>
      <label> Formato: {{ comic.format }}</label>
      <label> Número de paginas: {{ comic.pageCount }}</label>
      <b-col> </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { publicKey } from "../marvel";
import axios from "axios";

export default {
  name: "InformacionComic",
  data() {
    return {
      id: null,
      infoComic: [],
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getinfoComic();
  },
  methods: {
    getinfoComic() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/comics/${this.id}?apikey=${publicKey}`
        )
        .then((result) => {
          console.log(result);
          result.data.data.results.forEach((item) => {
            this.infoComic.push(item);
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
  background: url(../assets/marvelFondo.jpg) no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1.1);
}

.nav {
  background: #dc3545;
  position: relative;
  width: 100%;
}

.botonNav {
  width: 145px;

}

* {
  font-family: komikax;
}

.info{
  margin-top:20px;
  position: relative;
    background: white;
}
</style>