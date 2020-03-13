import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    allMovies: {},
    currentMovie: localStorage.currentMovieID?localStorage.currentMovieID:'',
    showPopup: { show: false,error: true, reservCode: null},
    currentSession: {},
    allSessions: {}
  },
  getters:{
    getAllMovies: (state)=>{
      return state.allMovies;
    },
    getCurrentMovie: (state): string =>{
      return state.currentMovie;
    },
    getPopup: (state): {show: boolean;error: boolean; reservCode: null|number} =>{
      return state.showPopup;
    },
    getSession:(state)=>{
       return state.currentSession;
    },
    getAllSessions:(state)=>{
        return state.allSessions;
    },
    getMainSessions:(state)=>{
        const mainSessions = state.allSessions?state.allSessions: [];
        for(let i = 0;i<mainSessions.length;i++){
          if(state.allMovies[i]._id == mainSessions[i].movie_id){
              mainSessions[i].name = state.allMovies[i].name;
          }
        }
        return mainSessions;
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
    setCurrentSession(state,session: Array<object>): void{
      state.currentSession = session;
    },
    setSessions(state,sessions: Array<object>): void{
      state.allSessions = sessions;
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
    setCurrentSession(content,session: Array<object>): void{
      content.commit('setCurrentSession',session);
    },
    setSessions(content,sessions: Array<object>): void{
      content.commit('setSessions',sessions);
    }
  }
})
