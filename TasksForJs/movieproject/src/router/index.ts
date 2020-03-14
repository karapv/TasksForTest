import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Movie from '../views/movie/Movie.vue'
import Search from "@/views/search/Search.vue";
import NotFound from "@/views/notfound/NotFound.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies/:id',
    name: 'Movie',
    component: Movie
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
