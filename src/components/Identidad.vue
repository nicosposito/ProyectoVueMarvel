<template>
  <!-- Fondo -->
  <span class="bg"></span>

  <div>
    <b-nav class="nav">
      <b-button
        class="botonNav"
        squared
        variant="light"
        @click="this.$router.push('/')"
        >Volver al inicio
        <font-awesome-icon icon="home" />
      </b-button>
      <v-spacer></v-spacer>
      <h1>Descubre tu identidad secreta</h1>
      <v-spacer></v-spacer>
      <b-button class="botonNav" squared variant="light"
        >Ir a Personajes
        <font-awesome-icon icon="arrow-right" />
      </b-button>
    </b-nav>
  </div>

  <b-container class="containerCenter">
    <div v-if="!pedirPj">
      <b-carousel
        ref="Personajes"
        img-width="200"
        img-height="350"
        :interval="100"
        class="carrouselPj"
      >
        <b-carousel-slide
          v-for="personaje in listaPersonajes"
          :key="personaje.nombre"
          :img-src="personaje.img"
          :class="personaje.class"
        >
        </b-carousel-slide>
      </b-carousel>
      <div class="mt-4">
        <b-button variant="danger" @click="obtenerPersonajeRandom()">
          Revelar identidad
        </b-button>
      </div>
    </div>
    <div v-if="pedirPj" class="mt-2">
      <div class="carrouselPj">
        <b-img :src="personajeObtenido.img" v-bind="mainProps"> </b-img>
      </div>
      <div class="mt-4">
        <h1 id="pjNombre">Eres {{ personajeObtenido.nombre }} !!!</h1>
        <div class="mt-4">
          <b-button variant="danger" class="mr-1" @click="infoComics()"
            >Ver comics</b-button
          >
          <b-button variant="primary">Ver información</b-button>
        </div>
      </div>
    </div>
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

      mainProps: {
        width: 300,
        height: 350,
      },
    };
  },
  mounted() {
    this.getPersonajes();
  },

  methods: {
    getPersonajes() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?orderBy=name&apikey=${publicKey}`
        )
        .then((result) => {
          var tipo = "active";
          result.data.data.results.forEach((item) => {
            const pimg = {
              img: item.thumbnail.path + "." + item.thumbnail.extension,
              nombre: item.name,
              class: tipo,
              id: item.id,
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
      this.personajeObtenido = this.listaPersonajes[random];
      this.pedirPj = true;
    },

    infoComics() {
      localStorage.setItem(
        "consultaComic",
        "http://gateway.marvel.com/v1/public/comics?characters=" +
          this.personajeObtenido.id +
          "&orderBy=title&apikey=" +
          publicKey
      );
      let filtros = Array(1);
      filtros[0] = this.personajeObtenido.id;
      localStorage.setItem("filtros", JSON.stringify(filtros));
      this.$router.push("/comics");
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

.containerCenter {
  text-align: center;
  position: relative;
}

.carrouselPj {
  width: 300px;
  margin: auto;
}

* {
  font-family: komikax;
}

.botonNav {
  width: 155px;
  height: 62px;
}

.nav {
  background: #dc3545;
  position: relative;
  width: 100%;
  height: 62px;
  margin-bottom: 20px;
}

#pjNombre {
  color: #dc3545;
}
</style>