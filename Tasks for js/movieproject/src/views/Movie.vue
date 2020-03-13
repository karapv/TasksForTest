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
           <div class="col-lg-12 sessions-area" v-for="(session,index) in currentSession" :key="index">
                <div class="sessions-row"  v-for="(places,index) in session.places" :key="index">
                    <div :class="{'sessions-place':true,'isFree':place.isFree,'isBusy':!place.isFree}" v-for="(place,index) in places" :key="index" @click="choosePlace($event,place.position,place._id,place.isFree)">{{place.position}}</div>
                </div>
               <div class="row">
                   <div class="col-5 info-text">Время начала фильма: {{(session.startTime)?session.startTime.match(/([0-9]{1,4}-\d{1,2}-\d{1,2})/g).join(''):''}}</div>
                   <div class="col-5 info-text">Цена: {{session.ticketPrice}}</div>
               </div>
            </div>
       </div>
    </div>
</template>

<script type="ts">
    import {mapGetters} from "vuex";
    import axios from 'axios';
    export default {
        name: "Movie",
        data(){
            return{
               movie: {
                   description: '',
                   name: '',
                   pictureLink: ''
               },
               currentSession: null
            }
        },
        computed:{
            ...mapGetters([
                'getCurrentMovie',
                'setMovieSession',
                'getMovieSession'
            ])
        },
        created(){
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
                const sessions = [];
                sessions.push({places,startTime,ticketPrice,_id,movieID});
                this.$store.dispatch('setMovieSession', sessions);
                const currentObj = this.getMovieSession.filter((item)=>{
                    if(item.movieID === this.getCurrentMovie) {
                        return item;
                    }else{throw new Error('Oops! Somethink wrong!');}
                });
                this.currentSession = currentObj;
            })
        },
        mounted(){
            this.movie.name.toUpperCase();
        },
        methods:{
            choosePlace(evnt, position, id, isFree){
                const currentElem = evnt.target;
                if(!currentElem.classList.contains('isFree')){
                    this.$store.dispatch('togglePopup', {show:true,error: true});
                }else{
                    let rowId = id;
                    rowId = rowId.replace(/\D/g,'');
                    axios({
                        url: 'https://cinema-api-test.herokuapp.com/bookingPlace',
                        method: 'POST',
                        params: {
                            movieShowId : this.getCurrentMovie,
                            rowId : +rowId,
                            placePosition : +position,
                            isFree : isFree
                        }
                    }).then((res)=>{
                        const date = new Date(),
                        year = date.getFullYear(),
                        month = date.getMonth(),
                        day = date.getDay(),
                        randomNumb = year + month + day;
                        for(let i = 0;i<this.currentSession.length;i++){
                            for(let j = 0;j<this.currentSession[i].places.length;j++){
                                for(let r = 0;r<this.currentSession[i].places[j].length;r++){
                                    if(this.currentSession[i].places[j][r]._id == id){
                                        this.currentSession[i].places[j][r].isFree = false;
                                        this.$store.dispatch('setMovieSession', this.currentSession);
                                    }
                                }
                            }
                        }
                        this.$store.dispatch('togglePopup',{show:true,error: false, reservCode: (res.data != 404)?res.data:Math.floor(Math.random() * randomNumb)});
                    }).catch((error)=>{
                        console.log(error);
                    })
                }
            }
        }
    }
</script>