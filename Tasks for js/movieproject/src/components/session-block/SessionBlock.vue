<template>
    <div class="col-lg-12 sessions-area">
        <div class="sessions-row"  v-for="(places,index) in setPlaces.places" :key="index">
            <div :class="{'sessions-place':true,'isFree':place.isFree,'isBusy':!place.isFree}" v-for="(place,index) in places" :key="index" @click="choosePlace($event,place.position,place._id,place.isFree,place.movieID)">{{place.position}}</div>
        </div>
        <div class="row">
            <div class="col-8 info-text">Время начала фильма: {{(setPlaces.startTime)?setPlaces.startTime.match(/([0-9]{1,4}-\d{1,2}-\d{1,2})/g).join(''):''}}</div>
            <div class="col-4 info-text">Цена: {{setPlaces.ticketPrice}}</div>
        </div>
    </div>
</template>
<script type="ts">
    import axios from 'axios';
    export default {
        name: 'SessionBlock',
        props:[
            'setPlaces'
        ],
        data(){
            return{

            }
        },
        methods:{
            // Бронь определенного места
            choosePlace(evnt, position, id, isFree,movieId){
                const currentElem = evnt.target;
                if(!currentElem.classList.contains('isFree')){
                    this.$store.dispatch('togglePopup', {show:true,error: true});
                }else{
                    let rowId = id;
                    rowId = rowId.replace(/\D/g,'');
                    axios({
                        url: 'https://cinema-api-test.herokuapp.com/bookingPlace',
                        method: 'POST',
                        /* eslint-disable */
                        params: {
                            movieShow_id : movieId,
                            row_id : +rowId,
                            place_position : +position,
                            isFree : isFree
                        }
                        /* eslint-enable */
                    }).then((res)=>{
                        const date = new Date(),
                            year = date.getFullYear(),
                            month = date.getMonth(),
                            day = date.getDay(),
                            randomNumb = year + month + day;
                        for(let j = 0;j<this.setPlaces.places.length;j++){
                            this.setPlaces.places[j].find((elem)=>{
                                if(elem._id == id){
                                    elem.isFree = false;
                                }
                            })
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