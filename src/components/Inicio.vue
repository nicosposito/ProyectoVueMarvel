<template>
  <!--Fondo-->
  <span class="bg"></span>
  <!--Inicio-->
  <div>
    <b-img
      :src="urlLogo"
      fluid
      v-bind="imgOpcProps"
      class="centerImg mostrar"
    ></b-img>
  </div>

  <!--Opciones-->
  <b-row align-h="center " class="mostrar">
    <b-col
      cols="12"
      sm="6"
      md="4"
      class="columnaOpcion"
      v-for="opc in opciones"
      :key="opc.nombre"
    >
      <router-link :to="opc.url" style="text-decoration: none; color: inherit">
        <!-- Para comics-->
        <b-carousel
          v-if="opc.nombre == 'Comics'"
          slide
          ref="Comics"
          img-width="200"
          img-height="350"
          :interval="3000"
        >
          <b-carousel-slide
            v-for="img in imgComics"
            :key="img.index"
            :img-src="img.img"
            :class="img.class"
          >
            <b-row class="etiquetaOpc">
              <h3>{{ opc.nombre }}</h3>
            </b-row>
          </b-carousel-slide>
        </b-carousel>
        <!-- Para Personajes-->
        <b-carousel
          v-if="opc.nombre == 'Personajes'"
          ref="Personajes"
          img-width="200"
          img-height="350"
          :interval="3000"
        >
          <b-carousel-slide
            v-for="img in imgPersonajes"
            :key="img.index"
            :img-src="img.img"
            :class="img.class"
          >
            <b-row class="etiquetaOpc">
              <h3>{{ opc.nombre }}</h3>
            </b-row>
          </b-carousel-slide>
        </b-carousel>
      </router-link>
    </b-col>

    <b-col cols="12" sm="6" md="4" class="columnaOpcion" v-b-modal.modal-1>
      <div class="identidad">
        <h3 class="titulo">Tu Identidad</h3>
        <h3 class="tituloInferior">Secreta</h3>
      </div>
      <b-modal id="modal-1" title="Conoce tu identidad secreta!!!">
      <!--
      
      -Carrousel pasando las img de los personajes rapido
      -Boton go y stop
      -loading screen
      -aparezca img personaje con botones de buscar comics y/o info del personaje 
      
      -->


      </b-modal>
      
    </b-col>
  </b-row>
</template>

<script>
import { publicKey } from "../marvel";
import axios from "axios";
export default {
  name: "PaginaInicio",
  data() {
    return {
      opciones: [
        {
          nombre: "Comics",
          url: "/comics",
        },
        {
          nombre: "Personajes",
          url: "/personajes",
        },
      ],
      imgOpcProps: {
        blankColor: "#bbb",
        width: 300,
      },
      logoProps: {
        blankColor: "#bbb",
        width: 350,
        height: 450,
      },
      imgComics: [],
      imgPersonajes: [],
    };
  },
  setup() {
    const urlLogo = require("@/assets/MarvelComics.png");
    return { urlLogo };
  },
  mounted() {
    this.getImgComics();
    this.getImgPersonajes();
  },
  methods: {
    getImgComics() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/comics?orderBy=title&limit=10&apikey=${publicKey}`
        )
        .then((result) => {
          var i = 0;
          var tipo = "active";
          result.data.data.results.forEach((item) => {
            const comicimg = {
              img: item.thumbnail.path + "." + item.thumbnail.extension,
              class: tipo,
              index: i,
            };
            this.imgComics.push(comicimg);
            if (tipo == "active") {
              tipo = "";
            }
            i++;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getImgPersonajes() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?orderBy=name&limit=10&apikey=${publicKey}`
        )
        .then((result) => {
          var i = 0;
          var tipo = "active";
          result.data.data.results.forEach((item) => {
            const pimg = {
              img: item.thumbnail.path + "." + item.thumbnail.extension,
              class: tipo,
              index: i,
            };
            this.imgPersonajes.push(pimg);
            if (tipo == "active") {
              tipo = "";
            }
            i++;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    iniciar() {
      this.$refs.Comics.start();
      this.$refs.Personajes.start();
    },
  },
};
</script>

<style scoped>
.titulo {
  text-align: center;
  color: black;
}

#opciones {
  padding-top: 10%;
}

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

.columnaOpcion {
  width: 270px;
}

* {
  font-family: komikax;
}

.centerImg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}

.mostrar {
  position: relative;
}

.etiquetaOpc {
  background: black;
  position: absolute;
  left: -15%;
  width: 247px;
  bottom: 300%;
  border-bottom-color: #f0131e;
  border-top-color: #f0131e;
  border-width: 4px;
  border-style: solid;
  border-left: none;
  border-right: none;
}

.identidad {
  width: 200px;
  height: 350px;
  background: url(http://192.168.1.22:8080/img/signoPregunta.5b1a9484.png)
    no-repeat;
  background-position-y: center;
  background-color: #f0131e;
  background-size: contain;
  width: auto;
}

.tituloInferior {
  bottom: 0;
  position: absolute;
  width: 119px;
  margin-left: 59.5px;
  color: black;
}
</style>