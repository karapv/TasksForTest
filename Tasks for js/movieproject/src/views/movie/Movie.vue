<template>
    <div class="container movie-container">
       <div class="row">
           <h1 class="col-lg-12 movie-title">{{movie.name}}</h1>
           <div class="movie-img">
               <img :src="movie.pictureLink" alt="" class="col-lg-12 movie-img">
           </div>
           <div class="col-lg-12 content">
               {{movie.description}}
           </div>
           <h2 class="col-lg-12 subtitle">Закажите билет прямо сейчас!</h2>
           <SessionBlock :setPlaces="currentSession"></SessionBlock>
       </div>
    </div>
</template>

<script type="ts">
    import {mapGetters} from "vuex";
    import axios from 'axios';
    import SessionBlock from "@/components/session-block/SessionBlock.vue";
    export default {
        name: "Movie",
        components: {SessionBlock},
        data(){
            return{
               movie: {
                   description: '',
                   name: '',
                   pictureLink: ''
               },
                currentSession: {}
            }
        },
        computed:{
            ...mapGetters([
                'getCurrentMovie',
                'getSession'
            ])
        },
        created(){
            // Запросы для получения данных конкретного фильма
            axios({
                url: `https://cinema-api-test.herokuapp.com/movies?movie_id=${this.getCurrentMovie}`,
                method: 'GET'
            }).then((res)=>{
                const {description,name,pictureLink} = res.data;
                this.movie = {description,name:name.toUpperCase(),pictureLink};
            }).catch((error)=>{
                console.log(error);
            });
            axios({
                url: `https://cinema-api-test.herokuapp.com/movieShows?movie_id=${this.getCurrentMovie}`,
                method: 'GET'
            }).then((res)=>{
                const {places,startTime,ticketPrice,_id,movie_id:movieID} = res.data;
                this.$store.dispatch('setCurrentSession', {places,startTime,ticketPrice,_id,movieID});
                this.currentSession = this.getSession;
            })
        },
        mounted(){
            this.movie.name.toUpperCase();
        },

    }
</script>