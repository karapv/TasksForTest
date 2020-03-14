<template>
    <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand" href="/">Кинотеатр</a>
        <form class="form-inline" @submit.prevent="searchMovie(movie)">
            <input class="form-control mr-sm-3" type="search" v-model="movie" placeholder="Название фильма" aria-label="Search" required>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Искать</button>
        </form>
    </nav>
</template>

<script lang="ts">
import router from "@/router";
export default {
  name: "Header",
  data(){
    return{
       movie: ''
    }
  },
  methods:{
      searchMovie(movie: string): void{
          router.push({  name: 'Search', query: { find: movie } });
          location.reload()
      }
  }
}
</script>
