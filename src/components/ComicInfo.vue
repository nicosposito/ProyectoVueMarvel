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
        @click="this.$router.push('/comics')"
        >Volver a los comics
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
  <b-container class="info" v-for="comic in infoComic" :key="comic.id">
    <h1></h1>
    <div id="tituloComic" class="centerTitulo">
      <h1>{{ comic.title }}</h1>
    </div>
    <hr />
    <b-row align-h="center">
      <!-- Imagen -->
      <b-col class="columna divImg" cols="12" sm="6" md="4">
        <b-img
          :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
          fluid
          v-bind="mainProps"
          class="centerImg"
        ></b-img>
      </b-col>
      <b-col style="border-left: #fff">
        <!-- Descripcion -->
        <label v-if="comic.description != null">
          {{ comic.description }} <br
        /></label>

        <label v-if="comic.description == null"
          >No se a proprocionado una descripción <br
        /></label>

        <!-- HTML Codes for Symbols and Punctuation !-->
        <hr />
        <!-- Formato -->
        <label> Formato: {{ comic.format }}</label> <br />
        <hr />
        <!-- Numero paginas -->
        <label> Número de páginas: {{ comic.pageCount }}<br /></label>
        <hr />
        <label>
          <!-- Serie -->
          Serie:
          {{ comic.series.name }}
        </label>
        <hr />
        <!--Fechas-->
        <div class="text-center mb-2">
          <label> Fechas de salida</label>
        </div>
        <b-row>
          <b-col
            cols="12"
            sm="6"
            md="4"
            class="columna mx-auto text-center"
            v-for="fecha in comic.dates"
            :key="fecha.type"
          >
            <p>
              <font-awesome-icon icon="calendar" />
              {{ traducirSalidas(fecha.type) }} <br />
              {{ soloFecha(fecha.date) }}
            </p>
          </b-col>
        </b-row>

        <hr />
        <!-- Precios -->
        <div class="text-center mb-2">
          <label>Precios</label>
        </div>
        <b-row>
          <b-col
            cols="12"
            sm="6"
            md="4"
            class="columna mx-auto text-center"
            v-for="precio in comic.prices"
            :key="precio.type"
          >
            <p>
              <font-awesome-icon
                v-if="precio.type == 'printPrice'"
                icon="book"
              />
              <font-awesome-icon
                v-if="precio.type == 'digitalPurchasePrice'"
                icon="laptop"
              />
              {{ traducirPrecio(precio.type) }} {{ precio.price }} USD
            </p>
          </b-col>
        </b-row>
        <hr />
        <!-- Links -->
        <div style="display: grid">
          <div class="text-center">
            <label>Links</label>
          </div>
          <b-button
            v-for="tipo in comic.urls"
            :variant="classBoton(tipo.type)"
            :key="tipo.type"
            :href="tipo.url"
            class="botonComic"
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
    <hr />
    <!--Personajes-->
    <div class="centerTitulo">
      <h1>Personajes</h1>
    </div>
    <b-row class="mb-2 justify-content-center gridPj">
      <b-col
        cols="12"
        sm="6"
        md="4"
        v-for="pj in personajes"
        :key="pj.nombre"
        style="width: inherit"
      >
        <div class="card cardPersonajes text-center">
          <img
            :src="pj.imagen"
            alt="Image"
            height="200"
            width="200"
            class="card-img-top"
          />
          <div class="card-body">
            <h4 class="card-title">{{ pj.nombre }}</h4>
            <a class="btn btn-danger botonSaberMas" href="#" role="button"
              >Saber más</a
            >
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
        v-if="comic.characters.returned == 0"
      >
        <b-card title="No se encontraron Personajes" class="text-center">
        </b-card>
      </b-col>
    </b-row>
    <hr />
    <!--Creadores-->
    <div class="centerTitulo">
      <h1>Creadores</h1>
    </div>
    <b-row class="mb-2 gridCreadores">
      <b-col
        cols="12"
        sm="6"
        md="4"
        class="columna mx-auto"
        v-for="creador in comic.creators.items"
        :key="creador.name"
        style="width: inherit"
      >
        <b-card :title="creador.name" class="cardCreadores text-center">
          <b-card-text class="text-center">
            {{ creador.role }}
          </b-card-text>
        </b-card>
      </b-col>
      <!--Si no hay-->
      <b-col
        cols="12"
        sm="6"
        md="4"
        class="columna mx-auto"
        style="width: inherit; max-width: 20rem"
        v-if="comic.creators.returned == 0"
      >
        <b-card title="No se encontraron Creadores" class="text-center">
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
        width: 450,
        height: 550,
      },
      personajes: [],
      isLoading: true,
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
          result.data.data.results.forEach((item) => {
            this.infoComic.push(item);
          });
          if (this.infoComic[0].characters.returned != 0) {
            this.getPersonajes();
            this.isLoading = false;
          } else this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPersonajes() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/comics/${this.id}/characters?apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            const personaje = {
              nombre: item.name,
              imagen: item.thumbnail.path + "." + item.thumbnail.extension,
              id: item.id,
            };
            this.personajes.push(personaje);
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

    classBoton(nombre) {
      if (nombre == "detail") return "outline-primary";
      else if (nombre == "purchase") return "outline-danger";
      else if (nombre == "reader") return "outline-dark";
      else return "outline-success";
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
}

.divImg {
  position: relative;
  height: 747px;
  margin-left: 20px;
  margin-right: 20px;
}

.botonComic {
  margin-inline: 10px;
  margin-top: 10px;
  margin-inline-start: 0;
}

.cardCreadores {
  width: 304px;
  height: 120px;
  margin-bottom: 20px;
}

.cardPersonajes {
  width: 200px;
  height: 390px;
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

.gridPj {
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  justify-content: center;
}

.gridCreadores {
  display: grid;
  grid-template-columns: repeat(auto-fill, 324px);
  justify-content: center;
}
</style>