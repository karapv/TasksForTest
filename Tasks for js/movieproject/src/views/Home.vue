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
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { mapGetters } from 'vuex';
import router from '@/router';
export default {
  name: 'Home',
  data(){
    return{
    }
  },
  computed:{
    ...mapGetters([
      'getAllMovies',
    ])
  },
  created(){
    axios({
      url: 'https://cinema-api-test.herokuapp.com/movies',
      method: 'GET'
    }).then((result)=>{
      this.$store.dispatch('setAllMovies',result.data);
    })
  },
  methods: {
    watchMovie(id: string, name: string): void {
      localStorage.currentMovieID = id;
      let currentName = name;
      currentName = currentName.toLowerCase().match(/[a-z]/g).join('');
      console.log(currentName);
      this.$store.dispatch('setCurrentMovie', id);
      router.push({path: `/movies/${currentName}`});
    }
  }
}
</script>
