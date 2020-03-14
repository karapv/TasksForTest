<template>
    <ul class="list-movies row">
        <li class="col-lg-3 list-movies-item" v-for="(movie,index) in getMovies" :key="index"  @click="watchMovie(movie._id,movie.name)">
            <img :src="movie.pictureLink" :alt="movie.name">
            <h5 class="movies-item-title">{{movie.name}}</h5>
            <span class="movies-item-release">Дата выхода: {{(movie.dateOfRelease)?movie.dateOfRelease.match(/([0-9]{1,4}-\d{1,2}-\d{1,2})/g).join(''):''}}</span>
        </li>
    </ul>
</template>
<script type="ts">
    import router from "@/router";
    export default {
        name: 'Movies',
        props:[
            'getMovies'
        ],
        data(){
           return{

           }
        },
        methods: {
            // Переход на конкретный фильм
            watchMovie(id,name){
                localStorage.currentMovieID = id;
                let currentName = name;
                currentName = currentName.toLowerCase().match(/[a-z]/g).join('');
                this.$store.dispatch('setCurrentMovie', id);
                router.push({path: `/movies/${currentName}`});
            },
        }
    }
</script>