<template>
  <div>
    <h1>Aqui estan los personajes</h1>
    <ul>
      <li v-for="personaje in personajes" :key="personaje.name">
        {{ personaje.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { publicKey, privateKey } from "../marvel";
import axios from "axios";

export default {
  name: "PersonajesMarvel",

  data() {
    return {
      personajes: [],
    };
  },

  mounted() {
    this.getPersonajes();
  },

  methods: {
    getPersonajes() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            this.personajes.push(item);
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
</style>
