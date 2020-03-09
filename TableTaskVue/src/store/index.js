import Vue from 'vue'
import Vuex from 'vuex'
//import axios  from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
        {id:Math.floor(Math.random()*1000),name:'Дмитрий',tel:'+380944563225',isChange:false,isErrorName:false,isErrorTel:false,isDone:false},
        {id:Math.floor(Math.random()*1000),name:'Анатолий',tel:'+380644563225',isChange:false,isErrorName:false,isErrorTel:false,isDone:false},
        {id:Math.floor(Math.random()*1000),name:'Василий',tel:'+380954563225',isChange:false,isErrorName:false,isErrorTel:false,isDone:false},
        {id:Math.floor(Math.random()*1000),name:'Иван',tel:'+380944513225',isChange:false,isErrorName:false,isErrorTel:false,isDone:false},
        {id:Math.floor(Math.random()*1000),name:'Марина',tel:'+380943563225',isChange:false,isErrorName:false,isErrorTel:false,isDone:false}
        ],
  },
  getters:{
    getUsers: state => {
      return state.users
    },
  },
  mutations: {
    deleteUser(state,index){
      state.users.splice(index,1);
      // axios({
      //   url: '/api/deleteUser',
      //   method: 'POST',
      //   data: JSON.stringify({
      //     ...state.users[index]
      //   }),
      //   headers:{
      //     "Content-Type": "application/json"
      //   }
      // }).then(res=>console.log(res)).catch(err=>console.log(err));
    },
    saveChanges(state,data){
      let {index,nameUser,telUser} = data;
      state.users[index].name = nameUser;
      state.users[index].tel = telUser;
      // axios({
      //   url: '/api/changeUser',
      //   method: 'POST',
      //   data: JSON.stringify({
      //     ...state.users[index]
      //   }),
      //   headers:{
      //     "Content-Type": "application/json"
      //   }
      // }).then(res=>console.log(res)).catch(err=>console.log(err));
    },
    addNewUser(state,user){
      state.users.push(user);
      // axios({
      //   url: '/api/addNewUser',
      //   method: 'POST',
      //   data: JSON.stringify({
      //     user
      //   }),
      //   headers:{
      //     "Content-Type": "application/json"
      //   }
      // }).then(res=>console.log(res)).catch(err=>console.log(err));
    }
  },
  actions: {
    deleteUser(content,index){
      content.commit('deleteUser',index);
    },
    saveChanges(content,data) {
      content.commit('saveChanges', data);
    },
    addNewUser(content,data){
      content.commit('addNewUser', data);
    }
  }
})
