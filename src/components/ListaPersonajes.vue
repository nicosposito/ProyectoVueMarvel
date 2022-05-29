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
            <b-form-group label="Comics:" label-for="comics">
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

      <div v-if="!isLoading & (comics.length == 0)" class="itemsCentrados">
        <b-card
          id="cardNoResultados"
          title="No se encontraron resultados :("
          class="center border-light"
        >
          <b-button
            variant="danger"
            @click="
              isLoading = !isLoading;
              getComics();
            "
            >Ver comics iniciales</b-button
          >
        </b-card>
      </div>
    </b-card>
  </div>

  <!--- Comics !-->
  <vue-loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="false"
    color="#dc3545"
  />

  <div v-if="!isLoading & (personajes.length > 0)">
    <b-row align-h="center">
      <b-col
        cols="12"
        sm="6"
        md="4"
        v-for="personaje in personajes"
        :key="personaje.name"
        style="width: inherit; padding-bottom: 20px"
      >
      
<!--      <router-link
          :to="{ name: 'personajeInfo', params: { id: personaje.id } }"
          style="text-decoration: none; color: inherit"
        >
-->
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
<!--
        </router-link>
-->
      </b-col>
    </b-row>
  </div>

</template>


<script>
import { publicKey, privateKey } from "../marvel";
import axios from "axios";
export default {
  name: "ListaPersonajes",
  data() {
    return {
      personajes: [],
      comics: [
        {
          text: "Seleccione comic",
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
      formato: [
        {
          text: "Seleccione el formato",
          value: "",
        },
        {
          text: "Comic",
          value: "comic",
        },
        {
          text: "Coleccion",
          value: "collection",
        },
      ],
      rangoFecha: [
        {
          text: "Seleccione un rango",
          value: "",
        },
        {
          text: "Última semana",
          value: "lastWeek",
        },
        {
          text: "Esta semana",
          value: "thisWeek",
        },
        {
          text: "Siguiente semana",
          value: "nextWeek",
        },
        {
          text: "Este mes",
          value: "thisMonth",
        },
      ],
      formatos: [
        {
          text: "Seleccione un formato",
          value: "",
        },
        {
          text: "Comic",
          value: "comic",
        },
        {
          text: "Coleccion",
          value: "collection",
        },
      ],
      mostrarFiltros: ["Mas filtros", "Ocultar filtros"],

      selectOrden: "name",
      selectFormato: "",
      selectRangoFecha: "",
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
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?orderBy=name&apikey=${publicKey}`
        )
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
      console.log("-->>>"+ consulta+this.filtrosAdiccionales );
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?${consulta}&apikey=${publicKey}`
        )
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
</style>