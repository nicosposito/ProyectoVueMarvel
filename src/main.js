import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faFilter);


loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use (BootstrapVue3)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');



