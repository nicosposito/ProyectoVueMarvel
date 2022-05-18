<template>
  <v-app>
    <v-main>
      <inicio-app/>
    </v-main>
  </v-app>
</template>

<script>
import Inicio from "./components/Inicio.vue";

export default {
  name: "App",

  data: () => ({
    //
  }),

  components: {
    "inicio-app": Inicio,
  },
};
</script>
