<template>
  <div class="container home">
    <h1 class="main-title">Cмотрите в кино:</h1>
    <Movies :getMovies="getAllMovies"></Movies>
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
import SessionBlock from "@/components/session-block/SessionBlock.vue";
import Movies from "@/components/movies/Movies.vue";
export default {
  name: 'Home',
    components: {Movies, SessionBlock},
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
  }
}
</script>
