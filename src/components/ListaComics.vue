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
      <h1>Cómics</h1>
      <v-spacer></v-spacer>
      <b-button
        class="botonNav"
        squared
        variant="light"
        @click="
          reiniciarBusqueda();
          this.$router.push('/personajes');
        "
        >Ir a Personajes
        <font-awesome-icon icon="arrow-right" />
      </b-button>
    </b-nav>
  </div>

  <!--Filtros Principales-->
  <div class="itemsCentrados">
    <b-card class="cardBusqueda">
      <b-row>
        <b-col class="columna">
          <b-form-group label="Titulo:" label-for="titulo">
            <b-form-input
              v-model="titulo"
              id="titulo"
              size="sm"
              placeholder="Buscar por título"
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
            <b-form-group label="Personajes:" label-for="personajes">
              <b-form-select
                id="personajes"
                v-model="idPersonaje"
                :options="personajes"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="Creadores:" label-for="creadores">
              <b-form-select
                id="creadores"
                v-model="idCreador"
                :options="creadores"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col class="columna">
            <b-form-group label="Rango de fecha:" label-for="rangoFecha">
              <b-form-select
                id="rangoFecha"
                v-model="selectRangoFecha"
                :options="rangoFecha"
              ></b-form-select>
            </b-form-group>
            <b-form-group label="Formato:" label-for="formato">
              <b-form-select
                id="formato"
                v-model="selectFormato"
                :options="formatos"
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
              reiniciarBusqueda();
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

  <div v-if="!isLoading & (comics.length > 0)">
    <b-row class="grid">
      <b-col
        v-for="comic in comics"
        :key="comic.title"
        style="width: inherit; padding-bottom: 20px"
      >
        <router-link
          :to="{ name: 'comicinfo', params: { id: comic.id } }"
          style="text-decoration: none; color: inherit"
        >
          <b-card
            :img-src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
            img-alt="Img"
            img-height="350"
            img-width="200"
            style="width: 250px; height: 480px"
          >
            <div class="center">
              <p style="text-align: center">
                {{ comic.title }}
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
  name: "ListaComics",
  data() {
    return {
      comics: [],
      personajes: [
        {
          text: "Seleccione personaje",
          value: "",
        },
      ],
      creadores: [
        {
          text: "Seleccione creador",
          value: "",
        },
      ],
      orden: [
        {
          text: "Seleccione el orden",
          value: "",
        },
        {
          text: "Titulo (A-Z)",
          value: "title",
        },
        {
          text: "Titulo (Z-A)",
          value: "-title",
        },
        {
          text: "Fecha de salida (Mas antiguos)",
          value: "onsaleDate",
        },
        {
          text: "Fecha de salida (Mas nuevos)",
          value: "-onsaleDate",
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
      selectOrden: "title",
      selectFormato: "",
      selectRangoFecha: "",
      titulo: "",
      idPersonaje: "",
      idCreador: "",
      isLoading: true,
      filtrosAdiccionales: false,
    };
  },

  mounted() {
    this.getPersonajes();
    this.getCreadores();
    this.getComics();
  },

  methods: {
    getComics() {
      let consulta = localStorage.getItem("consultaComic");
      if (consulta == null) {
        consulta =
          "http://gateway.marvel.com/v1/public/comics?orderBy=title&apikey=" +
          publicKey;
      } else {
        let filtros = JSON.parse(localStorage.getItem("filtros"));
        let length = Object.keys(filtros).length;
        if (length == 6) {
          this.titulo = filtros[0];
          this.selectOrden = filtros[1];
          this.selectFormato = filtros[2];
          this.selectRangoFecha = filtros[3];
          this.idCreador = filtros[4];
          this.idPersonaje = filtros[5];
        } else {
          //Proviene de identidad
          this.idPersonaje = filtros[0];
        }
      }
      axios
        .get(`${consulta}`)
        .then((result) => {
          result.data.data.results.forEach((item) => {
            this.comics.push(item);
          });
          this.isLoading = false;
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
            const personaje = {
              text: item.name,
              value: item.id,
            };
            this.personajes.push(personaje);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCreadores() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/creators?orderBy=firstName&apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            const creador = {
              text: item.fullName,
              value: item.id,
            };
            this.creadores.push(creador);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    busqueda() {
      this.isLoading = true;
      let consulta = "";
      let filtros = Array(5);

      if (this.titulo != "") {
        consulta = "titleStartsWith=" + this.titulo;
      }
      if (this.selectOrden != "") {
        consulta = consulta + "&orderBy=" + this.selectOrden;
      }

      if (this.filtrosAdiccionales) {
        if (this.selectFormato != "") {
          consulta = consulta + "&formatType=" + this.selectFormato;
        }
        if (this.selectRangoFecha != "") {
          consulta = consulta + "&dateDescriptor=" + this.selectRangoFecha;
        }

        if (this.idCreador != "") {
          consulta = consulta + "&creators=" + this.idCreador;
        }

        if (this.idPersonaje != "") {
          consulta = consulta + "&characters=" + this.idPersonaje;
        }
      }
      this.comics = [];
      axios
        .get(
          `http://gateway.marvel.com/v1/public/comics?${consulta}&apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            this.comics.push(item);
          });
          this.isLoading = false;
          localStorage.setItem(
            "consultaComic",
            "http://gateway.marvel.com/v1/public/comics?" +
              consulta +
              "&apikey=" +
              publicKey
          );
          filtros[0] = this.titulo;
          filtros[1] = this.selectOrden;
          filtros[2] = this.selectFormato;
          filtros[3] = this.selectRangoFecha;
          filtros[4] = this.idCreador;
          filtros[5] = this.idPersonaje;
          localStorage.setItem("filtros", JSON.stringify(filtros));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    reiniciarBusqueda() {
      localStorage.clear();
      this.getComics();
      this.selectOrden = "title";
      this.selectFormato = "";
      this.selectRangoFecha = "";
      this.titulo = "";
      this.idPersonaje = "";
      this.idCreador = "";
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