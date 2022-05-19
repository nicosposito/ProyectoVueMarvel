<template>
  <div>
    <h1>Aqui estan los comics</h1>
    <ul>
      <li v-for="comic in comics" :key="comic.name">
        {{ comic.name }}
      </li>
    </ul>
  </div>

</template>

<script>
import { publicKey, privateKey } from "../marvel";
import axios from "axios";
export default {
  name: "ListaComics",
 
data(){
    return{
        comics: [],
    }
},

  mounted() {
    this.getPersonajes();
  },

  methods: {
    getPersonajes() {
      axios
        .get(
          `http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            this.comics.push(item);
          });
          console.log(this.comics);
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