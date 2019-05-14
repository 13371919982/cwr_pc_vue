import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
  },
  mutations: {
    addUser(state,token){
      localStorage.setItem('token',token);
      state.token=token;
    },
    removeUser(state,token){
      localStorage.removeItem('token',token);
      state.token=token;
    }
  },
  actions: {

  }
})
