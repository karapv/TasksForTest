<template>
  <div class="container home">
    <h1 class="main-title">Cмотрите в кино:</h1>
    <ul class="list-movies row">
      <li class="col-lg-3 list-movies-item" v-for="(movie,index) in getAllMovies" :key="index" data-movie-id="movie._id" @click="watchMovie(movie._id,movie.name)">
          <img :src="movie.pictureLink" :alt="movie.name">
          <h5 class="movies-item-title">{{movie.name}}</h5>
          <span class="movies-item-release">Дата выхода: {{(movie.dateOfRelease)?movie.dateOfRelease.match(/([0-9]{1,4}-\d{1,2}-\d{1,2})/g).join(''):''}}</span>
      </li>
    </ul>
    <h2 class="subtitle">Купите билет прямо сейчас!</h2>
      <div class="main-sessions-container row">
          <div class="main-session-block col-lg-6" v-for="(sessions,index) in currentSessions" :key="index">
             <h4 class="main-session-block-title">{{sessions.name}}</h4>
             <SessionBlock :setPlaces="sessions"></SessionBlock>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { mapGetters } from 'vuex';
import router from '@/router';
import SessionBlock from "@/components/session-block/SessionBlock.vue";
export default {
  name: 'Home',
    components: {SessionBlock},
    data(){
    return{
        currentSessions: {}
    }
  },
  computed:{
    ...mapGetters([
      'getAllMovies',
      'getMainSessions'
    ])
  },
  created(){
    //Получаем фильмы и отрисовуем
    axios({
      url: 'https://cinema-api-test.herokuapp.com/movies',
      method: 'GET'
    }).then((result)=>{
      this.$store.dispatch('setAllMovies',result.data);
    });
    axios({
        url: 'https://cinema-api-test.herokuapp.com/movieShows',
        method: 'GET'
    }).then((res)=>{
       this.$store.dispatch('setSessions',res.data);
       this.currentSessions = this.getMainSessions;
    })
  },
  methods: {
    // Переход на конкретный фильм
    watchMovie(id: string, name: string): void {
      localStorage.currentMovieID = id;
      let currentName = name;
      currentName = currentName.toLowerCase().match(/[a-z]/g).join('');
      this.$store.dispatch('setCurrentMovie', id);
      router.push({path: `/movies/${currentName}`});
    },
  }
}
</script>
