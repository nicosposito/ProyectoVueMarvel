<template>
  <!--Fondo -->
  <span class="bg"></span>

  <vue-loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="false"
    color="#dc3545"
  />

  <!--Boton inicio-->
  <div>
    <b-nav class="nav">
      <b-button
        class="botonNav"
        squared
        variant="light"
        @click="this.$router.push('/personajes')"
        >Volver a los personajes
        <font-awesome-icon icon="book" />
      </b-button>
      <v-spacer></v-spacer>
      <h1>Ficha técnica</h1>
      <v-spacer></v-spacer>
      <b-button
        class="botonNav"
        squared
        variant="light"
        @click="this.$router.push('/')"
        >Volver al inicio
        <font-awesome-icon icon="home" />
      </b-button>
    </b-nav>
  </div>

  <!-- Informacion -->
  <b-container class="info" v-for="personaje in infoPersonaje" :key="personaje.id">
    <h1></h1>
    <div id="tituloComic" class="centerTitulo">
      <h1>{{ personaje.name }}</h1>
    </div>
    <hr />
    <b-row align-h="center">
      <!-- Imagen -->
      <b-col class="columna divImg" cols="12" sm="6" md="4">
        <b-img
          :src="personaje.thumbnail.path + '.' + personaje.thumbnail.extension"
          fluid
          v-bind="mainProps"
          class="centerImg"

        ></b-img>
      </b-col>
      <b-col style="border-left: #fff">
        <!-- Descripcion -->
        <label v-if="personaje.description != null">
          {{ personaje.description }} <br
        /></label>

        <label v-if="personaje.description == null || personaje.description==''"
          >No se a proprocionado una descripción <br
        /></label>

        <!-- HTML Codes for Symbols and Punctuation !-->
        <hr />
        <!-- Formato -->
        <label> Fecha de modificado: {{ personaje.modified }}</label> <br />
        <hr />
        <div style="display: grid">
          <div class="text-center">
            <label>Links</label>
          </div>
          <b-button
              variant="outline-dark"
              v-for="tipo in personaje.urls"
              :key="tipo.type"
              :href="tipo.url"
              target="blank"
              class="botonPersonaje"
              
              >{{ traducirBoton(tipo.type) }}
              <font-awesome-icon
                v-if="tipo.type == 'detail'"
                icon="circle-info"
              />
              <font-awesome-icon
                v-if="tipo.type == 'purchase'"
                icon="cart-shopping"
              />
              <font-awesome-icon v-if="tipo.type == 'reader'" icon="book-open" />
              <font-awesome-icon
                v-if="tipo.type == 'inAppLink'"
                icon="mobile-screen-button"
              />
          </b-button>
        </div>
      </b-col>

    </b-row>
    <hr/>
    <b-row class="mb-2">
      <!--Comics-->
      <div class="centerTitulo">
        <h1>Comics</h1>
      </div>
      <b-col
        cols="12"
        sm="6"
        md="4"
        class="columna mx-auto"
        v-for="comic in comics"
        :key="comic.title"
        style="width: inherit"
      >
        <div class="card cardComics text-center">
          <router-link
            :to="{ name: 'comicinfo', params: { id: comic.id } }"
            style="text-decoration: none; color: inherit">
            <img
              :src="comic.imagen"
              alt="Image"
              class="card-img-top"
            />
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ comic.title }}</h5>
            <br/>
            <a
              class="btn btn-danger botonSaberMas"
              href="#"
              role="button"
              >Saber más</a>
          </div>
          
        </div>
        <!--Si no hay-->
      </b-col>
      <b-col
        cols="12"
        sm="6"
        md="4"
        class="columna mx-auto"
        style="width: inherit; max-width: 20rem"
        v-if="comics.length == 0"
      >
        <b-card title="No se encontraron Comics" class="text-center">
        </b-card>
      </b-col>
    </b-row>
    <br/>
  </b-container>
</template>

<script>
import { publicKey } from "../marvel";
import axios from "axios";

export default {
  name: "PersonajeInfo",
  data() {
    return {
      id: null,
      infoPersonaje: [],
      mainProps: {
        blankColor: "#bbb",
        width: 450,
        height: 550,
      },
      personajes: [],
      comics: [],
      isLoading: true,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getPersonaje();
    this.getComics();
  },
  methods: {
    getPersonaje() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters/${this.id}?apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            this.infoPersonaje.push(item);
          });
        })
        .catch((error) => {
          console.log(error);
        });
        this.isLoading = false;
    },
    getComics() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters/${this.id}/comics?apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            const comic = {
              title: item.title,
              imagen: item.thumbnail.path + "." + item.thumbnail.extension,
              id: item.id,
            };
            this.comics.push(comic);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    traducirBoton(nombre) {
      if (nombre == "detail") return "Más detalles";
      else if (nombre == "purchase") return "Comprar";
      else if (nombre == "reader") return "Leer";
      else return "Ver en app";
    },

    traducirSalidas(nombre) {
      if (nombre == "onsaleDate") return "Formato físico:";
      else if (nombre == "focDate") return "Fin pre-orden:";
      else if (nombre == "unlimitedDate") return "Versión unlimited:";
      else return "Formato digital:";
    },
    soloFecha(fecha) {
      return fecha.slice(0, 10);
    },

    traducirPrecio(precio) {
      if (precio == "printPrice") return "En físico:";
      else return "En dígital:";
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
  width: 155px;
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
}

.centerTitulo {
  text-align: center;
  margin-bottom: 20px;
}

.centerImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height:400px;
  width:auto;
}

.divImg {
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  min-height:400px;
}

.botonPersonaje {
  margin-inline: 10px;
  margin-top: 10px;
  margin-inline-start: 0;
}

.cardCreadores {
  width: 304px;
  margin-bottom: 20px;
}

.cardPersonajes {
  width: 200px;
  height: 370px;
  margin-bottom: 20px;
  align-items: center;
}

.botonSaberMas {
  position: absolute;
  margin-left: -75px;
  left: 50%;
  width: 150px;
  bottom: 10px;
}
.card-img-top{
  width:200px;
  height:200px;
}
.cardComics{
  margin:10px 10px auto auto ;
  padding:15px;
  border:none;
}
.cardComics h5{
  max-width:200px
}
</style>