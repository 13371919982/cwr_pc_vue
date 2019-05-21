import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
  },
  mutations: {
    addUser(state,token){
      state.token=token;
      sessionStorage.token=token;
    },
    removeUser(state){
      sessionStorage.removeItem('token');
      state.token='';
    },
  },
  actions: {

  }
})
