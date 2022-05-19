<template>
<span class="bg"></span>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
      v-for="comic in comics"
      :key="comic.title"
    >
      <v-card class="text-center"  height="450px"
            width=200px>
        
          <v-img
            class="bg-grey-lighten-2"
            :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
            height="300px"
            width="200px"
            cover
          ></v-img>
        <v-card-text style="overflow-y: auto; height: 120px">
          <div id="titulo" class="text-subtitle-1">{{ comic.title }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { publicKey, privateKey } from "../marvel";
import axios from "axios";
export default {
  name: "ListaComics",

  data() {
    return {
      comics: [],
    };
  },

  mounted() {
    this.getPersonajes();
  },

  methods: {
    getPersonajes() {
      axios
        .get(`http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}`)
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
#titulo {
  align-items: center;
  justify-content: center;
}

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(https://fondosmil.com/fondo/32052.jpg)
    no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1.1);
}
</style>