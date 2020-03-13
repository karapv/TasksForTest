import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const toJSON = (obj)=>{
  return JSON.stringify(obj);
};
export default new Vuex.Store({
  state: {
    allMovies: [{}],
    currentMovie: localStorage.currentMovieID?localStorage.currentMovieID:'',
    showPopup: { show: false,error: true, reservCode: null},
    movieSession: localStorage.movieSession?localStorage.movieSession:[]
  },
  getters:{
    getAllMovies: (state): Array<object>=>{
      return state.allMovies;
    },
    getCurrentMovie: (state): string =>{
      return state.currentMovie;
    },
    getPopup: (state): {show: boolean;error: boolean; reservCode: null|number} =>{
      return state.showPopup;
    },
    getMovieSession: (state) => {
      return JSON.parse(state.movieSession);
    }
  },
  mutations: {
    setAllMovies(state,allMovies: Array<object>): void{
      state.allMovies = allMovies;
    },
    setCurrentMovie(state,currentMovie: string): void{
      state.currentMovie = currentMovie;
    },
    togglePopup(state,isPopup: {show: boolean;error: boolean; reservCode: null|number}): void{
      const {show,error,reservCode} = isPopup;
      state.showPopup = {show,error,reservCode};
    },
    setMovieSession(state,movieSession){
      localStorage.movieSession = toJSON(movieSession);
      state.movieSession = localStorage.movieSession;
    },
    chooseMovieSession(state,newObj){

    }
  },
  actions: {
    setAllMovies(content,allMovies: Array<object> ): void {
      content.commit('setAllMovies',allMovies);
    },
    setCurrentMovie(content,currentMovie: string): void{
      content.commit('setCurrentMovie',currentMovie);
    },
    togglePopup(content,isPopup: {show: boolean;error: boolean; reservCode: null|number}): void{
      content.commit('togglePopup',isPopup);
    },
    setMovieSession(content,movieSession){
      content.commit('setMovieSession',movieSession);
    },
    chooseMovieSession(content,newObj){
      content.commit('chooseMovieSession',newObj)
    }
  }
})
