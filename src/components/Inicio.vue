<template>
  <div>
    <h1>Marvel app with vue</h1>
  </div>
  <div id="opciones">
    <v-row>
      <v-col cols="2">
        <h1>Comic</h1>
        <v-img
          cover
          class="bg-grey-lighten-2"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          aspect-ratio="1"
        ></v-img>

        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              indeterminate
              color="grey-lighten-4"
            ></v-progress-circular>
          </div>
        </template>
      </v-col>
      <v-col cols="2">
        <h1>Characters</h1>
        <v-img
          cover
          class="bg-grey-lighten-2"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          aspect-ratio="1"
        ></v-img>

        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              indeterminate
              color="grey-lighten-4"
            ></v-progress-circular>
          </div>
        </template>
      </v-col>
      <v-col cols="2">
        <h1>Events</h1>
        <v-img
          cover
          class="bg-grey-lighten-2"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          aspect-ratio="1"
        ></v-img>

        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              indeterminate
              color="grey-lighten-4"
            ></v-progress-circular>
          </div>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PaginaInicio",
};
</script>




<style scoped>
h1 {
  text-align: center;
}

.v-col {
  align-items: center;
  justify-content: center;
}

.v-row {
  align-items: center;
  justify-content: center;
}

#opciones {
  padding-top: 10%;
}
</style>