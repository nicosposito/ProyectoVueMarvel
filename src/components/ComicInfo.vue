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
      <h1>Ficha técnica</h1>
      <v-spacer></v-spacer>
      <b-button class="botonNav" squared variant="light"
        >Volver al inicio
        <font-awesome-icon icon="home" />
      </b-button>
    </b-nav>
  </div>

  <!-- Informacion -->
  <b-container class="info" v-for="comic in infoComic" :key="comic.id">
    <h1></h1>
    <div id="tituloComic" class="itemsCentrados">
      <h1 >{{ comic.title }}</h1>
    </div>
     <hr/>
    <b-row align-h="center">
      <b-col class="columna" cols="12" sm="6" md="4">
        <b-img
          :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
          fluid
          v-bind="mainProps"
        ></b-img>
      </b-col>
      <b-col>
        <h3>Descripción:</h3>
        <label> {{ comic.description }} <br /></label>
        <!-- HTML Codes for Symbols and Punctuation !-->
        <hr />
        <label> Formato: {{ comic.format }}</label> <br />
        <hr />
        <label> Número de páginas: {{ comic.pageCount }}<br /></label>
        <hr />
        <div>
          <b-button
            v-for="tipo in comic.urls"
            :key="tipo.type"
            :href="tipo.url"
            >{{ tipo.type }}</b-button
          >
        </div>
        <hr />
        <label>
          Serie:
          {{ comic.series.name }}
        </label>
        <hr />
        <label>
          Fechas de salida:
          <p v-for="fecha in comic.dates" :key="fecha.type">
            {{ fecha.type }} {{ fecha.date }}
          </p></label
        >
        <hr />

        <label>
          Precio:
          <p v-for="precio in comic.prices" :key="precio.type">
            {{ precio.type }}: {{ precio.price }}
          </p></label
        >
 
      </b-col>
    </b-row>
           <hr />
    <b-row class="enLinea">
      <h1>Creadores</h1>
      <b-col
        class="columna"
        v-for="creador in comic.creators.items"
        :key="creador.name"
      >
        <b-card 
          :title="creador.name"
          img-src="https://picsum.photos/600/300/?image=25"
          img-top
           style="max-width: 20rem; margin-bottom: 20px"
        >
          <b-card-text>
            {{creador.role}}
          </b-card-text>

          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </b-col>
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
      mainProps: {
        blankColor: "#bbb",
        width: 350,
        height: 450,
      },
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


.itemsCentrados {
  display: flex;
  justify-content: center;
}

#tituloComic{
  margin-bottom: 20px;
}
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

.info {
   padding-top: 10px;
  margin-top: 20px;
  position: relative;
  background: white;
}

.columna {
  float: left;
  width: 50%;
}

.enLinea {
  display: inline-block;
}


</style>