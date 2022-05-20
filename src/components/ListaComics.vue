<template>
  <span class="bg"></span>

  <b-row align-h="center">
    <b-col
      cols="12"
      sm="6"
      md="4"
      v-for="comic in comics"
      :key="comic.title"
      style="width: inherit; padding-bottom: 20px"
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
    </b-col>
  </b-row>
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
        .get(
          `http://gateway.marvel.com/v1/public/comics?orderBy=title&apikey=${publicKey}`
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
  background: url(https://fondosmil.com/fondo/32052.jpg) no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1.1);
}

.card-text {
  height: 80px;
}

#center {
  align-items: center;
  justify-content: center;
}

.center {
  padding: 10px 0;
  text-align: center;
}
</style>