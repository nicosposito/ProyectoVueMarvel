import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaComicsView from '../views/ListaComicsView.vue'
import ComicInfo from '../views/ComicInfoView.vue'
import ListaPersonajesView from '../views/ListaPersonajesView.vue'
import IdentidadSecrectaView from '../views/IdentidadSecretaView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/comics',
    name: 'comics',
    component: ListaComicsView,
  },
  {
    path: '/comics/:id',
    name: 'comicinfo',
    component: ComicInfo,
  },
  {
    path: '/personajes',
    name: 'personajes',
    component: ListaPersonajesView,
  },
  {
    path: '/identidadSecreta',
    name: 'identidadSecrea',
    component: IdentidadSecrectaView,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
