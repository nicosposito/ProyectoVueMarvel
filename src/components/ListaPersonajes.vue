<template>
  <!--Fondo-->
  <span class="bg"></span>

  <!--Boton inicio-->
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
      <h1>Personajes</h1>
      <v-spacer></v-spacer>
      <b-button
        class="botonNav"
        squared
        variant="light"
        @click="this.$router.push('/comics')"
        >Ir a cómics
        <font-awesome-icon icon="arrow-right" />
      </b-button>
    </b-nav>
  </div>

  <!--Filtros Principales-->
  <div class="itemsCentrados">
    <b-card class="cardBusqueda">
      <b-row>
        <b-col class="columna">
          <b-form-group label="Nombre:" label-for="titulo">
            <b-form-input
              v-model="nombre"
              id="nombre"
              size="sm"
              placeholder="Buscar por nombre"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="columna">
          <b-form-group label="Ordenar por:" label-for="orden">
            <b-form-select
              id="orden"
              v-model="selectOrden"
              :options="orden"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <div class="divbotonfiltros">
          <b-button
            pill
            variant="dark"
            v-b-toggle.collapse-2
            @click="filtrosAdiccionales = !filtrosAdiccionales"
          >
            <span v-if="!filtrosAdiccionales">Más filtros </span>

            <span v-if="filtrosAdiccionales">Menos filtros </span>
            <font-awesome-icon icon="filter"
          /></b-button>
        </div>
      </b-row>

      <!--Collapse [Filtros secundarios]-->
      <b-collapse id="collapse-2">
        <b-row>
          <b-col class="columna">
            <b-form-group label="Cómics:" label-for="comics">
              <b-form-select
                id="comics"
                v-model="idComic"
                :options="comics"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col class="columna">
            <b-form-group label="Series:" label-for="series">
              <b-form-select
                id="series"
                v-model="idSerie"
                :options="series"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-collapse>

      <div class="divbotonbuscar">
        <b-button @click="busqueda()" pill variant="danger"
          >Buscar <font-awesome-icon icon="search"
        /></b-button>
      </div>

      <div v-if="!isLoading & (personajes.length == 0)" class="itemsCentrados">
        <b-card
          id="cardNoResultados"
          title="No se encontraron resultados :("
          class="center border-light"
        >
          <b-button
            variant="danger"
            @click="
              isLoading = !isLoading;
              reiniciarBusqueda();
            "
            >Ver personajes iniciales</b-button
          >
        </b-card>
      </div>
    </b-card>
  </div>

  <!--- Personajes !-->
  <vue-loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="false"
    color="#dc3545"
  />

  <div v-if="!isLoading & (personajes.length > 0)">
    <b-row class="grid">
      <b-col
        v-for="personaje in personajes"
        :key="personaje.name"
        style="width: inherit; padding-bottom: 20px"
      >
      <router-link
          :to="{ name: 'personajeinfo', params: { id: personaje.id } }"
          style="text-decoration: none; color: inherit"
        >

          <b-card 
            :img-src="personaje.thumbnail.path + '.' + personaje.thumbnail.extension"
            img-alt="Img"
            img-height="350"
            img-width="200"
            style="width: 250px; height: 480px"
          >

            <div class="center">
              <p style="text-align: center">
                {{ personaje.name }}
              </p>
            </div>
          </b-card>

        </router-link>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import { publicKey } from "../marvel";
import axios from "axios";
export default {
  name: "ListaPersonajes",
  data() {
    return {
      personajes: [],
      comics: [
        {
          text: "Seleccione cómic",
          value: "",
        },
      ],
      series: [
        {
          text: "Seleccione serie",
          value: "",
        },
      ],
      orden: [
        {
          text: "Seleccione el orden",
          value: "",
        },
        {
          text: "Nombre (A-Z)",
          value: "name",
        },
        {
          text: "Nombre (Z-A)",
          value: "-name",
        },
        {
          text: "Fecha de modificado (Mas antiguos)",
          value: "modified",
        },
        {
          text: "Fecha de modificado (Mas nuevos)",
          value: "-modified",
        },
      ],
      selectOrden: "name",
      nombre: "",
      idComic: "",
      idSerie: "",
      isLoading: true,
      filtrosAdiccionales: false,
    };
  },
  mounted() {
    this.getPersonajes();
    this.getSeries();
    this.getComics();
  },

  methods: {
    getComics() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/comics?orderBy=title&apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            const comic = {
              text: item.title,
              value: item.id,
            };
            this.comics.push(comic);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPersonajes() {
      let consulta = localStorage.getItem("consultaPersonaje");
      if (consulta == null) {
        consulta =
          "http://gateway.marvel.com/v1/public/characters?orderBy=name&apikey=" +
          publicKey;
      } else {
        let filtros = JSON.parse(localStorage.getItem("filtrosPj"));
        console.log(filtros);
        this.nombre = filtros[0];
        this.selectOrden = filtros[1];
        this.idComic = filtros[2];
        this.idSerie = filtros[3];
      }
      axios
        .get(`${consulta}`)
        .then((result) => {
          result.data.data.results.forEach((item) => {
            this.personajes.push(item);
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getSeries() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/series?orderBy=title&apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            const serie = {
              text: item.title,
              value: item.id,
            };
            this.series.push(serie);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    busqueda() {
      this.isLoading = true;
      let filtros = Array(3);
      let consulta = "";
      if (this.nombre != "") {
        consulta += "name=" + this.nombre;
      }
      if (this.selectOrden != "") {
        consulta += "&orderBy=" + this.selectOrden;
      }

      if (this.filtrosAdiccionales) {
        if (this.idComic != "") {
          consulta += "&comics=" + this.idComic;
        }
        if (this.idSerie != "") {
          consulta += "&series=" + this.idSerie;
        }
      }
      this.personajes = [];
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?${consulta}&apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            this.personajes.push(item);
          });
          this.isLoading = false;
          localStorage.setItem(
            "consultaPersonaje",
            "http://gateway.marvel.com/v1/public/characters?" +
              consulta +
              "&apikey=" +
              publicKey
          );
          filtros[0] = this.nombre;
          filtros[1] = this.selectOrden;
          filtros[2] = this.idComic;
          filtros[3] = this.idSerie;
          localStorage.setItem("filtrosPj", JSON.stringify(filtros));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    reiniciarBusqueda() {
      localStorage.clear();
      this.getPersonajes();
      this.selectOrden = "name";
      this.selectFormato = "";
      this.nombre = "";
      this.idComic = "";
      this.idSerie = "";
      this.filtrosAdiccionales = false;
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

.itemsCentrados {
  display: flex;
  justify-content: center;
}

.center {
  padding: 10px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.columna {
  float: left;
  width: 50%;
}
.divbotonfiltros {
  flex-direction: column;
  display: flex;
}

.divbotonbuscar {
  flex-direction: column;
  display: flex;
  margin-top: 10px;
}

.cardBusqueda {
  width: 574px;
  margin-bottom: 20px;
  margin-top: 20px;
}

#collapse-2 {
  margin-top: 15px;
}

.nav {
  background: #dc3545;
  position: relative;
  width: 100%;
  height: 62px;
}

.botonNav {
  width: 155px;
  height: 62px;
}

* {
  font-family: komikax;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 270px);
  justify-content: center;
}
</style>