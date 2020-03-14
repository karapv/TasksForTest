<template>
    <div class="container search-container">
        <div class="row">
            <div class="col-12 notfound-container" v-if="notFound">
                <h1 class="title">Извините,похоже по вашему запросу ничего не было найдено!</h1>
            </div>
            <div class="col-12 search-result" v-if="!notFound">
                <h1>Результаты по вашему запросу: {{queryParam}}</h1>
                <Movies :getMovies="currentQuery"></Movies>
            </div>
        </div>
    </div>
</template>
<script type="ts">
    import axios from 'axios';
    import Movies from "@/components/movies/Movies.vue";
    export default {
        components: {Movies},
        name: 'Search',
        data(){
            return{
                notFound: false,
                queryParam: this.$route.query.find,
                currentQuery: {}
            }
        },
        created(){
            if(this.$route.query.find){
                axios({
                    url: `https://cinema-api-test.herokuapp.com/movies/find?name=${this.queryParam}`,
                    method: 'GET'
                }).then((res)=>{
                    console.log(res);
                    if(!res.data.length>0) {
                        this.notFound = true;
                    }
                    this.currentQuery = res.data;
                }).catch((err)=>{
                    console.log(err);
                    this.notFound = true;
                })
            }else{
                this.notFound = true;
            }
        }
    }
</script>