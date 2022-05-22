import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaComicsView from '../views/ListaComicsView.vue'
import ComicInfo from '../views/ComicInfoView.vue'
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
    path: '/comics/:nombre',
    name: 'comicinfo',
    component: ComicInfo,
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
