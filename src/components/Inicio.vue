<template>
  <!--Fondo-->


  <!--Inicio-->
  <div>
    <h1>Marvel app with vue </h1>
  </div>
  <b-row align-h="center">
    <b-col
      cols="12"
      sm="6"
      md="4"
      class="columnaOpcion"
      v-for="opc in opciones"
      :key="opc.nombre"
    >
      <router-link to="/comics">
        <h1>{{ opc.nombre }}</h1>
      </router-link>
      <b-img
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        fluid
        v-bind="imgOpcProps"
        class="centerImg"
      ></b-img>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "PaginaInicio",
  data() {
    return {
      opciones: [
        {
          nombre: "Comics",
        },
        {
          nombre: "Personajes",
        },
        {
          nombre: "Placeholder",
        },
      ],
      imgOpcProps: {
        blankColor: "#bbb",
        width: 450,
        height: 55,
      },
      logoProps: {
        blankColor: "#bbb",
        width: 450,
        height: 550,
      },
    };
  },
  setup() {
    const urlLogo = require("./assets/logo.png");
    return { urlLogo };
  },
  methods: {
    url(opc) {
      if (opc == "Comics") {
        return "/comics";
      } else if (opc == "Personajes") {
        return "/"; //Cambiar
      } else return "/"; //cambiar
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
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
  background: url(../assets/Inicio.jpg) no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1.1);
}

.columnaOpcion {
  width: 300px;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

* {
  font-family: komikax;
}
</style>