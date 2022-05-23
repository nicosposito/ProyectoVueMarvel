import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faFilter, faHome, faArrowRight, faBook, faCircleInfo, faCartShopping, faBookOpen, faMobileScreenButton, faCalendar, faLaptop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faFilter, faHome, faArrowRight, faBook, faCircleInfo, faCartShopping, faBookOpen, faMobileScreenButton, faCalendar, faLaptop);


import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(BootstrapVue3)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component("vue-loading", VueLoading)
  .mount('#app');



