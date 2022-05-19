<template>
  <InicioApp />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import InicioApp from '../components/Inicio.vue';

export default defineComponent({
  name: 'InicioView',

  components: {
    InicioApp,
  },
});
</script>
